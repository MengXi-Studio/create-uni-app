/**
 * Pinia 计数器示例 Store（组合式写法）
 *
 * 选择「Pinia + 持久化」时自动注入 persist: true（pinia-plugin-persistedstate），
 * 状态将同步到本地存储（默认 localStorage，key 为 store id：counter）。
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const count = ref(0)
    const double = computed(() => count.value * 2)

    function increment() {
      count.value++
    }

    return { count, double, increment }
  }${statePersistOption},
)