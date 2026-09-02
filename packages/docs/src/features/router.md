# 路由方案

路由 / 页面生成方案互斥选一，涵盖从「原生跳转」到「现代化全自动」的完整演进。选定后自动注入主入口、`vite.config` 及对应依赖。

## 演进对照

| 方案                          | pages.json | 路由配置               | 适用           |
| --------------------------- | ---------- | ------------------ | ------------ |
| 不使用                         | 手写         | 无                  | 只需原生跳转       |
| uni-router（手动）              | 手写         | 手写 `router.config` | 想用守卫，但习惯手写   |
| uni-router + generateRouter | 手写         | 自动生成（推荐）           | 传统 + 类型安全的平衡 |
| 仅 generatePages             | 自动生成       | 无                  | 只要自动建页，不要路由  |
| uni-router + generateUni    | 全自动        | 全自动                | 现代化全自动       |

## 方案列表

| 方案                              | 说明                                           |
| ------------------------------- | -------------------------------------------- |
| 不使用                             | 保持 uni-app 原生页面跳转                            |
| uni-router（手动配置）                | 仅引入 `@meng-xi/uni-router`，路由配置手写维护           |
| uni-router + generateRouter（推荐） | 手动 `pages.json` + 自动生成路由配置与类型                |
| 仅 generatePages                 | 扫描页面 + 宏/route-config 自动生成 `pages.json`（无路由） |
| uni-router + generateUni        | 页面与路由全自动生成（现代化范式）                            |

## 依赖映射

| 场景                                           | 依赖                                      |
| -------------------------------------------- | --------------------------------------- |
| uni-router 系                                 | `@meng-xi/uni-router`（dependencies）     |
| generateRouter / generatePages / generateUni | `@meng-xi/vite-plugin`（devDependencies） |

## 生成行为

| 方案                          | 生成行为                                                                                                                                                                                         |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| uni-router 系                | 生成 `src/router` 目录（`index` 创建 `createRouter({ routes, plugins, interceptUniApi })`，`guards` 内置全局守卫 `beforeEach` / `afterEach` 示例），主入口只注入 `import router from './router'` 与 `app.use(router)` |
| 纯 uni-router（无生成插件）         | 额外生成手写 `src/router.config` 示例                                                                                                                                                                |
| generatePages / generateUni | 向 `vite.config` 注入对应生成插件，并生成 `pages-sub` 子包页面示例 |                                                                                                                                          |

## 说明

- uni-router 依赖 `@meng-xi/vite-plugin` 从 `pages.json` 自动生成路由配置和类型声明（generateRouter / generateUni）

- `router`（纯手动）与 `router-generate` / `uni` 的区别在于是否依赖 vite 生成插件自动产出 `router.config`

## 下一步

- [集成项](./features) — 请求封装与 uni-ui

