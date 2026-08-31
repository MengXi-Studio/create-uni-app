# Introduction

`@meng-xi/create-uni-app` is an **interactive scaffolding CLI** for [uni-app](https://uniapp.dcloud.net.cn/) powered by Vue3 + Vite. It guides you through a command-line dialogue to generate a uni-app project with only the capabilities you select, without bundling unnecessary files or dependencies.

## Feature Overview

- **Interactive creation**: project name → script language (TS / JS) → CSS preprocessor → built-in theme → state management → router scheme → target platforms → optional features → package manager
- **On-demand multi-platform**: supports all 15 uni-app platforms with quick group options ("All" / "Mini programs" / "Quick Apps")
- **TS / JS optional**: `tsconfig.json` for TS, `jsconfig.json` for JS — mutually exclusive
- **Built-in themes**: Default Purple / Blue / Green / Orange, working with Sass / Less / Stylus / plain CSS
- **State management**: Pinia or Vuex, each with optional state persistence
- **Router / page schemes**: uni-router, generateRouter, generatePages, generateUni — mutually exclusive
- **Optional features**: request wrapper + auth, uni-ui component library (easycom on demand)
- **Companion commands**: `create` (add page), `info` (diagnose), `config` (persist template source)

## Tech Stack

Node.js ≥ 16 · TypeScript · Commander · prompts · Vue3 · Vite · uni-app

## Repo Layout

This is a pnpm workspace with two sub-projects:

| Directory | npm package | Description |
| --- | --- | --- |
| `packages/core` | `@meng-xi/create-uni-app` | The CLI itself (source + built-in templates) |
| `packages/docs` | `@meng-xi/create-uni-app-docs` | This documentation site (VitePress) |

## Doc Navigation

- [Quick Start](./quick-start) — install and create your first project
- [Features](../features/platforms) — detailed capability guides
- [Custom Templates](../template/custom-template) — how to plug in a team template