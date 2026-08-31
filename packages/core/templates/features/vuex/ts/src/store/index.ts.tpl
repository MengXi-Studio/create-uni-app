/**
 * Vuex 计数器示例 Store（vuex@4，兼容 Vue3，TypeScript）
 *
 * 选择「Vuex + 持久化」时自动注入 vuex-persistedstate 插件，
 * state 将同步到本地存储（默认 localStorage）。
 */
import { createStore } from 'vuex'
${statePersistImport}

interface CounterState {
  count: number
}

export default createStore<CounterState>({
  state(): CounterState {
    return {
      count: 0,
    }
  },
  getters: {
    double(state: CounterState): number {
      return state.count * 2
    },
  },
  mutations: {
    increment(state: CounterState) {
      state.count++
    },
  },
  actions: {
    asyncIncrement({ commit }) {
      setTimeout(() => commit('increment'), 300)
    },
  },
  ${statePersistPlugins}
})