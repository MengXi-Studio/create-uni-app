/**
 * 全局配置持久化（参考 taro config）
 *
 * 配置默认保存在用户主目录 ~/.create-uni-app/config.json。
 * 为兼容沙箱 / 受限环境（无法写家目录）与方便测试：
 *  - 可通过环境变量 CREATE_UNI_APP_CONFIG_DIR 显式指定配置目录
 *  - 家目录不可写时自动回退到系统临时目录
 */
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

/** 全局配置结构 */
export interface CliConfig {
	/** 持久化的模板源 */
	templateSource?: string
}

/** 当前实际使用的配置文件路径（惰性确定） */
let activeConfigPath: string | undefined

/**
 * 确定可用的配置文件路径，优先环境变量 → 家目录 → 临时目录。
 * 逐级尝试创建目录，首次可用即缓存。
 *
 * @returns 配置文件绝对路径
 */
function resolveConfigPath(): string {
	if (activeConfigPath) return activeConfigPath

	const candidates = [process.env.CREATE_UNI_APP_CONFIG_DIR?.trim(), path.join(os.homedir(), '.create-uni-app'), path.join(os.tmpdir(), 'create-uni-app-config')].filter((p): p is string => Boolean(p))

	for (const dir of candidates) {
		try {
			fs.mkdirSync(dir, { recursive: true })
			activeConfigPath = path.join(dir, 'config.json')
			return activeConfigPath
		} catch {
			// 该候选目录不可写，尝试下一个
		}
	}

	// 兜底
	activeConfigPath = path.join(os.tmpdir(), 'create-uni-app-config', 'config.json')
	return activeConfigPath
}

/**
 * 读取全局配置；文件不存在或解析失败时返回空配置。
 *
 * @returns 全局配置对象
 */
export function readConfig(): CliConfig {
	const configPath = resolveConfigPath()
	try {
		if (!fs.existsSync(configPath)) return {}
		return JSON.parse(fs.readFileSync(configPath, 'utf8')) as CliConfig
	} catch {
		return {}
	}
}

/**
 * 获取持久化的模板源；未设置时返回 undefined。
 *
 * @returns 模板源或 undefined
 */
export function getTemplateSource(): string | undefined {
	return readConfig().templateSource
}

/**
 * 持久化模板源配置。
 *
 * @param source 模板源标识
 */
export function saveTemplateSource(source: string): void {
	const configPath = resolveConfigPath()
	const config = readConfig()
	config.templateSource = source
	fs.mkdirSync(path.dirname(configPath), { recursive: true })
	fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf8')
}

/**
 * 清除持久化的模板源配置（回到使用内置模板）。
 */
export function clearTemplateSource(): void {
	const configPath = resolveConfigPath()
	const config = readConfig()
	delete config.templateSource
	if (fs.existsSync(configPath)) {
		fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf8')
	}
}

/**
 * 打印当前模板源配置及其实际位置。
 */
export function printConfig(): void {
	const source = getTemplateSource()
	const location = resolveConfigPath()
	if (source) {
		console.log(`模板源：${source}`)
	} else {
		console.log('模板源：未设置（使用内置模板）')
	}
	console.log(`配置文件：${location}`)
}
