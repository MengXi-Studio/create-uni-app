/**
 * 可选功能与状态管理、路由方案对应的依赖
 */
import { Feature } from '../enums'
import { RouterScheme, StateManager } from '../types'

/** 各可选功能需要合并进 package.json dependencies 的依赖 */
export const FEATURE_DEPS: Partial<Record<Feature, Record<string, string>>> = {
	[Feature.UniUi]: { '@dcloudio/uni-ui': '^1.5.4' }
}

/** 各可选功能需要合并进 package.json devDependencies 的依赖 */
export const FEATURE_DEV_DEPS: Partial<Record<Feature, Record<string, string>>> = {}

/** 路由方案（包含 uni-router）对应的运行时依赖 */
const ROUTER_DEPS: Record<'router' | 'router-generate' | 'uni', Record<string, string>> = {
	router: { '@meng-xi/uni-router': '^2.7.0' },
	'router-generate': { '@meng-xi/uni-router': '^2.7.0' },
	uni: { '@meng-xi/uni-router': '^2.7.0' }
}

/** 路由方案使用 @meng-xi/vite-plugin 生成插件的 devDependencies（generatePages/generateUni 用）
 *  - router-generate / uni：依赖 vite-plugin（generateRouter / generateUni）
 *  - pages：依赖 vite-plugin（generatePages）
 */
const ROUTER_DEV_DEPS: Record<'router-generate' | 'pages' | 'uni', Record<string, string>> = {
	'router-generate': { '@meng-xi/vite-plugin': '^1.4.0' },
	pages: { '@meng-xi/vite-plugin': '^1.4.0' },
	uni: { '@meng-xi/vite-plugin': '^1.4.0' }
}

/** 路由方案对应的 vite 生成插件名（router 方案为纯 uni-router，不注入插件） */
export const ROUTER_PLUGINS: Record<'router-generate' | 'pages' | 'uni', string> = {
	'router-generate': 'generateRouter',
	pages: 'generatePages',
	uni: 'generateUni'
}

/**
 * 获取路由方案需要合并的依赖与开发依赖。
 *
 * @param scheme 路由方案
 * @returns { dependencies, devDependencies }
 */
export function getRouterDeps(scheme: RouterScheme): { dependencies: Record<string, string>; devDependencies: Record<string, string> } {
	const deps: Record<string, string> = { ...(ROUTER_DEPS[scheme as keyof typeof ROUTER_DEPS] ?? {}) }
	const devDeps: Record<string, string> = {
		...(ROUTER_DEV_DEPS[scheme as keyof typeof ROUTER_DEV_DEPS] ?? {})
	}
	return { dependencies: deps, devDependencies: devDeps }
}

/** 状态管理方案（非 none）对应的运行时依赖；-persist 后缀附带持久化插件 */
export const STATE_DEPS: Record<Exclude<StateManager, 'none'>, Record<string, string>> = {
	pinia: { pinia: '^2.1.7' },
	'pinia-persist': { pinia: '^2.1.7', 'pinia-plugin-persistedstate': '^4.1.1' },
	vuex: { vuex: '^4.1.0' },
	'vuex-persist': { vuex: '^4.1.0', 'vuex-persistedstate': '^4.1.0' }
}
