/**
 * 模板源解析与加载
 *
 * 参考 create-taro 的 templateSource：允许用户用自定义模板源替换内置模板。
 * 支持的模板源：
 *  - 本地目录路径（绝对或相对）
 *  - git 仓库：`github:owner/repo` / `gitlab:owner/repo` / 任意 git clone url
 *
 * 模板源的形态：
 *  - 单模板模式：根目录直接含 base/（默认，内置模板即此形态）
 *  - 模板组模式：根目录下多个子目录，每个子目录含 base/，创建时选其一
 *
 * 每个模板须遵循与内置模板相同的目录约定：
 *   base/（基础骨架）、entry/{ts,js,ts-root,js-root}/（入口）、features/（功能片段）
 */
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import prompts from 'prompts'
import { getTemplatesRoot } from '@/core/utils'
import { QuestionPresets } from '@/types'
import { THEME_IDS } from '@/constants'

/** 拉取 git 模板的临时根目录 */
const TMP_ROOT = path.join(os.tmpdir(), 'create-uni-app-template')

/**
 * 将 create-taro 风格的 git 源简写转换为完整 git url。
 *
 * @param source 模板源标识
 * @returns 完整 git clone url
 */
function toGitUrl(source: string): string {
	if (source.startsWith('github:')) {
		return `https://github.com/${source.slice('github:'.length)}.git`
	}
	if (source.startsWith('gitlab:')) {
		return `https://gitlab.com/${source.slice('gitlab:'.length)}.git`
	}
	return source
}

/**
 * 校验模板根目录是否符合约定（必须包含 base 子目录）。
 *
 * @param root 待校验模板根
 * @throws 不符合约定时抛错
 */
function assertValidTemplateRoot(root: string): void {
	if (!fs.existsSync(path.join(root, 'base'))) {
		throw new Error(`模板源 "${root}" 不符合约定：缺少 base/ 目录。请确保模板源包含 base/、entry/、features/ 目录结构。`)
	}
}

/**
 * 将 git 模板源浅克隆到临时目录并返回其根路径。
 *
 * @param source git 源标识
 * @returns 克隆后的模板根目录绝对路径
 */
function cloneGitSource(source: string): string {
	const url = toGitUrl(source)
	const hash = createHash('sha1').update(url).digest('hex').slice(0, 12)
	const dir = path.join(TMP_ROOT, hash)

	// 重新拉取前清理旧缓存，避免残留
	fs.rmSync(dir, { recursive: true, force: true })
	fs.mkdirSync(TMP_ROOT, { recursive: true })

	console.log(`📦 拉取模板源：${url}`)
	const result = spawnSync('git', ['clone', '--depth', '1', url, dir], {
		cwd: TMP_ROOT,
		stdio: 'inherit'
	})
	if (result.status !== 0) {
		throw new Error(`模板源拉取失败：${url}`)
	}

	assertValidTemplateRoot(dir)
	return dir
}

/**
 * 解析模板源并返回模板根目录绝对路径。
 * 未提供 source 时回退到内置模板。
 *
 * @param source 模板源标识（本地路径或 git 仓库），可为空
 * @returns 模板根目录绝对路径
 */
export function resolveTemplateSource(source?: string): string {
	if (!source) {
		return getTemplatesRoot()
	}

	const trimmed = source.trim()
	// 本地目录（存在且为目录）直接使用
	if (fs.existsSync(trimmed)) {
		const localRoot = path.resolve(trimmed)
		if (!fs.statSync(trimmed).isDirectory()) {
			throw new Error(`模板源 "${trimmed}" 不是目录`)
		}
		assertValidTemplateRoot(localRoot)
		return localRoot
	}

	// 否则按 git 源浅克隆
	return cloneGitSource(trimmed)
}

/** 模板条目（模板组中的单个模板） */
export interface TemplateEntry {
	/** 模板名称（目录名） */
	name: string
	/** 模板目录绝对路径 */
	root: string
}

/** 模板源形态：单模板模式或模板组模式 */
export interface TemplateInspection {
	/** 是否为单模板模式（模板源根直接是模板） */
	single: boolean
	/** 模板组模式下列出的候选模板 */
	entries: TemplateEntry[]
}

/**
 * 检查模板源的形态：
 *  - 根目录含 base/ 视为单模板模式
 *  - 否则扫描根目录下含 base/ 的子目录作为模板组候选
 *
 * @param templateRoot 模板源根目录
 * @returns 形态信息
 */
export function inspectTemplateSource(templateRoot: string): TemplateInspection {
	if (fs.existsSync(path.join(templateRoot, 'base'))) {
		return { single: true, entries: [] }
	}
	const entries = fs
		.readdirSync(templateRoot, { withFileTypes: true })
		.filter(entry => entry.isDirectory() && fs.existsSync(path.join(templateRoot, entry.name, 'base')))
		.map(entry => ({ name: entry.name, root: path.join(templateRoot, entry.name) }))
	return { single: false, entries }
}

/**
 * 在模板组中选择具体模板，返回其模板根目录。
 * 优先级：--template 参数（prefName）> 交互选择；单模板模式直接返回原根目录。
 *
 * @param templateRoot 模板源根目录
 * @param prefName --template 参数指定的模板名（可选）
 * @returns 实际使用的模板根目录
 */
export async function selectTemplateEntry(templateRoot: string, prefName?: string): Promise<string> {
	const inspection = inspectTemplateSource(templateRoot)
	if (inspection.single) {
		return templateRoot
	}

	const { entries } = inspection
	if (entries.length === 0) {
		throw new Error(`模板源 "${templateRoot}" 未包含任何可用模板（缺少 base/ 目录）`)
	}

	// 通过 --template 预先指定
	if (prefName) {
		const matched = entries.find(entry => entry.name === prefName)
		if (!matched) {
			throw new Error(`未找到模板 "${prefName}"，可用模板：${entries.map(e => e.name).join(', ')}`)
		}
		return matched.root
	}

	// 唯一候选无需询问
	if (entries.length === 1) {
		return entries[0].root
	}

	const response = await prompts({
		type: 'select',
		name: 'template',
		message: '选择项目模板：',
		choices: entries.map(entry => ({ title: entry.name, value: entry.name }))
	})
	if (!response.template) {
		throw new Error('用户取消了模板选择')
	}
	const matched = entries.find(entry => entry.name === response.template)
	return matched ? matched.root : templateRoot
}

/**
 * 读取模板根目录下 template.json 中预填的交互默认值。
 * 约定字段与 QuestionPresets 一致；缺省或字段不存在时返回空对象。
 *
 * @param templateRoot 实际使用的模板根目录
 * @returns 预填的交互默认值
 */
export function loadTemplatePresets(templateRoot: string): QuestionPresets {
	const presetsPath = path.join(templateRoot, 'template.json')
	if (!fs.existsSync(presetsPath)) return {}

	try {
		const raw = JSON.parse(fs.readFileSync(presetsPath, 'utf8')) as Record<string, unknown>
		return {
			useTypeScript: typeof raw.useTypeScript === 'boolean' ? raw.useTypeScript : undefined,
			css: raw.css === 'scss' || raw.css === 'less' || raw.css === 'stylus' || raw.css === 'none' ? raw.css : undefined,
			state: raw.state === 'pinia' || raw.state === 'pinia-persist' || raw.state === 'vuex' || raw.state === 'vuex-persist' || raw.state === 'none' ? raw.state : undefined,
			router: raw.router === 'none' || raw.router === 'router' || raw.router === 'router-generate' || raw.router === 'pages' || raw.router === 'uni' ? raw.router : undefined,
			theme: typeof raw.theme === 'string' && (raw.theme === 'none' || (THEME_IDS as readonly string[]).includes(raw.theme)) ? (raw.theme as QuestionPresets['theme']) : undefined,
			platform: Array.isArray(raw.platform) && raw.platform.every(p => typeof p === 'string') ? (raw.platform as QuestionPresets['platform']) : undefined,
			features: Array.isArray(raw.features) && raw.features.every(f => typeof f === 'string') ? (raw.features as QuestionPresets['features']) : undefined,
			packageManager: raw.packageManager === 'npm' || raw.packageManager === 'yarn' || raw.packageManager === 'pnpm' ? raw.packageManager : undefined,
			installDeps: typeof raw.installDeps === 'boolean' ? raw.installDeps : undefined
		}
	} catch {
		// template.json 不可解析时忽略预填
		return {}
	}
}
