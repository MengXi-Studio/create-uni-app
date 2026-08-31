/**
 * 登录态（token）本地存取工具（TypeScript）
 */
const TOKEN_KEY = 'uni_token'

/** 保存 token */
export function setToken(token: string): void {
  uni.setStorageSync(TOKEN_KEY, token)
}

/** 获取 token */
export function getToken(): string {
  return uni.getStorageSync(TOKEN_KEY) || ''
}

/** 清除 token（退出登录） */
export function clearToken(): void {
  uni.removeStorageSync(TOKEN_KEY)
}