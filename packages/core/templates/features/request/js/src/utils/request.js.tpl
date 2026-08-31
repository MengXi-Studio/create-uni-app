/**
 * 基于 uni.request 的统一请求封装
 * 支持：统一 baseURL、自动携带 token、错误提示、Promise 化
 */
import { getToken } from './auth'

const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://example.com/api'

/**
 * 发起请求
 * @param {Object} options 请求配置
 * @param {string} options.url 请求路径（相对 baseURL）
 * @param {string} options.method 请求方法，默认 GET
 * @param {Object} options.data 请求参数
 * @param {Object} options.header 额外请求头
 * @returns {Promise<any>} 响应数据
 */
export function request(options = {}) {
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
          resolve(res.data)
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