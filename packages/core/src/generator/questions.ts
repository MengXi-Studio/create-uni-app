/**
 * 交互式问答模块
 *
 * 交互顺序（技术栈 → 范围 → 收尾）：
 * 1. 项目名 → 2. 脚本语言(TS/JS) → 3. CSS 预处理器 → 4. 内置主题
 * → 5. 状态管理 → 6. 路由方案 → 7. 目标平台(多选) → 8. 可选功能(多选)
 * → 9. 包管理器 → 10. 是否自动安装
 *
 * 复刻 create-taro 的交互体验；支持由模板的 template.json 预填默认值。
 */
import prompts from 'prompts'
import { CreateOptions, QuestionPresets, CssPreprocessor, PlatformChoice, StateManager, RouterScheme } from '@/types'
import { Feature, Theme, ThemeOption } from '@/enums'
import { normalizePackageName } from '@/generator/utils'

/** 提问结果的中间形态（字段可能缺失 / 类型未定） */
type PartialAnswers = {
	projectName?: string
	platform: PlatformChoice[]
	useTypeScript?: boolean
	css: CssPreprocessor
	theme: ThemeOption
	state: StateManager
	router: RouterScheme
	features: Feature[]
	packageManager: 'npm' | 'yarn' | 'pnpm'
	installDeps: boolean
}

/** 根据值从 choices 中定位索引（用于 select 的 initial） */
function choiceIndex<T extends { value: unknown }>(choices: T[], value: unknown): number {
	const index = choices.findIndex(c => c.value === value)
	return index < 0 ? 0 : index
}

/** 目标平台的展示列表（全部端 / 分组快捷项放前面） */
const PLATFORM_CHOICES: { title: string; value: PlatformChoice; description: string }[] = [
	{ title: '全部端（推荐）', value: 'multi', description: 'H5 + 各小程序 + App + 快应用' },
	{
		title: '小程序（全部）',
		value: 'mp-group',
		description: '微信/支付宝/百度/抖音/QQ/飞书/京东/快手/小红书'
	},
	{
		title: '快应用（全部）',
		value: 'quickapp-group',
		description: '通用 / 华为 / 联盟'
	},
	{ title: 'H5', value: 'h5', description: '浏览器端' },
	{ title: '微信小程序', value: 'mp-weixin', description: '微信小程序' },
	{ title: 'App (原生)', value: 'app', description: 'Android / iOS' },
	{ title: '支付宝小程序', value: 'mp-alipay', description: '支付宝小程序' },
	{ title: '百度小程序', value: 'mp-baidu', description: '百度小程序' },
	{ title: '抖音小程序', value: 'mp-toutiao', description: '字节跳动系（抖音/头条）' },
	{ title: 'QQ 小程序', value: 'mp-qq', description: 'QQ 小程序' },
	{ title: '飞书小程序', value: 'mp-lark', description: '飞书小程序' },
	{ title: '京东小程序', value: 'mp-jd', description: '京东小程序' },
	{ title: '快手小程序', value: 'mp-kuaishou', description: '快手小程序' },
	{ title: '小红书小程序', value: 'mp-xhs', description: '小红书小程序' },
	{ title: '快应用（通用）', value: 'quickapp-webview', description: '快应用 webview' },
	{ title: '快应用（华为）', value: 'quickapp-webview-huawei', description: '华为快应用' },
	{ title: '快应用（联盟）', value: 'quickapp-webview-union', description: '快应用联盟' }
]

/** 可选功能的展示列表（状态管理、路由方案均已在独立步骤中选择） */
const FEATURE_CHOICES: { title: string; value: Feature; description: string }[] = [
	{
		title: '请求封装 + 登录鉴权',
		value: Feature.Request,
		description: '统一拦截、token 与登录守卫'
	},
	{
		title: 'uni-ui 组件库',
		value: Feature.UniUi,
		description: '配置 easycom 按需引入'
	}
]

/** 路由 / 页面生成方案的展示列表（互斥选一） */
const ROUTER_CHOICES: { title: string; value: RouterScheme; description?: string }[] = [
	{
		title: '不使用',
		value: 'none',
		description: '保持 uni-app 原生页面跳转'
	},
	{
		title: 'uni-router（手动配置路由）',
		value: 'router',
		description: '仅引入 uni-router，路由配置手写维护'
	},
	{
		title: 'uni-router + generateRouter（推荐）',
		value: 'router-generate',
		description: '手动 pages.json + 自动生成路由配置与类型'
	},
	{
		title: '仅 generatePages',
		value: 'pages',
		description: '扫描页面 + 宏/route-config 自动生成 pages.json（无路由）'
	},
	{
		title: 'uni-router + generateUni',
		value: 'uni',
		description: '页面与路由全自动生成（现代化范式）'
	}
]

/** 状态管理的展示列表（含持久化选项，二选一） */
const STATE_CHOICES: { title: string; value: StateManager; description?: string }[] = [
	{
		title: 'Pinia + 持久化（推荐）',
		value: 'pinia-persist',
		description: '组合式 API + pinia-plugin-persistedstate 状态自动持久化'
	},
	{
		title: 'Pinia',
		value: 'pinia',
		description: 'Vue3 官方推荐，组合式 API 友好'
	},
	{
		title: 'Vuex + 持久化',
		value: 'vuex-persist',
		description: 'vuex@4 + vuex-persistedstate 状态自动持久化'
	},
	{
		title: 'Vuex',
		value: 'vuex',
		description: 'Vue2 时代主流，vuex@4 兼容 Vue3'
	},
	{ title: '不使用', value: 'none', description: '不引入状态管理' }
]

/** 脚本语言的展示列表 */
const TS_CHOICES: { title: string; value: boolean; description?: string }[] = [
	{
		title: 'TypeScript（推荐）',
		value: true,
		description: '类型安全，生成 tsconfig.json / env.d.ts'
	},
	{
		title: 'JavaScript',
		value: false,
		description: '轻量快速，生成 jsconfig.json'
	}
]

/** 内置主题的展示列表（多套主流审美配色） */
const THEME_CHOICES: { title: string; value: ThemeOption; description: string }[] = [
	{ title: '不使用内置主题', value: 'none', description: '仅保留最基础的全局样式' },
	{ title: '默认紫', value: Theme.Default, description: '品牌紫色 #4b3fe3' },
	{ title: '清新蓝', value: Theme.Blue, description: '冷静蓝 #2563eb' },
	{ title: '自然绿', value: Theme.Green, description: '生态绿 #059669' },
	{ title: '温暖橙', value: Theme.Orange, description: '活力橙 #ea580c' }
]

/** CSS 预处理器的展示列表 */
const CSS_CHOICES: { title: string; value: CssPreprocessor; description?: string }[] = [
	{ title: 'Sass / Scss（推荐）', value: 'scss' },
	{ title: 'Less', value: 'less' },
	{ title: 'Stylus', value: 'stylus' },
	{ title: '不使用（原生 CSS）', value: 'none', description: '通过 CSS 变量也可使用内置主题' }
]

/** 包管理器展示列表 */
const PKG_MANAGER_CHOICES: { title: string; value: 'npm' | 'yarn' | 'pnpm' }[] = [
	{ title: 'npm', value: 'npm' },
	{ title: 'yarn', value: 'yarn' },
	{ title: 'pnpm', value: 'pnpm' }
]

/**
 * 组装并执行交互问答，返回标准化后的选项对象。
 *
 * @param initialName 通过命令行参数传入的项目名，可为空
 * @param presets 由模板 template.json 提供的预填默认值，可为空
 * @returns 问答结果；用户中途取消时抛错
 */
export async function askQuestions(initialName?: string, presets?: QuestionPresets): Promise<CreateOptions> {
	const state = { aborted: false }
	// multiselect 的 initial 为数组，@types/prompts 类型受限，交由类型推断并在调用时 cast
	const questions = [
		{
			type: 'text',
			name: 'projectName',
			message: '项目名称：',
			initial: initialName,
			validate: (value: unknown): string | boolean => {
				if (!normalizePackageName(String(value ?? ''))) {
					return '项目名不能为空，且只能包含小写字母、数字、中划线、点、下划线'
				}
				return true
			}
		},
		{
			type: 'select',
			name: 'useTypeScript',
			message: '选择脚本语言：',
			initial: presets ? choiceIndex(TS_CHOICES, presets.useTypeScript ?? true) : 0,
			choices: TS_CHOICES
		},
		{
			type: 'select',
			name: 'css',
			message: '选择 CSS 预处理器：',
			initial: presets ? choiceIndex(CSS_CHOICES, presets.css) : 0,
			choices: CSS_CHOICES
		},
		{
			type: 'select',
			name: 'theme',
			message: '选择内置主题（全局混入主题变量；原生 CSS 使用 CSS 变量）：',
			initial: presets ? choiceIndex(THEME_CHOICES, presets.theme ?? Theme.Default) : 1,
			choices: THEME_CHOICES
		},
		{
			type: 'select',
			name: 'state',
			message: '选择状态管理方案：',
			initial: presets ? choiceIndex(STATE_CHOICES, presets.state ?? 'pinia-persist') : 0,
			choices: STATE_CHOICES
		},
		{
			type: 'select',
			name: 'router',
			message: '选择路由 / 页面生成方案：',
			initial: presets ? choiceIndex(ROUTER_CHOICES, presets.router ?? 'none') : 0,
			choices: ROUTER_CHOICES
		},
		{
			type: 'multiselect',
			name: 'platform',
			message: '目标平台（空格勾选，回车确认）：',
			hint: ' 空格选择，回车继续',
			instructions: false,
			choices: PLATFORM_CHOICES,
			initial: presets?.platform ?? ['multi']
		},
		{
			type: 'multiselect',
			name: 'features',
			message: '选择需要集成的功能（空格勾选，回车确认）：',
			hint: ' 空格选择，回车继续',
			instructions: false,
			choices: FEATURE_CHOICES,
			initial: presets?.features ?? []
		},
		{
			type: 'select',
			name: 'packageManager',
			message: '包管理器：',
			initial: presets ? choiceIndex(PKG_MANAGER_CHOICES, presets.packageManager ?? 'npm') : 0,
			choices: PKG_MANAGER_CHOICES
		},
		{
			type: 'toggle',
			name: 'installDeps',
			message: '生成后是否立即安装依赖？',
			initial: presets?.installDeps ?? true,
			active: '安装',
			inactive: '稍后自己装'
		}
	]

	const answers: PartialAnswers = {
		projectName: initialName,
		platform: presets?.platform ?? ['multi'],
		useTypeScript: presets?.useTypeScript ?? true,
		css: presets?.css ?? 'scss',
		theme: presets?.theme ?? Theme.Default,
		state: presets?.state ?? 'pinia-persist',
		router: presets?.router ?? 'none',
		features: presets?.features ?? [],
		packageManager: presets?.packageManager ?? 'npm',
		installDeps: presets?.installDeps ?? true
	}

	for (const question of questions) {
		const name = question.name as string
		if (name === 'projectName' && answers.projectName) {
			continue
		}
		const response = await prompts(question as prompts.PromptObject)
		if (response[name] === undefined) {
			state.aborted = true
			break
		}
		;(answers as Record<string, unknown>)[name] = response[name]
	}

	if (state.aborted) {
		throw new Error('用户取消了创建')
	}

	// 目录名与 package.name 统一使用清洗后的安全名，避免空格/大写等非法字符
	const safeName = normalizePackageName(answers.projectName ?? '') ?? 'uni-app-project'

	return {
		projectName: safeName,
		platform: answers.platform ?? [],
		useTypeScript: answers.useTypeScript ?? true,
		css: answers.css,
		theme: answers.css === 'none' ? 'none' : (answers.theme ?? Theme.Default),
		state: answers.state ?? 'pinia-persist',
		router: answers.router ?? 'none',
		features: answers.features ?? [],
		packageManager: answers.packageManager,
		installDeps: answers.installDeps
	} satisfies CreateOptions
}
