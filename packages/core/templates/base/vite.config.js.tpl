/**
 * Vite 配置文件（uni-app 通过 vite-plugin-uni 构建多端）
 */
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
${vitePluginImports}
export default defineConfig({
  plugins: [uni()${vitePluginList}],
${cssPreprocessorConfig}})