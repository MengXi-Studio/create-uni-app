/**
 * 目标平台相关常量：平台 ID、脚本、运行时依赖
 */
import { TargetPlatform } from '../types'

/** 除 multi 外的全部真实平台（用于全量模式） */
export const ALL_TARGET_PLATFORMS: Exclude<TargetPlatform, 'multi'>[] = [
	'h5',
	'app',
	'mp-weixin',
	'mp-alipay',
	'mp-baidu',
	'mp-toutiao',
	'mp-qq',
	'mp-lark',
	'mp-jd',
	'mp-kuaishou',
	'mp-xhs',
	'quickapp-webview',
	'quickapp-webview-huawei',
	'quickapp-webview-union'
]

/** 平台分组快捷项：组标识 → 组内真实平台（用于把勾选的分组展开为具体平台） */
export const PLATFORM_GROUPS: Record<'mp-group' | 'quickapp-group', Exclude<TargetPlatform, 'multi'>[]> = {
	'mp-group': ALL_TARGET_PLATFORMS.filter(p => p.startsWith('mp-')),
	'quickapp-group': ALL_TARGET_PLATFORMS.filter(p => p.startsWith('quickapp-'))
}

/** 各平台对应的 dev/build 脚本（对齐官方 uni CLI 的 -p 参数） */
export const PLATFORM_SCRIPTS: Record<Exclude<TargetPlatform, 'multi'>, { dev: string; build: string }> = {
	h5: { dev: 'uni', build: 'uni build' },
	app: { dev: 'uni -p app', build: 'uni build -p app' },
	'mp-weixin': { dev: 'uni -p mp-weixin', build: 'uni build -p mp-weixin' },
	'mp-alipay': { dev: 'uni -p mp-alipay', build: 'uni build -p mp-alipay' },
	'mp-baidu': { dev: 'uni -p mp-baidu', build: 'uni build -p mp-baidu' },
	'mp-toutiao': { dev: 'uni -p mp-toutiao', build: 'uni build -p mp-toutiao' },
	'mp-qq': { dev: 'uni -p mp-qq', build: 'uni build -p mp-qq' },
	'mp-lark': { dev: 'uni -p mp-lark', build: 'uni build -p mp-lark' },
	'mp-jd': { dev: 'uni -p mp-jd', build: 'uni build -p mp-jd' },
	'mp-kuaishou': { dev: 'uni -p mp-kuaishou', build: 'uni build -p mp-kuaishou' },
	'mp-xhs': { dev: 'uni -p mp-xhs', build: 'uni build -p mp-xhs' },
	'quickapp-webview': { dev: 'uni -p quickapp-webview', build: 'uni build -p quickapp-webview' },
	'quickapp-webview-huawei': {
		dev: 'uni -p quickapp-webview-huawei',
		build: 'uni build -p quickapp-webview-huawei'
	},
	'quickapp-webview-union': {
		dev: 'uni -p quickapp-webview-union',
		build: 'uni build -p quickapp-webview-union'
	}
}

/** 各平台对应的运行时依赖包（全量模式全部安装；单选时仅装所选） */
export const PLATFORM_DEPS: Record<Exclude<TargetPlatform, 'multi'>, string> = {
	h5: '@dcloudio/uni-h5',
	app: '@dcloudio/uni-app-plus',
	'mp-weixin': '@dcloudio/uni-mp-weixin',
	'mp-alipay': '@dcloudio/uni-mp-alipay',
	'mp-baidu': '@dcloudio/uni-mp-baidu',
	'mp-toutiao': '@dcloudio/uni-mp-toutiao',
	'mp-qq': '@dcloudio/uni-mp-qq',
	'mp-lark': '@dcloudio/uni-mp-lark',
	'mp-jd': '@dcloudio/uni-mp-jd',
	'mp-kuaishou': '@dcloudio/uni-mp-kuaishou',
	'mp-xhs': '@dcloudio/uni-mp-xhs',
	'quickapp-webview': '@dcloudio/uni-quickapp-webview',
	'quickapp-webview-huawei': '@dcloudio/uni-quickapp-webview',
	'quickapp-webview-union': '@dcloudio/uni-quickapp-webview'
}

/** 全平台脚本集（含 custom 手动指定与 h5 SSR，对齐官方模板的脚本规范） */
export const ALL_SCRIPTS: Record<string, string> = (() => {
	const scripts: Record<string, string> = {
		'dev:custom': 'uni -p',
		'build:custom': 'uni build -p',
		'dev:h5:ssr': 'uni --ssr',
		'build:h5:ssr': 'uni build --ssr'
	}
	for (const platform of ALL_TARGET_PLATFORMS) {
		const script = PLATFORM_SCRIPTS[platform]
		scripts[`dev:${platform}`] = script.dev
		scripts[`build:${platform}`] = script.build
	}
	return scripts
})()
