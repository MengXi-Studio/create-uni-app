import { createSSRApp } from 'vue'
import App from './App.vue'
${themeImport}
${stateImport}${routerImport}
${stateSetup}${routerSetup}export function createApp() {
  const app = createSSRApp(App)${stateUse}${routerUse}
  return { app }
}