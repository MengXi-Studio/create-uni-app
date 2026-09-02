/**
 * Vuex 计数器示例 Store（vuex@4，兼容 Vue3）
 *
 * 选择「Vuex + 持久化」时自动注入 vuex-persistedstate 插件，
 * state 将同步到本地存储（默认 localStorage）。
 */
import { createStore } from 'vuex'${statePersistImport}

export default createStore({
  state() {
    return {
      count: 0,
    }
  },
  getters: {
    double(state) {
      return state.count * 2
    },
  },
  mutations: {
    increment(state) {
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