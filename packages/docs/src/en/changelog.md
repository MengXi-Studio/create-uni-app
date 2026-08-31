# Changelog

This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/).

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
