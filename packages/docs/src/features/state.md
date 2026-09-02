# 状态管理

Pinia / Vuex 二选一，均支持状态持久化。选定后自动注入主入口并生成 store 示例，无需手写胶水代码。

## 如何选择

| 场景               | 推荐              |
| ---------------- | --------------- |
| 新项目、Vue3 组合式 API | Pinia           |
| 需要状态自动持久化        | Pinia + 持久化（推荐） |
| 已有 Vuex 存量代码     | Vuex            |
| 简单页面、几乎无共享状态     | 不使用             |

## 方案列表

| 方案              | 说明                                              |
| --------------- | ----------------------------------------------- |
| Pinia + 持久化（推荐） | 组合式 API + `pinia-plugin-persistedstate` 状态自动持久化 |
| Pinia           | Vue3 官方推荐，组合式 API 友好                            |
| Vuex + 持久化      | `vuex@4` + `vuex-persistedstate` 状态自动持久化        |
| Vuex            | Vue2 时代主流，`vuex@4` 兼容 Vue3                      |
| 不使用             | 不引入状态管理                                         |

## 依赖注入

| 方案          | dependencies                            |
| ----------- | --------------------------------------- |
| Pinia       | `pinia`                                 |
| Pinia + 持久化 | `pinia` + `pinia-plugin-persistedstate` |
| Vuex        | `vuex@4`                                |
| Vuex + 持久化  | `vuex@4` + `vuex-persistedstate`        |
| 不使用         | 无                                       |

## 主入口注入

| 方案    | 注入方式                                                                                                                           |
| ----- | ------------------------------------------------------------------------------------------------------------------------------ |
| Pinia | `import { createPiniaStore } from './stores'`，`const pinia = createPiniaStore()`，持久化插件在 `stores/index.ts` 内注册，`app.use(pinia)` |
| Vuex  | `import store from './stores'`，持久化在 `stores/index.ts` 内配置 `plugins: [createPersistedState()]`                                  |

> vuex 与 pinia 的持久化均在 `stores/index` 内完成：pinia 通过 `createPiniaStore` 注册插件，vuex 通过 `plugins` 配置，二者注入位置不同。

同时生成对应的 `stores/counter` 示例文件，可直接在此基础上扩展。

## 下一步

- [路由方案](./router) — 路由与页面生成选型

