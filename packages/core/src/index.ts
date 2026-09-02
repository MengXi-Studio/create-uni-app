#!/usr/bin/env node
/**
 * create-uni-app 命令行入口
 *
 * 用法：npx create-uni-app [projectName]
 * 复刻 create-taro 的命令体验，提供交互式问答 + 按需生成 + 依赖安装收尾。
 */
import { addAlias } from 'module-alias'
import path from 'node:path'
// 注册 @/ 路径别名，必须在使用任何 '@/...' 导入之前执行。
// 编译产物位于 dist/index.js，__dirname 即 dist，故 @/ 指向编译后的源码根。
addAlias('@', __dirname)
import fs from 'node:fs'
import { spawnSync } from 'node:child_process'
import { program } from 'commander'
import { askQuestions } from '@/generator/questions'
import { generateProject } from '@/generator/generate'
import { resolveTemplateSource, selectTemplateEntry, loadTemplatePresets } from '@/generator/template-source'
import { getTemplateSource, printConfig, saveTemplateSource, clearTemplateSource } from '@/commands/config'
import { createPage } from '@/commands/create-page'
import { runInfo } from '@/commands/info'
import { CreateOptions } from '@/types'

/** 项目根 package.json（用于读取版本号） */
const PKG = require('../package.json') as { version: string }

/**
 * 判断目标目录是否已存在且非空。
 *
 * @param dir 目标绝对路径
 * @returns 是否非空
 */
function isNonEmpty(dir: string): boolean {
	if (!fs.existsSync(dir)) return false
	return fs.readdirSync(dir).length > 0
}

/**
 * 在目标目录执行依赖安装。
 *
 * @param dir 项目目录
 * @param packageManager 包管理器
 */
function installDependencies(dir: string, packageManager: CreateOptions['packageManager']): void {
	const args = packageManager === 'yarn' || packageManager === 'pnpm' ? [] : ['install']
	const result = spawnSync(packageManager, args, { cwd: dir, stdio: 'inherit' })
	if (result.status === 0) return

	// 保留真实失败原因，避免只给一句笼统提示
	const hint = `请进入 ${dir} 手动执行 ${packageManager} install 查看完整报错`
	if (result.error) {
		// 进程无法启动（如命令不存在、缺权限），此时 status 为空
		throw new Error(
			`依赖安装失败（${packageManager}）：${result.error.message}。请确认 ${packageManager} 已安装且在 PATH 中。${hint}。`
		)
	}
	throw new Error(`依赖安装失败（${packageManager}）：退出码 ${result.status}。${hint}。`)
}

/**
 * 打印创建成功的收尾引导信息。
 *
 * @param options 问答结果
 * @param targetDir 目标目录
 * @param installed 是否已安装依赖
 */
function printSummary(options: CreateOptions, targetDir: string, installed: boolean): void {
	console.log('\n✅ 项目创建完成！')
	console.log(`  目录：${targetDir}\n`)

	if (!installed) {
		console.log(`➡️  安装依赖：`)
		console.log(`  cd ${options.projectName}`)
		console.log(`  ${options.packageManager} ${options.packageManager === 'yarn' || options.packageManager === 'pnpm' ? '' : 'install'}\n`)
	}

	console.log('➡️  启动开发（H5）：')
	console.log(`  cd ${options.projectName}`)
	console.log('  npm run dev:h5\n')

	console.log('💡 提示：uni-app 包版本为运行时统一占位，可执行 `npx @dcloudio/uvm@latest` 对齐官方最新。')
}

/**
 * 处理 create 命令：交互问答 → 生成 → 安装 → 收尾。
 *
 * @param projectNameFromArg 命令行传入的项目名
 */
async function run(projectNameFromArg?: string): Promise<void> {
	try {
		const cliOptions = program.opts<{ uniVersion?: string; templateSource?: string; template?: string }>()
		// 解析模板源并确定最终模板：优先级 CLI 参数 > 全局配置 > 内置模板
		const templateSource = cliOptions.templateSource ?? getTemplateSource()
		const baseTemplateRoot = resolveTemplateSource(templateSource)
		// 模板源为「模板组」时（或显式指定 --template 时）选择具体模板
		const templateRoot = await selectTemplateEntry(baseTemplateRoot, cliOptions.template)
		// 模板可通过 template.json 预填交互默认值
		const templatePresets = loadTemplatePresets(templateRoot)

		const options = await askQuestions(projectNameFromArg, templatePresets)
		// 支持通过 --uni-version 覆盖默认 uni-app 运行时版本
		if (cliOptions.uniVersion) {
			options.uniVersion = cliOptions.uniVersion
		}
		const targetDir = path.resolve(process.cwd(), options.projectName)

		if (isNonEmpty(targetDir)) {
			console.error(`❌ 目录已存在且非空：${targetDir}`)
			process.exit(1)
		}

		fs.mkdirSync(targetDir, { recursive: true })
		console.log(`\n⚙️  正在生成项目到 ${targetDir} ...`)
		generateProject(options, targetDir, templateRoot)

		if (options.installDeps) {
			console.log('\n📦 正在安装依赖，请稍候 ...')
			installDependencies(targetDir, options.packageManager)
		}

		printSummary(options, targetDir, options.installDeps)
	} catch (err) {
		console.error(`\n❌ 创建失败：${err instanceof Error ? err.message : err}`)
		process.exit(1)
	}
}

/** 组装 commander 命令 */
program
	.name('create-uni-app')
	.description('基于 uni-app 的交互式脚手架 CLI，按需生成 uni-app 基础项目与可选功能')
	.version(PKG.version, '-v, --version')
	.option('--uni-version <version>', '指定 uni-app 运行时版本号（缺省用内置默认值）')
	.option('--template-source <source>', '使用自定义模板源：本地目录路径或 git 仓库（github:owner/repo / gitlab:owner/repo / git url）')
	.option('--template <name>', '在模板组中指定要使用的模板名（缺省交互选择）')
	.argument('[projectName]', '项目名称')
	.action(run)

/** create 子命令：在当前项目中新建页面 */
program
	.command('create')
	.description('在当前 uni-app 项目中创建新页面')
	.argument('[pageName]', '页面名称（小写字母/数字/中划线）')
	.option('--subpackage <root>', '创建到指定分包（如 pages-sub），缺省主包')
	.action((pageName: string | undefined, options: { subpackage?: string }) => {
		createPage(pageName, options.subpackage)
	})

/** info 子命令：打印诊断信息 */
program.command('info').description('打印环境与项目诊断信息').action(runInfo)

/** config 子命令：查看或设置持久化的模板源配置 */
program
	.command('config')
	.description('查看或设置模板源配置（get / set <source> / remove）')
	.argument('<action>', 'get | set | remove')
	.argument('[source]', '模板源（与 set 搭配）')
	.action((action: string, source?: string) => {
		if (action === 'get') {
			printConfig()
		} else if (action === 'set') {
			if (!source?.trim()) {
				console.error('❌ 请提供模板源：create-uni-app config set <source>')
				process.exit(1)
			}
			saveTemplateSource(source.trim())
			console.log(`✅ 已设置模板源：${source.trim()}`)
		} else if (action === 'remove') {
			clearTemplateSource()
			console.log('✅ 已清除模板源（将使用内置模板）')
		} else {
			console.error('❌ 未知操作，应为：get | set <source> | remove')
			process.exit(1)
		}
	})

program.parse(process.argv)
