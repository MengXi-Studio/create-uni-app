# State Management

Pinia or Vuex, each with optional state persistence. Once chosen, the main entry is auto-injected and a store example is generated — no glue code to write.

## How to Choose

| Scenario | Recommendation |
| --- | --- |
| New project, Vue3 composition API | Pinia |
| Needs auto state persistence | Pinia + persistence (recommended) |
| Existing Vuex legacy code | Vuex |
| Simple pages, almost no shared state | None |

## Schemes

| Scheme | Description |
| --- | --- |
| Pinia + persistence (recommended) | Composition API + `pinia-plugin-persistedstate` auto persistence |
| Pinia | Vue3 official recommendation, composition-API friendly |
| Vuex + persistence | `vuex@4` + `vuex-persistedstate` auto persistence |
| Vuex | Vue2-era mainstream, `vuex@4` works with Vue3 |
| None | No state management |

## Dependency Injection

| Scheme | dependencies |
| --- | --- |
| Pinia | `pinia` |
| Pinia + persistence | `pinia` + `pinia-plugin-persistedstate` |
| Vuex | `vuex@4` |
| Vuex + persistence | `vuex@4` + `vuex-persistedstate` |
| None | none |

## Main Entry Injection

| Scheme | Injection |
| --- | --- |
| Pinia | `import { createPiniaStore } from './stores'`, `const pinia = createPiniaStore()`, persistence plugin registered inside `stores/index.ts`, `app.use(pinia)` |
| Vuex | `import store from './stores'`; persistence configured inside `stores/index.ts` via `plugins: [createPersistedState()]` |

> Both Vuex and Pinia configure persistence inside `stores/index`: Pinia registers its plugin via `createPiniaStore`, Vuex via the `plugins` option — different injection points but the same directory.

A `stores/counter` example is generated for easy extension.

## Next Steps

- [Router Schemes](./router) — router and page generation choices