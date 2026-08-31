# State Management

Pinia or Vuex, each with optional state persistence. The main entry is injected and a store example is generated.

## Schemes

| Scheme | Description |
| --- | --- |
| Pinia + persist (recommended) | Composition API + `pinia-plugin-persistedstate` auto persistence |
| Pinia | Vue3 official recommendation, composition-API friendly |
| Vuex + persist | `vuex@4` + `vuex-persistedstate` auto persistence |
| Vuex | Vue2-era mainstream, `vuex@4` works with Vue3 |
| None | No state management |

## Dependency Injection

- **Pinia**: `pinia`
- **Pinia + persist**: `pinia` + `pinia-plugin-persistedstate`
- **Vuex**: `vuex@4`
- **Vuex + persist**: `vuex@4` + `vuex-persistedstate`

Choosing `none` injects no state-management dependency.

## Main Entry Injection

- **Pinia**: `createPinia()`, `pinia.use(piniaPluginPersistedstate)` when persisted, `app.use(pinia)`
- **Vuex**: `import store from './store'`; persistence is configured inside `store/index.ts` via `plugins: [createPersistedState()]`

A `counter` store example is generated for easy extension.

> Vuex persistence is configured inside the store; Pinia registers its persistence plugin on the `createPinia` instance.