import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

/** 英文站点元信息 URL 与描述 */
export const META_URL = 'https://mengxi-studio.github.io/create-uni-app/en/'
export const META_TITLE = 'Create Uni App'
export const META_DESCRIPTION = 'An interactive scaffolding CLI for uni-app that generates only what you pick'

/** 英文（/en/）语言特定配置 */
export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
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
			text: 'Suggest changes to this page'
		},

		/** 网站主题配置 大纲标题 */
		outlineTitle: 'Contents of this page',

		/** 网站主题配置 导航栏 */
		nav: [
			{ text: 'Guide', link: '/en/guide/quick-start' },
			{ text: 'Commands', link: '/en/guide/cli' },
			{ text: 'Features', link: '/en/features/platforms' },
			{ text: 'Templates', link: '/en/template/custom-template' },
			{
				text: 'Links',
				items: [
					{
						text: 'Discussions',
						link: 'https://github.com/MengXi-Studio/create-uni-app/discussions'
					},
					{
						text: 'Changelog',
						link: 'https://github.com/MengXi-Studio/create-uni-app/releases'
					}
				]
			}
		],
		/** 网站主题配置 侧边栏（全站统一展示：Guide + Commands + Features + Templates） */
		sidebar: [
			{
				text: 'Guide',
				items: [
					{ text: 'Introduction', link: '/en/guide/introduction' },
					{ text: 'Installation', link: '/en/guide/installation' },
					{ text: 'Quick Start', link: '/en/guide/quick-start' }
				]
			},
			{
				text: 'Commands',
				items: [
					{ text: 'CLI Reference', link: '/en/guide/cli' },
					{ text: 'Create a Page', link: '/en/guide/create-page' },
					{ text: 'Persistent Config', link: '/en/guide/config' }
				]
			},
			{
				text: 'Features',
				items: [
					{ text: 'Platforms', link: '/en/features/platforms' },
					{ text: 'Theming & Preprocessors', link: '/en/features/theming' },
					{ text: 'State Management', link: '/en/features/state' },
					{ text: 'Router Schemes', link: '/en/features/router' },
					{ text: 'Integrations', link: '/en/features/features' }
				]
			},
			{
				text: 'Custom Templates',
				items: [
					{ text: 'Template Layout', link: '/en/template/custom-template' },
					{ text: 'Template Groups & --template', link: '/en/template/template-group' }
				]
			}
		]
	}
}
