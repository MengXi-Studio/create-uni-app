# Changelog

This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/).

## [1.2.0] - 2026-09-03

> Interaction polish: optional built-in theme, mutually exclusive platform groups, and uni-ui tied to the preprocessor.

### ✨ New Features

#### Interaction

- Built-in theme is now an **optional feature** rather than a required step: it lives in the "optional features" multi-select, and you pick a palette (Default Purple / Blue / Green / Orange) after enabling it
- **Mutually exclusive platform groups**: selecting "All platforms / Mini programs (all) / Quick Apps (all)" auto-disables the concrete platforms they cover
- **uni-ui tied to the preprocessor**: the option is auto-disabled with a hint when Sass/Scss isn't selected

### 🐛 Fixes

- `uni.scss` is no longer generated for non-scss schemes (Less / Stylus / plain CSS)

---

## [1.1.0] - 2026-09-01

> Structured generation: state management, the router instance and its guards are split into separate files so the entry stays clean; TS projects use `vite.config.ts`.

### ✨ New Features

#### State Management

- Pinia structured encapsulation: new `stores/index` creates the instance via `createPiniaStore()` and registers the persistence plugin; the entry keeps only `app.use(pinia)`
- Pinia / Vuex now share a unified `stores/` directory (Vuex previously used `store`), with consistent entry references

#### Router / Page Schemes

- Generates a `src/router` directory: `index` creates the router instance and `guards` ships global `beforeEach` / `afterEach` guard examples
- The entry only does `import router from './router'` + `app.use(router)` instead of inlining the creation logic
- Pure uni-router still generates a handwritten `src/router.config`

#### Language Choice

- TS projects generate `vite.config.ts` (JS keeps `vite.config.js`), so build config adapts to the script language

### 🔧 Improvements

- `dependencies` and `devDependencies` in `package.json` are sorted alphabetically for cleaner output
- Updated the default uni-app runtime version to the official Vue3 channel (sync to latest via `npx @dcloudio/uvm@latest`)

### 🐛 Fixes

- Dependency auto-install now surfaces the real exit code / spawn error plus a manual-retry hint for easier diagnosis
- Fixed a stray blank line in `stores/index` when Vuex persistence is disabled

---

## [1.0.0] - 2026-09-01

> First stable release. An interactive scaffolding CLI built on uni-app + Vue3 + Vite that generates a uni-app project on demand through a command-line dialogue.

### ✨ New Features

#### Interactive Creation

- Full interactive prompt flow: project name → script language → CSS preprocessor → built-in theme → state management → router scheme → target platforms → optional features → package manager → auto-install deps
- Project name auto-sanitized to a valid npm-safe name (lowercase letters / digits / hyphens)
- Pass a project name directly on the command line, still editable in the prompts

#### On-Demand Multi-Platform

- Covers all uni-app compile platforms (H5, App, 9 mini programs, 3 quick apps)
- Group shortcuts: "All platforms / Mini programs (all) / Quick Apps (all)"
- Auto-generates `dev:*` / `build:*` scripts per selected platform; full mode additionally adds custom and SSR scripts
- `manifest.json` slimmed per selection — only keeps the chosen platform blocks

#### Language Choice

- TypeScript / JavaScript, mutually exclusive
- TS generates `tsconfig.json` with type-check (`vue-tsc`); JS generates `jsconfig.json`

#### Theming & Styling

- Four built-in theme palettes: Default Purple / Blue / Green / Orange
- Compatible with Sass / Less / Stylus / plain CSS (CSS variables)
- Injects the matching global style dependency and mixing method per preprocessor

#### State Management

- Pinia or Vuex, each with optional state persistence
- Auto-injects the store into the main entry and generates a counter example

#### Router / Page Schemes

- uni-router, generateRouter, generatePages, generateUni — mutually exclusive
- Auto-injects the router config into the main entry, the generation plugin into `vite.config.js`, and the matching deps

#### Optional Integrations

- Request wrapper + login auth (unified interception, token, guard, example API)
- uni-ui component library (easycom on demand) with an example page

#### Companion Commands

- `create` — add a page, auto-detecting the project shape and registering routes / subpackages
- `info` — diagnose environment and project info
- `config` — persist / view / clear the template source

#### Custom Templates

- Custom template sources: local directory or git repo (`github:` / `gitlab:` / git url)
- Template groups with `--template` selection
- `template.json` presets for interactive defaults
- `${token}` placeholder rendering engine

### 🛠 Project Engineering

- pnpm workspace monorepo: `packages/core` (CLI) + `packages/docs` (VitePress docs site)
- Bilingual docs (`/` Chinese, `/en/` English)
- ESLint (flat config + Prettier) code standards
- TypeScript type-checking

---

See [Releases](https://github.com/MengXi-Studio/create-uni-app/releases) for past versions.
