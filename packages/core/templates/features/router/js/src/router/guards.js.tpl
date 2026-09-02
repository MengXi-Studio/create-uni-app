/**
 * 全局路由守卫（uni-router，JavaScript）
 *
 * 守卫采用返回值模式：
 *   return undefined / true  → 放行
 *   return false             → 中止导航
 *   return { name: 'login' } → 重定向
 */

/** 创建 router 实例后调用，注册全部全局守卫 */
export function setupRouterGuards(router) {
  // 全局前置守卫：登录鉴权 —— 目标页标记了 requireAuth 且未登录时跳转登录页
  router.beforeEach((to) => {
    if (to.meta.requireAuth && !uni.getStorageSync('token')) {
      return { name: 'login' }
    }
  })

  // 全局后置钩子：导航完成埋点 / 设置页面标题
  router.afterEach((to, from) => {
    console.log(`导航完成：${from.path} → ${to.path}`)
  })
}