import { defineConfig } from 'vitepress'

/**
 * create-uni-app 文档站配置
 *
 * 站点以「功能 / 命令 / 模板」为三层导览组织，与 core（@mengxi/create-uni-app）
 * 的交互流程一一对应，便于按图示步骤快速上手。
 */
export default defineConfig({
	title: 'create-uni-app',
	description: '基于 uni-app 的交互式脚手架 CLI 文档',
	lang: 'zh-CN',
	cleanUrls: true,
	lastUpdated: true,

	head: [['meta', { name: 'robots', content: 'index, follow' }]],

	themeConfig: {
		logo: '/logo.svg',
		nav: [
			{ text: '指南', link: '/guide/quick-start' },
			{ text: '功能', link: '/features/platforms' },
			{ text: '模板', link: '/template/custom-template' },
			{ text: 'GitHub', link: 'https://github.com/MengXi-Studio/create-uni-app' }
		],
		sidebar: {
			'/guide/': [
				{
					text: '指南',
					items: [
						{ text: '简介', link: '/guide/introduction' },
						{ text: '快速开始', link: '/guide/quick-start' },
						{ text: '命令参考', link: '/guide/cli' },
						{ text: '创建页面', link: '/guide/create-page' }
					]
				}
			],
			'/features/': [
				{
					text: '功能',
					items: [
						{ text: '多平台支持', link: '/features/platforms' },
						{ text: '主题与预处理器', link: '/features/theming' },
						{ text: '状态管理', link: '/features/state' },
						{ text: '路由方案', link: '/features/router' },
						{ text: '可选功能', link: '/features/features' }
					]
				}
			],
			'/template/': [
				{
					text: '自定义模板',
					items: [
						{ text: '模板目录约定', link: '/template/custom-template' },
						{ text: '模板组与 --template', link: '/template/template-group' },
						{ text: '配置持久化', link: '/template/config' }
					]
				}
			]
		},
		search: {
			provider: 'local',
			options: {
				translations: {
					button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
					modal: { noResultsText: '无法找到相关结果', footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' } }
				}
			}
		},
		outline: { label: '本页导航', level: [2, 3] },
		docFooter: {
			prev: '上一页',
			next: '下一页'
		},
		returnToTopLabel: '回到顶部',
		sidebarMenuLabel: '菜单',
		darkModeSwitchLabel: '主题',
		lastUpdatedText: '最后更新于',
		socialLinks: [{ icon: 'github', link: 'https://github.com/MengXi-Studio/create-uni-app' }],
		footer: {
			message: '基于 MIT 协议发布',
			copyright: 'Copyright © 2026 MengXi Studio'
		}
	}
})
