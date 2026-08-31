/**
 * 全局常量统一导出入口
 */
export { UNI_VERSION } from './versions';
export {
  ALL_TARGET_PLATFORMS,
  PLATFORM_GROUPS,
  PLATFORM_SCRIPTS,
  PLATFORM_DEPS,
  ALL_SCRIPTS,
} from './platforms';
export { THEME_IDS, THEME_PALETTES, renderThemeVars } from './themes';
export { FEATURE_DEPS, FEATURE_DEV_DEPS, STATE_DEPS, ROUTER_PLUGINS, getRouterDeps } from './features';