/**
 * 可选功能枚举（状态管理 Pinia/Vuex 由独立的 state 步骤决定，不在此列）
 */
export enum Feature {
	/** 基于 uni.request 的统一请求封装与登录鉴权 */
	Request = 'request',
	/** uni-ui 组件库 */
	UniUi = 'uni-ui'
}
