/**
 * info 诊断命令
 *
 * 打印 CLI 与当前项目的诊断信息，便于排查环境与工程配置问题。
 * 参考 create-taro 的 taro info 命令体验。
 */
import fs from 'node:fs'
import path from 'node:path'

/** CLI 根 package.json（用于读取版本号） */
const PKG = require('../../package.json') as { version: string }

/** 当前目录 package.json */
let cwdPkg: {
	name?: string
	version?: string
	dependencies?: Record<string, string>
	devDependencies?: Record<string, string>
} | null = null
try {
	cwdPkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
} catch {
	// 当前目录可能没有 package.json
	cwdPkg = null
}

/**
 * 判断某依赖是否出现在项目依赖中。
 *
 * @param key 依赖名
 * @returns 是否存在
 */
function hasDep(key: string): boolean {
	if (!cwdPkg) return false
	const deps: Record<string, unknown> = { ...(cwdPkg.dependencies as object), ...(cwdPkg.devDependencies as object) }
	return key in deps
}

/**
 * 打印诊断信息。
 */
export function runInfo(): void {
	const cwd = process.cwd()
	const src = path.join(cwd, 'src')
	const hasSrc = fs.existsSync(src)
	const hasMainTs = fs.existsSync(path.join(src, 'main.ts'))
	const hasMainJs = fs.existsSync(path.join(src, 'main.js'))
	const hasPagesJson = fs.existsSync(path.join(src, 'pages.json'))
	const isUniApp = hasSrc && (hasMainTs || hasMainJs) && hasPagesJson

	console.log(`create-uni-app v${PKG.version}`)
	console.log(`Node.js ${process.version} (${process.platform} ${process.arch})`)
	console.log(`当前目录：${cwd}\n`)

	if (!cwdPkg) {
		console.log('ℹ️  当前目录没有 package.json，非 uni-app 项目上下文。')
		return
	}

	console.log(`项目名称：${cwdPkg.name ?? '未知'}`)
	console.log(`项目版本：${cwdPkg.version ?? '未知'}`)
	console.log(`是否 uni-app 项目：${isUniApp ? '是' : '否'}`)
	if (!isUniApp) {
		console.log('ℹ️  未检测到 src/main.(ts|js) 或 src/pages.json。')
	}

	console.log('\n特性检测：')
	console.log(`  TypeScript：${hasMainTs ? '是' : hasMainJs ? '否' : '未知'}`)
	console.log(`  Sass 预处理器：${hasDep('sass') ? '是' : '否'}`)
	console.log(`  Pinia：${hasDep('pinia') ? '是' : '否'}`)
	console.log(`  Vuex：${hasDep('vuex') ? '是' : '否'}`)
	console.log(`  uni-ui：${hasDep('@dcloudio/uni-ui') ? '是' : '否'}`)
}
