import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

/** 中文站点元信息 URL 与描述 */
export const META_URL = 'https://mengxi-studio.github.io/create-uni-app/'
export const META_TITLE = 'Create Uni App'
export const META_DESCRIPTION = '基于 uni-app 的交互式脚手架 CLI，按需生成 uni-app 基础项目与可选能力'

/** 中文（根 /）语言特定配置 */
export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
	/** 网站配置 描述 */
	description: META_DESCRIPTION,

	/** 网站配置 头信息 */
	head: [
		['meta', { property: 'og:url', content: META_URL }],
		['meta', { property: 'og:description', content: META_DESCRIPTION }],
		['meta', { property: 'twitter:url', content: META_URL }],
		['meta', { property: 'twitter:title', content: META_TITLE }],
		['meta', { property: 'twitter:description', content: META_DESCRIPTION }]
	],

	/** 网站配置 主题配置 */
	themeConfig: {
		/** 网站主题配置 编辑链接 */
		editLink: {
			pattern: 'https://github.com/MengXi-Studio/create-uni-app/edit/master/packages/docs/:path',
			text: '对本页提出修改建议'
		},

		/** 网站主题配置 大纲标题 */
		outlineTitle: '本页内容',

		/** 网站主题配置 导航栏 */
		nav: [
			{ text: '指南', link: '/guide/quick-start' },
			{ text: '命令', link: '/guide/cli' },
			{ text: '功能', link: '/features/platforms' },
			{ text: '模板', link: '/template/custom-template' },
			{ text: '更新日志', link: '/changelog' },
			{
				text: '相关链接',
				items: [
					{
						text: 'Discussions',
						link: 'https://github.com/MengXi-Studio/create-uni-app/discussions'
					},
					{
						text: 'Releases',
						link: 'https://github.com/MengXi-Studio/create-uni-app/releases'
					}
				]
			}
		],

		/** 网站主题配置 侧边栏（全站统一展示：指南 + 命令 + 功能 + 自定义模板 + 项目） */
		sidebar: [
			{
				text: '指南',
				items: [
					{ text: '介绍', link: '/guide/introduction' },
					{ text: '安装', link: '/guide/installation' },
					{ text: '快速开始', link: '/guide/quick-start' }
				]
			},
			{
				text: '命令',
				items: [
					{ text: '命令参考', link: '/guide/cli' },
					{ text: '创建页面', link: '/guide/create-page' },
					{ text: '配置持久化', link: '/guide/config' }
				]
			},
			{
				text: '功能',
				items: [
					{ text: '多平台支持', link: '/features/platforms' },
					{ text: '主题与预处理器', link: '/features/theming' },
					{ text: '状态管理', link: '/features/state' },
					{ text: '路由方案', link: '/features/router' },
					{ text: '集成项', link: '/features/features' }
				]
			},
			{
				text: '自定义模板',
				items: [
					{ text: '模板目录约定', link: '/template/custom-template' },
					{ text: '模板组与 --template', link: '/template/template-group' }
				]
			}
		]
	}
}
