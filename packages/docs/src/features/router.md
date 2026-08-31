# 路由方案

路由 / 页面生成方案互斥选一，涵盖从「原生跳转」到「现代化全自动」的完整演进。

## 方案列表

| 方案 | 说明 |
| --- | --- |
| 不使用 | 保持 uni-app 原生页面跳转 |
| uni-router（手动配置） | 仅引入 `@meng-xi/uni-router`，路由配置手写维护 |
| uni-router + generateRouter（推荐） | 手动 `pages.json` + 自动生成路由配置与类型 |
| 仅 generatePages | 扫描页面 + 宏/route-config 自动生成 `pages.json`（无路由） |
| uni-router + generateUni | 页面与路由全自动生成（现代化范式） |

## 依赖映射

- **uni-router 系**：`@meng-xi/uni-router`
- **generateRouter / generatePages / generateUni**：`@meng-xi/vite-plugin`（devDependencies）

## 生成行为

- **uni-router 系**：向主入口注入 `createRouter({ routes, plugins, interceptUniApi })` 与 `app.use(router)`
- **纯 uni-router（无生成插件）**：额外生成手写 `src/router.config` 示例
- **generatePages / generateUni**：向 `vite.config.js` 注入对应生成插件，并生成 `pages-sub` 子包页面示例

## 说明

- uni-router 依赖 `@meng-xi/vite-plugin` 从 `pages.json` 自动生成路由配置和类型声明（generateRouter / generateUni）
- `router`（纯手动）与 `router-generate` / `uni` 的区别在于是否依赖 vite 生成插件自动产出 `router.config`