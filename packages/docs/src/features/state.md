# 状态管理

Pinia / Vuex 二选一，均支持状态持久化，自动注入主入口并生成 store 示例。

## 方案列表

| 方案 | 说明 |
| --- | --- |
| Pinia + 持久化（推荐） | 组合式 API + `pinia-plugin-persistedstate` 状态自动持久化 |
| Pinia | Vue3 官方推荐，组合式 API 友好 |
| Vuex + 持久化 | `vuex@4` + `vuex-persistedstate` 状态自动持久化 |
| Vuex | Vue2 时代主流，`vuex@4` 兼容 Vue3 |
| 不使用 | 不引入状态管理 |

## 依赖注入

- **Pinia**：`pinia`
- **Pinia + 持久化**：`pinia` + `pinia-plugin-persistedstate`
- **Vuex**：`vuex@4`
- **Vuex + 持久化**：`vuex@4` + `vuex-persistedstate`

选择 `none` 时不引入任何状态管理依赖，保持最小化。

## 主入口注入

- **Pinia**：`createPinia()` 创建实例，持久化时 `pinia.use(piniaPluginPersistedstate)`，`app.use(pinia)`
- **Vuex**：`import store from './store'`，持久化在 `store/index.ts` 内配置 `plugins: [createPersistedState()]`

同时生成对应的 store/counter 示例文件，方便直接在此基础上扩展。

> vuex 的持久化在 store 内配置；pinia 的持久化通过 createPinia 实例注册插件，二者注入位置不同。