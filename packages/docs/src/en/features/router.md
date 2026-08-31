# Router Schemes

Router / page generation schemes are mutually exclusive, covering the full path from native navigation to a modern fully-automatic setup.

## Schemes

| Scheme | Description |
| --- | --- |
| None | Keep uni-app native page navigation |
| uni-router (manual) | Adds `@meng-xi/uni-router` only; route config maintained by hand |
| uni-router + generateRouter (recommended) | Manual `pages.json` + auto-generated route config and types |
| generatePages only | Scans pages + macro/route-config to auto-generate `pages.json` (no router) |
| uni-router + generateUni | Fully automatic pages and routes (modern paradigm) |

## Dependency Mapping

- **uni-router family**: `@meng-xi/uni-router`
- **generateRouter / generatePages / generateUni**: `@meng-xi/vite-plugin` (devDependencies)

## Generation Behavior

- **uni-router family**: injects `createRouter({ routes, plugins, interceptUniApi })` and `app.use(router)` into the main entry
- **Pure uni-router (no plugin)**: also generates a hand-written `src/router.config` example
- **generatePages / generateUni**: injects the matching plugin into `vite.config.js` and generates a `pages-sub` subpackage example

## Notes

- uni-router relies on `@meng-xi/vite-plugin` to auto-generate route config and type declarations from `pages.json` (generateRouter / generateUni)
- `router` (pure manual) differs from `router-generate` / `uni` in whether the vite plugin auto-produces `router.config`