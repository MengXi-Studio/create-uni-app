/**
 * 模板生成引擎
 *
 * 负责把「基础骨架 + 按需功能片段」合并渲染成目标 uni-app 项目。
 * 设计上吸收 create-taro 的模板源与动态 handler 思路：
 *  - templates/base  —— 基础骨架（静态 + ${} 占位符）
 *  - templates/entry —— 按 TS/JS 二选一拷贝的主入口
 *  - templates/features —— 按勾选功能逐个拷贝的功能片段
 */
import fs from 'node:fs'
import path from 'node:path'
import { TargetPlatform, PlatformChoice, CssPreprocessor, StateManager, RouterScheme, CreateOptions, TemplateContext } from '@/types'
import { Feature, Theme } from '@/enums'
import { UNI_VERSION, ALL_TARGET_PLATFORMS, PLATFORM_GROUPS, PLATFORM_SCRIPTS, PLATFORM_DEPS, ALL_SCRIPTS, renderThemeVars, getRouterDeps, ROUTER_PLUGINS, FEATURE_DEPS, FEATURE_DEV_DEPS, STATE_DEPS } from '@/constants'
import { copyDir, getTemplatesRoot, renderTemplate } from '@/generator/utils'

/**
 * 对象键按字母升序排序，得到稳定、标准化的依赖展示顺序。
 *
 * @param obj 待排序对象
 * @returns 按键排序后的新对象
 */
function sortObjectByKeys<T>(obj: Record<string, T>): Record<string, T> {
	return Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)))
}

/**
 * 按 TS/JS 选择并拷贝功能片段目录（目录结构为 features/<feature>/<ext>/...）。
 *
 * @param templatesRoot 模板根目录
 * @param feature 功能片段名（对应 features/ 下的子目录）
 * @param ext 脚本语言扩展名
 * @param projectDir 目标项目根目录
 * @param render 渲染回调
 */
function copyFeatureDir(templatesRoot: string, feature: string, ext: 'ts' | 'js', projectDir: string, render: (content: string) => string): void {
	const root = path.join(templatesRoot, 'features', feature, ext)
	if (fs.existsSync(root)) {
		copyDir(root, projectDir, render)
	}
}

/** 各预处理器在模板 `<style lang>` 中使用的后缀 */
const CSS_EXT: Record<CssPreprocessor, 'scss' | 'less' | 'stylus' | 'css'> = {
	scss: 'scss',
	less: 'less',
	stylus: 'stylus',
	none: 'css'
}

/** 各预处理器需要合并进 package.json devDependencies 的编译依赖 */
const CSS_DEPS: Partial<Record<CssPreprocessor, Record<string, string>>> = {
	scss: { sass: '^1.77.8' },
	less: { less: '^4.2.0' },
	stylus: { stylus: '^0.63.0' }
}

/** 平台分组快捷项标识（与 PLATFORM_GROUPS 键一致） */
const GROUP_IDS = Object.keys(PLATFORM_GROUPS) as (keyof typeof PLATFORM_GROUPS)[]

/**
 * 展开勾选的平台（含分组快捷项），返回去重后的真实平台列表。
 * 空数组或含 multi（全部端）时返回全量平台。
 *
 * @param selected 勾选的平台项（真实平台或分组快捷项）
 * @returns 去重后的真实平台列表
 */
function expandPlatforms(selected: PlatformChoice[]): Exclude<TargetPlatform, 'multi'>[] {
	if (selected.length === 0 || selected.includes('multi')) {
		return ALL_TARGET_PLATFORMS
	}
	const set = new Set<Exclude<TargetPlatform, 'multi'>>()
	for (const item of selected) {
		if (item === 'multi') continue
		if ((GROUP_IDS as string[]).includes(item)) {
			for (const p of PLATFORM_GROUPS[item as keyof typeof PLATFORM_GROUPS]) set.add(p)
		} else {
			set.add(item as Exclude<TargetPlatform, 'multi'>)
		}
	}
	return [...set]
}

/**
 * 构建渲染上下文，除基础选项外还注入模板中用到的派生变量。
 *
 * @param options 用户问答结果
 * @returns 渲染上下文
 */
function buildContext(options: CreateOptions): TemplateContext {
	const featureSet = new Set(options.features)
	const useTs = options.useTypeScript
	const cssExt = CSS_EXT[options.css]
	// 支持通过 --uni-version 覆盖默认版本
	const uniVersion = options.uniVersion ?? UNI_VERSION
	// uni-ui 通过 pages.json 的 easycom 按需引入
	const easycomBlock = featureSet.has(Feature.UniUi) ? ',\n  "easycom": { "autoscan": true, "custom": { "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue" } }' : ''

	return {
		...options,
		safeName: options.projectName,
		ext: useTs ? 'ts' : 'js',
		cssExt,
		cssPreprocessorConfig: buildCssPreprocessorConfig(options),
		themeImport: options.css === 'none' && options.theme !== 'none' ? "import '@/theme.css'" : '',
		uniVersion,
		stateImport: buildStateImport(options.state),
		stateSetup: buildStateSetup(options.state),
		stateUse: buildStateUse(options.state),
		statePersistOption: buildStatePersistOption(options.state),
		statePersistImport: buildStatePersistImport(options.state),
		statePersistPlugins: buildStatePersistPlugins(options.state),
		statePersistStoreImport: buildStatePersistStoreImport(options.state),
		statePersistStoreUse: buildStatePersistStoreUse(options.state),
		routerImport: buildRouterImport(options.router),
		routerSetup: buildRouterSetup(options.router),
		routerUse: buildRouterUse(options.router),
		vitePluginImports: buildVitePluginImports(options.router),
		vitePluginList: buildVitePluginList(options.router),
		easycomBlock,
		// 主题色板行：选主题时按预处理器语法渲染；未选主题回退默认主题的 scss 色板，
		// 保证 base/uni.scss（始终为 scss 语法）在无主题时仍有默认变量
		paletteLines: options.theme !== 'none' ? renderThemeVars(options.theme as Theme, options.css) : renderThemeVars(Theme.Default, 'scss'),
		// TS 专属的脚本与依赖，仅在选 TS 时注入，避免 JS 项目出现多余依赖
		tsScripts: useTs ? ',\n    "type-check": "vue-tsc --noEmit"' : '',
		tsDevDeps: useTs ? ',\n    "@vue/tsconfig": "^0.5.1",\n    "typescript": "^5.4.5",\n    "vue-tsc": "^2.0.13"' : '',
		platformBlocks: buildPlatformManifestBlocks(options)
	} as TemplateContext
}

/**
 * 判断状态管理方案是否启用持久化。
 *
 * @param state 状态管理方案
 * @returns 是否启用持久化
 */
function isStatePersist(state: StateManager): boolean {
	return state === 'pinia-persist' || state === 'vuex-persist'
}

/**
 * 构建状态管理在 main 入口 import 区的注入语句。
 *
 * @param state 状态管理方案
 * @returns import 语句（含换行）；none 时返回空字符串
 */
function buildStateImport(state: StateManager): string {
	if (state === 'pinia' || state === 'pinia-persist') {
		return "import { createPiniaStore } from './stores'\n"
	}
	if (state === 'vuex' || state === 'vuex-persist') {
		return "import store from './stores'\n"
	}
	return ''
}

/**
 * 构建状态管理在 createApp 之前的实例初始化语句。
 * Pinia 实例由 stores/index 的 createPiniaStore 创建；Vuex 的持久化在 store 内配置。
 *
 * @param state 状态管理方案
 * @returns 初始化语句（含前后换行）；none 时返回空字符串
 */
function buildStateSetup(state: StateManager): string {
	if (state === 'pinia' || state === 'pinia-persist') {
		return '\nconst pinia = createPiniaStore()\n'
	}
	return ''
}

/**
 * 构建状态管理在 createApp 中的 app.use 注入语句。
 *
 * @param state 状态管理方案
 * @returns app.use 语句（含前后换行）；none 时返回空字符串
 */
function buildStateUse(state: StateManager): string {
	if (state === 'pinia' || state === 'pinia-persist') {
		return '\n  app.use(pinia)\n'
	}
	if (state === 'vuex' || state === 'vuex-persist') {
		return '\n  app.use(store)\n'
	}
	return ''
}

/**
 * 构建 Pinia stores/index 顶部的持久化插件 import 语句（仅启用持久化时）。
 *
 * @param state 状态管理方案
 * @returns import 语句；未启用持久化时返回空字符串
 */
function buildStatePersistStoreImport(state: StateManager): string {
	return isStatePersist(state) ? "import piniaPersist from 'pinia-plugin-persistedstate'" : ''
}

/**
 * 构建 Pinia stores/index 中持久化插件的注册语句（仅启用持久化时）。
 *
 * @param state 状态管理方案
 * @returns 注册语句；未启用持久化时返回空字符串
 */
function buildStatePersistStoreUse(state: StateManager): string {
	return isStatePersist(state) ? '\n  pinia.use(piniaPersist)' : ''
}

/**
 * 构建 Pinia store 的持久化选项片段（defineStore 第三参数）。
 *
 * @param state 状态管理方案
 * @returns persist 选项片段；未启用持久化时返回空字符串
 */
function buildStatePersistOption(state: StateManager): string {
	return isStatePersist(state) ? ',\n  {\n    persist: true,\n  }' : ''
}

/**
 * 构建 Vuex store 的持久化插件 import 语句（并入 createStore 所在行，避免空行）。
 *
 * @param state 状态管理方案
 * @returns import 语句（含换行前缀）；未启用持久化时返回空字符串
 */
function buildStatePersistImport(state: StateManager): string {
	return isStatePersist(state) ? "\nimport createPersistedState from 'vuex-persistedstate'" : ''
}

/**
 * 构建 Vuex store 的 plugins 配置行。
 *
 * @param state 状态管理方案
 * @returns plugins 配置行；未启用持久化时返回空字符串
 */
function buildStatePersistPlugins(state: StateManager): string {
	return isStatePersist(state) ? '  plugins: [createPersistedState()],' : ''
}

/**
 * 判断路由方案是否启用了 uni-router。
 *
 * @param scheme 路由方案
 * @returns 是否启用 uni-router
 */
function usesRouter(scheme: RouterScheme): boolean {
	return scheme === 'router' || scheme === 'router-generate' || scheme === 'uni'
}

/**
 * 判断路由方案是否使用 vite-plugin 生成插件。
 *
 * @param scheme 路由方案
 * @returns 是否注入生成插件
 */
function usesGeneratePlugin(scheme: RouterScheme): boolean {
	return scheme === 'router-generate' || scheme === 'pages' || scheme === 'uni'
}

/**
 * 构建 uni-router 在 main 入口 import 区的注入语句。
 *
 * @param scheme 路由方案
 * @returns import 语句；未启用 uni-router 时返回空字符串
 */
function buildRouterImport(scheme: RouterScheme): string {
	if (!usesRouter(scheme)) return ''
	return "import { createRouter, ParamsPlugin, ChannelPlugin, InterceptorPlugin } from '@meng-xi/uni-router';\n" + "import routes from './router.config';\n"
}

/**
 * 构建 uni-router 的 router 实例创建语句（注入 main 入口顶层）。
 *
 * @param scheme 路由方案
 * @returns 创建语句；未启用 uni-router 时返回空字符串
 */
function buildRouterSetup(scheme: RouterScheme): string {
	if (!usesRouter(scheme)) return ''
	return ['const router = createRouter({', '  routes,', '  plugins: [ParamsPlugin, ChannelPlugin, InterceptorPlugin],', '  interceptUniApi: true,', '});', ''].join('\n')
}

/**
 * 构建 uni-router 的 app.use(router) 注入语句。
 *
 * @param scheme 路由方案
 * @returns app.use 语句；未启用 uni-router 时返回空字符串
 */
function buildRouterUse(scheme: RouterScheme): string {
	return usesRouter(scheme) ? '\n  app.use(router);\n' : ''
}

/**
 * 构建 vite.config(.ts/.js) 顶部 import 语句（导入对应生成插件）。
 *
 * @param scheme 路由方案
 * @returns import 语句；未使用时返回空字符串
 */
function buildVitePluginImports(scheme: RouterScheme): string {
	const name = usesGeneratePlugin(scheme) ? ROUTER_PLUGINS[scheme as keyof typeof ROUTER_PLUGINS] : ''
	return name ? `\nimport { ${name} } from '@meng-xi/vite-plugin'` : ''
}

/**
 * 构建 vite.config(.ts/.js) plugins 数组的追加项（生成插件调用）。
 *
 * @param scheme 路由方案
 * @returns 追加项（含前导逗号）；未使用时返回空字符串
 */
function buildVitePluginList(scheme: RouterScheme): string {
	const name = usesGeneratePlugin(scheme) ? ROUTER_PLUGINS[scheme as keyof typeof ROUTER_PLUGINS] : ''
	return name ? `,\n  ${name}()` : ''
}

/**
 * 构建 vite.config(.ts/.js) 的 css.preprocessorOptions 注入片段。
 * scss 的主题经 uni.scss 由 uni-app 自动全局注入，无需配置；
 * less / stylus 需通过 additionalData 将主题文件注入每个样式文件。
 *
 * @param options 用户问答结果
 * @returns 注入片段；无需配置时返回空字符串
 */
function buildCssPreprocessorConfig(options: CreateOptions): string {
	if (options.theme === 'none' || options.css === 'none' || options.css === 'scss') {
		return ''
	}
	const lang = options.css as 'less' | 'stylus'
	const themeFile = lang === 'less' ? 'theme.less' : 'theme.styl'
	return ['  css: {', '    preprocessorOptions: {', `      ${lang}: {`, `        additionalData: \`@import "@/${themeFile}";\`,`, '      },', '    },', '  },'].join('\n')
}

/**
 * 依据所选平台生成 manifest.json 的平台配置块（JSON 片段）。
 * 全量模式输出全部 mp-* 与 h5 配置；单选时只保留所选平台。
 *
 * @param options 用户问答结果
 * @returns 以逗号+换行拼接的 JSON 平台块字符串（首块前带逗号）
 */
function buildPlatformManifestBlocks(options: CreateOptions): string {
	const platforms = expandPlatforms(options.platform)

	const blocks: string[] = []
	// 小程序平台（除微信外均用最简配置）
	const simpleMp: Exclude<TargetPlatform, 'multi'>[] = ['mp-alipay', 'mp-baidu', 'mp-toutiao', 'mp-qq', 'mp-lark', 'mp-jd', 'mp-kuaishou', 'mp-xhs']
	if (platforms.includes('mp-weixin')) {
		blocks.push('"mp-weixin": {\n    "appid": "",\n    "setting": {\n      "urlCheck": false,\n      "es6": true,\n      "minified": true\n    },\n    "usingComponents": true\n  }')
	}
	for (const platform of simpleMp) {
		if (platforms.includes(platform)) {
			blocks.push(`"${platform}": {\n    "usingComponents": true\n  }`)
		}
	}
	if (platforms.includes('h5')) {
		blocks.push(`"h5": {\n    "title": "${options.projectName}",\n    "router": {\n      "mode": "hash"\n    }\n  }`)
	}

	return blocks.length ? ',\n  ' + blocks.join(',\n  ') : ''
}

/**
 * 合并所选功能与 CSS 预处理器的依赖到目标 package.json。
 *
 * @param projectDir 生成的项目根目录
 * @param context 渲染上下文
 */
function mergeDependencies(projectDir: string, context: TemplateContext): void {
	const pkgPath = path.join(projectDir, 'package.json')
	const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as {
		dependencies?: Record<string, string>
		devDependencies?: Record<string, string>
		scripts?: Record<string, string>
	}

	const cssDeps = CSS_DEPS[context.css]
	if (cssDeps) {
		pkg.devDependencies = { ...cssDeps, ...(pkg.devDependencies ?? {}) }
	}

	for (const feature of context.features) {
		const deps = FEATURE_DEPS[feature]
		if (deps) {
			pkg.dependencies = { ...(pkg.dependencies ?? {}), ...deps }
		}
		const devDeps = FEATURE_DEV_DEPS[feature]
		if (devDeps) {
			pkg.devDependencies = { ...(pkg.devDependencies ?? {}), ...devDeps }
		}
	}

	// 路由方案依赖（uni-router / vite-plugin）
	const routerDeps = getRouterDeps(context.router)
	if (Object.keys(routerDeps.dependencies).length) {
		pkg.dependencies = { ...(pkg.dependencies ?? {}), ...routerDeps.dependencies }
	}
	if (Object.keys(routerDeps.devDependencies).length) {
		pkg.devDependencies = { ...(pkg.devDependencies ?? {}), ...routerDeps.devDependencies }
	}

	// 状态管理依赖（Pinia / Vuex）
	if (context.state !== 'none') {
		pkg.dependencies = { ...(pkg.dependencies ?? {}), ...STATE_DEPS[context.state] }
	}

	// 平台运行时依赖：全量模式装所有平台，单选时只装所选平台
	const targetPlatforms = expandPlatforms(context.platform)
	const platformDeps: Record<string, string> = {}
	for (const platform of targetPlatforms) {
		const depName = PLATFORM_DEPS[platform]
		if (depName) {
			platformDeps[depName] = context.uniVersion
		}
	}
	pkg.dependencies = { ...(pkg.dependencies ?? {}), ...platformDeps }

	overwriteScripts(context, pkg)

	// 统一按键排序，保证生成顺序稳定（标准输出）
	pkg.dependencies = sortObjectByKeys(pkg.dependencies ?? {})
	pkg.devDependencies = sortObjectByKeys(pkg.devDependencies ?? {})

	fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8')
}

/**
 * 生成整个 uni-app 项目骨架到目标目录。
 *
 * @param options 用户问答结果
 * @param projectDir 目标项目绝对路径
 */
export function generateProject(options: CreateOptions, projectDir: string, templateRoot?: string): void {
	const context = buildContext(options)
	// 优先使用自定义模板源，缺省回退内置模板
	const templatesRoot = templateRoot ?? getTemplatesRoot()
	const render = (content: string) => renderTemplate(content, context as unknown as Record<string, unknown>)

	// 1. 拷贝基础骨架
	copyDir(path.join(templatesRoot, 'base'), projectDir, render)
	// TS 项目使用 vite.config.ts（内容与扩展名无关，vite 会自动探测 .ts 配置）
	if (context.ext === 'ts') {
		const viteJs = path.join(projectDir, 'vite.config.js')
		if (fs.existsSync(viteJs)) {
			fs.renameSync(viteJs, path.join(projectDir, 'vite.config.ts'))
		}
	}

	// 2. 按 TS/JS 拷贝主入口（main.ts / main.js 进 src）
	copyDir(path.join(templatesRoot, 'entry', context.ext), path.join(projectDir, 'src'), render)

	// 3. 按 TS/JS 拷贝根级工程文件（TS→tsconfig/env.d.ts；JS→jsconfig.json）
	if (context.ext === 'ts') {
		copyDir(path.join(templatesRoot, 'entry', 'ts-root'), projectDir, render)
	} else {
		copyDir(path.join(templatesRoot, 'entry', 'js-root'), projectDir, render)
	}

	// 4. 内置主题（全局混入；scss 走 uni.scss，less/stylus 经 vite additionalData，
	//    原生 CSS 走主入口 import '@/theme.css'）
	if (context.theme !== 'none') {
		const themeLang = context.css === 'none' ? 'css' : context.css
		const themeRoot = path.join(templatesRoot, 'features', 'themes', themeLang)
		if (fs.existsSync(themeRoot)) {
			copyDir(themeRoot, projectDir, render)
		}
	}

	// 5. 状态管理（Pinia / Vuex，可选持久化；none 跳过）
	if (context.state !== 'none') {
		const dir = context.state.startsWith('pinia') ? 'pinia' : 'vuex'
		copyFeatureDir(templatesRoot, dir, context.ext, projectDir, render)
	}

	// 6. 逐个拷贝已选功能片段
	for (const feature of context.features) {
		copyFeatureDir(templatesRoot, feature, context.ext, projectDir, render)
	}

	// 6.5 纯 uni-router 方案（无 vite 生成插件）：提供手写路由配置示例；
	//     generateRouter / generateUni 方案的路由配置由插件从 pages.json 自动生成
	if (context.router === 'router') {
		copyFeatureDir(templatesRoot, 'router', context.ext, projectDir, render)
	}

	// 6.6 generatePages / generateUni 方案：生成一个子包页面示例，
	//     命中插件默认 subPackages（root: pages-sub, dir: src/pages-sub）
	if (context.router === 'pages' || context.router === 'uni') {
		copyFeatureDir(templatesRoot, 'subpackage', context.ext, projectDir, render)
	}

	// 7. 合并依赖，并按目标平台精简脚本
	mergeDependencies(projectDir, context)
}

/**
 * 按目标平台生成 scripts：
 *  - 全量（multi / 空）：输出所有平台的 dev/build 脚本
 *  - 单选：只保留所选平台，并额外带上 h5 的 SSR 脚本
 *  - TS 场景追加 type-check
 *
 * @param context 渲染上下文
 * @param pkg 目标 package.json
 */
function overwriteScripts(context: TemplateContext, pkg: { scripts?: Record<string, string> }): void {
	let scripts: Record<string, string>
	const useAll = context.platform.length === 0 || context.platform.includes('multi')

	if (useAll) {
		scripts = { ...ALL_SCRIPTS }
	} else {
		scripts = {}
		for (const platform of expandPlatforms(context.platform)) {
			const script = PLATFORM_SCRIPTS[platform]
			if (!script) continue
			scripts[`dev:${platform}`] = script.dev
			scripts[`build:${platform}`] = script.build
			// h5 额外带 SSR 脚本
			if (platform === 'h5') {
				scripts['dev:h5:ssr'] = 'uni --ssr'
				scripts['build:h5:ssr'] = 'uni build --ssr'
			}
		}
	}

	// TS 场景额外保留类型检查脚本（否则会被 scripts 重建覆盖丢弃）
	if (context.ext === 'ts') {
		scripts['type-check'] = 'vue-tsc --noEmit'
	}

	pkg.scripts = scripts
}
