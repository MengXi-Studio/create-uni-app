/**
 * 路由实例（uni-router，JavaScript）
 *
 * 创建全局路由实例；全局守卫见 ./guards（经 setupRouterGuards 注入）。
 * 路由配置来自 ../router.config —— generateRouter / generateUni 方案由 vite 插件自动生成，纯 uni-router 方案手写。
 */
import { createRouter, ParamsPlugin, ChannelPlugin, InterceptorPlugin } from '@meng-xi/uni-router'
import routes from '../router.config'
import { setupRouterGuards } from './guards'

const router = createRouter({
  routes,
  plugins: [ParamsPlugin, ChannelPlugin, InterceptorPlugin],
  interceptUniApi: true,
})

setupRouterGuards(router)

export default router