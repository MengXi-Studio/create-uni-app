import { defineConfig } from 'vitepress'

/** 网站部署基础路径（CI 注入，本地默认 /create-uni-app/） */
const base = process.env.DOCS_BASE || '/create-uni-app/'

/** 将根路径资源拼接到当前 base 下，避免子路径部署时 favicon 等资源 404 */
const asset = (p: string) => base + p.replace(/^\//, '')

/** 中文站点标题与描述（供 OG / Twitter 元信息使用） */
export const META_TITLE = 'Create Uni App'
export const META_DESCRIPTION = '基于 uni-app 的交互式脚手架 CLI'

/** 各语言共用的站点级配置 */
export const sharedConfig = defineConfig({
	/** 网站标题 */
	title: META_TITLE,

	lastUpdated: true,

	markdown: {
		/** 代码高亮 Markdown 主题 */
		theme: {
			dark: 'one-dark-pro',
			light: 'github-light'
		}
	},

	/** 网站头标签 */
	head: [
		['link', { rel: 'icon', type: 'image/png', href: asset('logo.png') }],
		['link', { rel: 'icon', href: asset('favicon.ico') }],
		['meta', { property: 'og:type', content: 'website' }],
		['meta', { property: 'og:title', content: META_TITLE }],
		['meta', { property: 'twitter:title', content: META_TITLE }],
		['meta', { property: 'twitter:card', content: 'summary_large_image' }],
		['meta', { property: 'twitter:description', content: META_DESCRIPTION }]
	],

	/** 网站主题配置 */
	themeConfig: {
		/** 网站主题配置 logo（VitePress 自动拼 base） */
		logo: '/logo.png',

		/** 网站主题配置 搜索框 */
		search: {
			provider: 'local',
			options: {
				translations: {
					button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
					modal: {
						noResultsText: '无法找到相关结果',
						footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
					}
				}
			}
		},

		/** 网站主题配置 社交链接 */
		socialLinks: [
			{ icon: 'github', link: 'https://github.com/MengXi-Studio/create-uni-app' },
			{ icon: 'npm', link: 'https://www.npmjs.com/package/@meng-xi/create-uni-app' }
		],

		/** 网站主题配置 页脚 */
		footer: {
			copyright: 'Copyright © 2026-present 梦曦工作室',
			message: 'Released under the MIT License.'
		}
	}
})
