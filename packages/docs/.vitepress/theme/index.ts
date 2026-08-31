import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import HomeBadges from './components/HomeBadges.vue'

/**
 * create-uni-app 文档站自定义主题
 *
 * 扩展默认主题，在首页 hero 之后注入 HomeBadges（npm 版本 / 下载量标徽）。
 */
export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			'home-hero-after': () => h(HomeBadges)
		})
	}
} satisfies Theme
