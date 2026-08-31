/**
 * 通用工具函数
 */
import fs from 'node:fs'
import path from 'node:path'

/**
 * 将用户输入的项目名清洗为合法的 npm 包名。
 * 仅保留小写字母、数字、中划线、点和下划线；若为空则返回 undefined。
 *
 * @param rawName 用户输入的项目名
 * @returns 合法化的包名，非法时返回 undefined
 */
export function normalizePackageName(rawName: string): string | undefined {
	const cleaned = rawName
		.trim()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/^@/g, '') // 去掉包作用域前缀
		.replace(/[^a-z0-9._-]/g, '')
		.replace(/^-+|-+$/g, '')
	return cleaned || undefined
}

/**
 * 递归复制目录内容到目标目录，并对每个文件执行内容替换。
 * 文件名以 .tpl 结尾的会剥离该后缀（表示该文件需要渲染后使用）。
 *
 * @param src 源目录绝对路径
 * @param dest 目标目录绝对路径
 * @param replace 文件内容替换回调，接收文件内容返回替换后内容
 */
export function copyDir(src: string, dest: string, replace: (content: string) => string): void {
	fs.mkdirSync(dest, { recursive: true })
	const entries = fs.readdirSync(src, { withFileTypes: true })
	for (const entry of entries) {
		const srcPath = path.join(src, entry.name)
		if (entry.isDirectory()) {
			copyDir(srcPath, path.join(dest, entry.name), replace)
			continue
		}
		const destName = entry.name.endsWith('.tpl') ? entry.name.slice(0, -'.tpl'.length) : entry.name
		const destPath = path.join(dest, destName)
		const content = fs.readFileSync(srcPath, 'utf8')
		fs.mkdirSync(path.dirname(destPath), { recursive: true })
		fs.writeFileSync(destPath, replace(content), 'utf8')
	}
}

/**
 * 将一组文件内容中的 ${token} 占位符替换为 context 中对应字段的值。
 *
 * @param content 模板文件内容
 * @param context 渲染上下文
 * @returns 替换后的内容
 */
export function renderTemplate(content: string, context: Record<string, unknown>): string {
	return content.replace(/\$\{(\w+)\}/g, (match, token: string) => {
		const value = context[token]
		return value === undefined || value === null ? match : String(value)
	})
}

/**
 * 计算 templates 目录的绝对路径。
 *
 * 编译后模板入口位于 dist/core/utils.js，templates 与 dist 同级（项目根目录），
 * 故需要向上回退两级。
 *
 * @returns templates 根目录绝对路径
 */
export function getTemplatesRoot(): string {
	return path.resolve(__dirname, '..', '..', 'templates')
}
