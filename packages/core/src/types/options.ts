/**
 * 用户问答选项与渲染上下文的全局配置类型
 */
import { PlatformChoice } from './platform'
import { Feature, ThemeOption } from '../enums'

/** CSS 预处理器 */
export type CssPreprocessor = 'scss' | 'less' | 'stylus' | 'none'

/**
 * 状态管理方案（含持久化选项；-persist 后缀表示启用状态持久化插件）
 *  - pinia / pinia-persist：Pinia（可选 pinia-plugin-persistedstate）
 *  - vuex / vuex-persist：Vuex（可选 vuex-persistedstate）
 */
export type StateManager = 'pinia' | 'pinia-persist' | 'vuex' | 'vuex-persist' | 'none'

/**
 * 路由 / 页面生成方案（互斥选一）
 *  - router：仅 uni-router，路由配置由手写 src/router.config 提供
 *  - router-generate：uni-router + @meng-xi/vite-plugin 的 generateRouter（传统模式：手动 pages.json + 自动路由）
 *  - pages：仅 generatePages（扫描页面 + 宏/route-config 自动生成 pages.json，无路由）
 *  - uni：uni-router + generateUni（现代化：页面与路由全自动）
 */
export type RouterScheme = 'none' | 'router' | 'router-generate' | 'pages' | 'uni'

/** 包管理器 */
export type PackageManager = 'npm' | 'yarn' | 'pnpm'

/** 用户交互问答的最终结果 */
export interface CreateOptions {
	/** 项目名称（目录名） */
	projectName: string
	/** 目标编译平台（可多选，含分组快捷项；'multi' 表示全端） */
	platform: PlatformChoice[]
	/** 是否启用 TypeScript */
	useTypeScript: boolean
	/** CSS 预处理器 */
	css: CssPreprocessor
	/** 内置主题选择（仅当选择预处理器时有意义；'none' 表示不使用） */
	theme: ThemeOption
	/** 状态管理方案（Pinia / Vuex / 不使用） */
	state: StateManager
	/** 路由 / 页面生成方案 */
	router: RouterScheme
	/** 勾选的功能集合 */
	features: Feature[]
	/** 包管理器类型 */
	packageManager: PackageManager
	/** 是否在生成后执行依赖安装 */
	installDeps: boolean
	/** 可选：uni-app 运行时版本号（缺省用内置默认值） */
	uniVersion?: string
}

/** 模板渲染上下文，供占位符替换使用 */
export interface TemplateContext extends CreateOptions {
	/** 校验后的合法项目名（npm 安全，用作 package.name） */
	safeName: string
	/** 主入口文件扩展名：ts 或 js */
	ext: 'ts' | 'js'
	/** 样式文件后缀：scss / less / stylus / css */
	cssExt: 'scss' | 'less' | 'stylus' | 'css'
	/** Vite css.preprocessorOptions 注入片段（less/stylus 主题全局注入用，scss 走 uni.scss 无需配置） */
	cssPreprocessorConfig: string
	/** 主入口中导入全局主题文件的语句（原生 CSS 主题经 import '@/theme.css' 生效，其余为空） */
	themeImport: string
	/** uni-app 运行时版本号 */
	uniVersion: string
	/** 状态管理在 import 区的注入语句（Pinia/Vuex，勾选时注入 main 入口） */
	stateImport: string
	/** 状态管理在 createApp 之前的实例/插件初始化语句（Pinia 注册持久化插件等） */
	stateSetup: string
	/** 状态管理在 createApp 中的 app.use 注入语句（Pinia/Vuex） */
	stateUse: string
	/** Pinia store 的持久化选项片段（persist: true，仅带持久化时注入） */
	statePersistOption: string
	/** Vuex store 的持久化插件 import 语句（仅带持久化时注入） */
	statePersistImport: string
	/** vuex store 的 plugins 配置行（仅带持久化时注入） */
	statePersistPlugins: string
	/** uni-router 的 import 语句（勾选时注入 main 入口） */
	routerImport: string
	/** uni-router 的 router 实例创建语句（勾选时注入 main 入口顶层） */
	routerSetup: string
	/** uni-router 的 app.use(router) 注入语句 */
	routerUse: string
	/** vite.config 顶部 import 语句（按路由方案导入 generateRouter/generatePages/generateUni） */
	vitePluginImports: string
	/** vite.config plugins 数组追加项（对应生成插件调用） */
	vitePluginList: string
	/** uni-ui easycom 配置块（勾选 uni-ui 时注入 pages.json） */
	easycomBlock: string
	/** 内置主题色板行（注入 uni.scss） */
	paletteLines: string
	/** TS 专属 scripts 片段（选 TS 时注入 package.json） */
	tsScripts: string
	/** TS 专属 devDependencies 片段（选 TS 时注入 package.json） */
	tsDevDeps: string
	/** manifest.json 的平台配置块（按所选平台注入） */
	platformBlocks: string
}

/** 可由模板 template.json 预填的交互项 */
export type QuestionPresets = Partial<Pick<CreateOptions, 'useTypeScript' | 'css' | 'theme' | 'state' | 'router' | 'platform' | 'features' | 'packageManager' | 'installDeps'>>
