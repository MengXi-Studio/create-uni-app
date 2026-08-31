/**
 * 内置主题相关常量
 *
 * 主题以「色板数据」为唯一来源，渲染时按所选预处理器（scss/less/stylus）
 * 输出对应语法，保证三套预处理器下主题均可全局生效。
 */
import { Theme } from '@/enums'
import { CssPreprocessor } from '@/types'

/** 内置主题值集合（用于校验 template.json 中的 theme 字段） */
export const THEME_IDS: readonly string[] = ['default', 'blue', 'green', 'orange']

/** 一套主题的色板值 */
export interface ThemePalette {
	/** 品牌主色 */
	primary: string
	/** 成功色 */
	success: string
	/** 警告色 */
	warning: string
	/** 错误色 */
	error: string
	/** 页面背景色 */
	bg: string
}

/** 内置主题色板：三套预处理器共用同一份色值 */
export const THEME_PALETTES: Record<Theme, ThemePalette> = {
	[Theme.Default]: { primary: '#4b3fe3', success: '#1dc981', warning: '#efaa17', error: '#e8463a', bg: '#f5f6f7' },
	[Theme.Blue]: { primary: '#2563eb', success: '#10b981', warning: '#f59e0b', error: '#ef4444', bg: '#f4f7fb' },
	[Theme.Green]: { primary: '#059669', success: '#10b981', warning: '#f59e0b', error: '#ef4444', bg: '#f4faf6' },
	[Theme.Orange]: { primary: '#ea580c', success: '#16a34a', warning: '#f59e0b', error: '#dc2626', bg: '#fbf6f3' }
}

/**
 * 按预处理器渲染主题色板变量（scss/less/stylus 语法不同）。
 *
 * @param theme 内置主题标识
 * @param css CSS 预处理器
 * @returns 注入到全局样式文件的色板变量块
 */
export function renderThemeVars(theme: Theme, css: CssPreprocessor): string {
	const p = THEME_PALETTES[theme]

	if (css === 'less') {
		return ['/* 品牌色 */', `@uni-color-primary: ${p.primary};`, `@uni-color-success: ${p.success};`, `@uni-color-warning: ${p.warning};`, `@uni-color-error: ${p.error};`, `@uni-bg-color: ${p.bg};`].join('\n')
	}

	if (css === 'stylus') {
		return ['/* 品牌色 */', `uni-color-primary = ${p.primary}`, `uni-color-success = ${p.success}`, `uni-color-warning = ${p.warning}`, `uni-color-error = ${p.error}`, `uni-bg-color = ${p.bg}`].join('\n')
	}

	if (css === 'none') {
		// 原生 CSS：以 CSS 自定义属性（var(--)）承载主题，变量块置于 :root 内
		return [
			'  /* 品牌色 */',
			`  --uni-color-primary: ${p.primary};`,
			`  --uni-color-success: ${p.success};`,
			`  --uni-color-warning: ${p.warning};`,
			`  --uni-color-error: ${p.error};`,
			`  --uni-bg-color: ${p.bg};`
		].join('\n')
	}

	return ['/* 品牌色 */', `$uni-color-primary: ${p.primary};`, `$uni-color-success: ${p.success};`, `$uni-color-warning: ${p.warning};`, `$uni-color-error: ${p.error};`, `$uni-bg-color: ${p.bg};`].join('\n')
}
