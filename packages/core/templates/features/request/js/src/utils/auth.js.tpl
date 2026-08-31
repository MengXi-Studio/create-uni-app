/**
 * 登录态（token）本地存取工具
 */
const TOKEN_KEY = 'uni_token'

/** 保存 token */
export function setToken(token) {
  uni.setStorageSync(TOKEN_KEY, token)
}

/** 获取 token */
export function getToken() {
  return uni.getStorageSync(TOKEN_KEY) || ''
}

/** 清除 token（退出登录） */
export function clearToken() {
  uni.removeStorageSync(TOKEN_KEY)
}