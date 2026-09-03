# Template Layout

A template is a directory following a conventional structure. `create-uni-app` parses templates per this convention; a template source that doesn't follow it errors on parse.

## Directory Structure

```
<template root>/
├── template.json        # optional: preset interactive defaults
├── base/                # base skeleton (static files + ${} placeholders)
├── entry/               # main entry
│   ├── ts/  ts-root/    # TS projects (main.ts into src; tsconfig/env.d.ts into root)
│   └── js/  js-root/    # JS projects (main.js into src; jsconfig.json into root)
└── features/            # feature fragments (ts/js variants: pinia|vuex · request · uni-ui · themes · router · subpackage)
```

## Directory Responsibilities

| Directory | Responsibility |
| --- | --- |
| `template.json` | Preset interactive defaults (optional) |
| `base/` | Base skeleton: static files + `${token}` placeholders |
| `entry/` | Main entry, two variants for TS / JS |
| `features/` | Feature fragments, organized by ts/js variant |

## base/ Placeholders

`base/` files use `${token}` placeholders, replaced at render time:

| Placeholder | Description |
| --- | --- |
| `${safeName}` | Sanitized project name |
| `${ext}` | `ts` / `js` |
| `${cssExt}` | Style suffix: `scss` / `less` / `stylus` / `css` |
| `${uniVersion}` | uni-app runtime version |
| `${themeImport}` | Statement importing the global theme in the entry (plain CSS themes) |
| `${cssPreprocessorConfig}` | vite.config css injection (less/stylus global theme) |
| `${stateImport}` | State main import (Pinia imports `createPiniaStore` from `./stores`) |
| `${stateSetup}` | State init statement (e.g. `const pinia = createPiniaStore()`) |
| `${stateUse}` | `app.use(pinia)` / `app.use(store)` injection |
| `${statePersistStoreImport}` | Pinia `stores/index` persistence plugin import |
| `${statePersistStoreUse}` | Pinia `stores/index` plugin registration statement |
| `${routerImport}` | Entry imports the router instance: `import router from './router'` |
| `${routerSetup}` | Router creation statement (encapsulated in `src/router/index` + `guards`, not needed in the entry) |
| `${routerUse}` | `app.use(router)` injection |
| `${vitePluginImports}` | Generative plugin imports at the top of vite.config |
| `${vitePluginList}` | vite.config plugins array additions (generative plugin calls) |
| `${easycomBlock}` | uni-ui easycom config block |
| `${paletteLines}` | Theme palette variables |

> Placeholders are injected by `buildContext`; the `TemplateContext` type is authoritative for the full set.

## template.json Presets

A template can preset interactive defaults via its root `template.json` (editable in prompts):

```json
{
  "useTypeScript": false,
  "css": "scss",
  "theme": "blue",
  "state": "pinia-persist",
  "router": "router-generate",
  "platform": ["mp-weixin", "h5"],
  "features": ["request", "uni-ui"],
  "packageManager": "pnpm",
  "installDeps": false
}
```

Supported fields (all optional):

| Field | Values |
| --- | --- |
| `useTypeScript` | `true` / `false` |
| `css` | `scss` / `less` / `stylus` / `none` |
| `theme` | Default palette for the built-in theme: `default` / `blue` / `green` / `orange` (used as the palette initial when the "Built-in theme" feature is checked) |
| `state` | `pinia` / `pinia-persist` / `vuex` / `vuex-persist` / `none` |
| `router` | `none` / `router` / `router-generate` / `pages` / `uni` |
| `platform` | platform id array, e.g. `["mp-weixin", "h5"]` |
| `features` | `theme` / `request` / `uni-ui` |
| `packageManager` | `npm` / `yarn` / `pnpm` |
| `installDeps` | `true` / `false` |

## Version Red Lines

- uni-app tooling tightly couples with vite5 / pinia2 / typescript5 / vue-tsc2 — don't bump majors casually
- Align the uni-app version with `npx @dcloudio/uvm@latest`

## Team Sharing

Point `--template-source` at your template repo and persist with `config set` so the whole team shares one template set.

## Next Steps

- [Template Groups & --template](./template-group) — organizing and selecting multiple templates