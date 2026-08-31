import { defineConfig } from 'vitepress'
import { sharedConfig } from './shared'
import { zhConfig } from './zh'
import { enConfig } from './en'

/**
 * create-uni-app 文档站入口配置
 *
 * 沿用 uni-router 的 i18n 组织方式：config 目录化 + zh/en 双 locale，
 * 中文为根（/）、英文在 /en/。部署基址由 CI 通过 DOCS_BASE 注入。
 */
export default defineConfig({
	...sharedConfig,

	/**
	 * 网站部署基础路径
	 *
	 * CI 通过 DOCS_BASE 环境变量注入：
	 * - 默认（master 分支）：/create-uni-app/
	 * 本地开发默认 /create-uni-app/
	 */
	base: process.env.DOCS_BASE || '/create-uni-app/',

	/** 文档源目录 */
	srcDir: './src',

	/** 网站支持的语言 */
	locales: {
		root: { label: '简体中文', lang: 'zh-CN', link: '/', ...zhConfig },
		en: { label: 'English', lang: 'en-US', link: '/en/', ...enConfig }
	}
})
