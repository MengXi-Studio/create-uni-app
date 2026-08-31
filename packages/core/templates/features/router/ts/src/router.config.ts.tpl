/**
 * uni-router 路由配置（手动维护模式，TypeScript）
 *
 * 选择「uni-router（手动配置路由）」方案时生成。
 * 随着新增页面，按同样结构补充对应路由条目即可；
 * 若选用 generateRouter / generateUni 方案，本文件由插件自动生成，请勿手改。
 */
import type { RouteConfig } from '@meng-xi/uni-router'

const routes: RouteConfig[] = [
  {
    name: 'index',
    path: '/pages/index/index',
    meta: { title: '首页' },
  },
]

export default routes