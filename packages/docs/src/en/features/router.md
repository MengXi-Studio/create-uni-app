# Router Schemes

Router / page generation schemes are mutually exclusive, covering the full path from "native navigation" to a modern fully-automatic setup. Once chosen, the main entry, `vite.config`, and matching dependencies are auto-injected.

## Evolution Overview

| Scheme                      | pages.json     | Route config                 | Fits                                  |
| --------------------------- | -------------- | ---------------------------- | ------------------------------------- |
| None                        | manual         | none                         | Just native navigation                |
| uni-router (manual)         | manual         | handwritten `router.config`  | Want guards, but prefer handwriting   |
| uni-router + generateRouter | manual         | auto-generated (recommended) | Balance of tradition + type safety    |
| generatePages only          | auto-generated | none                         | Auto page generation without a router |
| uni-router + generateUni    | fully auto     | fully auto                   | Modern fully-automatic                |

## Schemes

| Scheme                                    | Description                                                                |
| ----------------------------------------- | -------------------------------------------------------------------------- |
| None                                      | Keep uni-app native page navigation                                        |
| uni-router (manual)                       | Adds `@meng-xi/uni-router` only; route config maintained by hand           |
| uni-router + generateRouter (recommended) | Manual `pages.json` + auto-generated route config and types                |
| generatePages only                        | Scans pages + macro/route-config to auto-generate `pages.json` (no router) |
| uni-router + generateUni                  | Fully automatic pages and routes (modern paradigm)                         |

## Dependency Mapping

| Scenario                                     | Dependency                               |
| -------------------------------------------- | ---------------------------------------- |
| uni-router family                            | `@meng-xi/uni-router` (dependencies)     |
| generateRouter / generatePages / generateUni | `@meng-xi/vite-plugin` (devDependencies) |

## Generation Behavior

| Scheme                      | Behavior                                                                                                                                                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| uni-router family | Generates a `src/router` directory (`index` creates `createRouter({ routes, plugins, interceptUniApi })`, `guards` holds the global guard `beforeEach` / `afterEach` examples); the main entry only injects `import router from './router'` and `app.use(router)` |
| Pure uni-router (no plugin) | Also generates a handwritten `src/router.config` example                                                                                                                                                                              |
| generatePages / generateUni | Injects the matching plugin into `vite.config` and generates a `pages-sub` subpackage example |                                                                                                                                     |

## Notes

- uni-router relies on `@meng-xi/vite-plugin` to auto-generate route config and type declarations from `pages.json` (generateRouter / generateUni)

- `router` (pure manual) differs from `router-generate` / `uni` in whether the vite plugin auto-produces `router.config`

## Next Steps

- [Integrations](./features) — request wrapper and uni-ui

