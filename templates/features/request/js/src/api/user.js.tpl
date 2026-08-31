/**
 * 用户相关接口示例
 */
import { request } from '../utils/request'

/** 登录 */
export function login(data) {
  return request({ url: '/user/login', method: 'POST', data })
}

/** 获取用户信息 */
export function getUserInfo() {
  return request({ url: '/user/info' })
}