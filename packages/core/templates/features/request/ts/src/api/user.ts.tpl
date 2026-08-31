/**
 * 用户相关接口示例（TypeScript）
 */
import { request } from '../utils/request'

/** 登录 */
export function login(data: Record<string, unknown>) {
  return request({ url: '/user/login', method: 'POST', data })
}

/** 获取用户信息 */
export function getUserInfo() {
  return request<Record<string, unknown>>({ url: '/user/info' })
}