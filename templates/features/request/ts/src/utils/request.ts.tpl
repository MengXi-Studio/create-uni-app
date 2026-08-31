/**
 * 基于 uni.request 的统一请求封装（TypeScript）
 * 支持：统一 baseURL、自动携带 token、错误提示、Promise 化
 */
import { getToken } from './auth'

const BASE_URL: string = import.meta.env.VITE_BASE_URL || 'https://example.com/api'

/** 请求配置 */
export interface RequestOptions {
  /** 请求路径（相对 baseURL） */
  url?: string
  /** 请求方法，默认 GET */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  /** 请求参数 */
  data?: Record<string, unknown>
  /** 额外请求头 */
  header?: Record<string, string>
}

/**
 * 发起请求，返回响应数据。
 *
 * @param options 请求配置
 * @returns Promise 化后的响应数据
 */
export function request<T = unknown>(options: RequestOptions = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}${options.url || ''}`,
      method: options.method || 'GET',
      data: options.data,
      header: {
        Authorization: getToken() ? `Bearer ${getToken()}` : '',
        ...(options.header || {}),
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as T)
        } else {
          uni.showToast({ title: '请求失败', icon: 'none' })
          reject(res)
        }
      },
      fail: (err) => {
        uni.showToast({ title: '网络异常，请稍后重试', icon: 'none' })
        reject(err)
      },
    })
  })
}