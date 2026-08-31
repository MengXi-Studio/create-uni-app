# Introduction

`@meng-xi/create-uni-app` is an **interactive scaffolding CLI** for [uni-app](https://uniapp.dcloud.net.cn/) powered by Vue3 + Vite. You answer a command-line dialogue, and it generates a uni-app project containing only the capabilities you select — nothing more, nothing less.

## What It Is

The traditional approach is to `git clone` an official template and trim it by hand, often leaving a pile of unused files and dependencies. `create-uni-app` replaces that with **dialogue-driven generation**: you answer a dozen or so questions (language, styling, state, router, platforms…), and it assembles a matching project skeleton in an instant.

## Why You Need It

Common pain points of setting up a uni-app project by hand:

| Pain point | By hand | create-uni-app |
|---|---|---|
| Getting started | Import the official template and trim item by item | Interactive prompts, all choices made at once |
| Multi-platform scripts | Write `dev:*` / `build:*` one by one | Auto-generated and slimmed per selected platforms |
| Tech choices | Install, remove, then hunt for the right combo | Sass/Less/Stylus, TS/JS decided once |
| State / router | Hand-write main-entry store / router injection | Pinia/Vuex, uni-router auto-injected |
| Team reuse | Every new member builds their own setup | One unified template source |

## How It Works

Internally, a single command follows this flow:

```
Interactive prompts ──► resolve options ──► compose template (base + entry + features) ──► merge deps ──► output project ──► optional auto-install
```

During generation, only the **template fragments** matching your chosen language / features / platforms are copied, and only the matching **dependencies** are merged. Anything unselected is simply not brought in.

## Core Concepts

| Concept | Description |
|---|---|
| Template | A template = `base/` (skeleton) + `entry/` (entries) + `features/` (feature fragments) |
| Template source | Built-in / local directory / git repo, can form "template groups" for teams |
| Feature fragments | State, router, request, uni-ui, themes, subpackage, etc., selectable on demand |
| Platform groups | Quick-select "All / Mini programs / Quick Apps" |

## Design Philosophy

1. **Generate only what you select** — unselected features, files, and deps are never brought in
2. **Inject on demand** — Sass only when Sass is chosen; `tsconfig.json` + type-check only for TS
3. **Mutually exclusive choices** — TS/JS, Pinia/Vuex, etc. pick one, leaving nothing extra
4. **Reusable templates** — teams share one template set via `--template-source` + `config set`

## Feature Highlights

- 🧩 **Interactive creation** — project name → language → preprocessor → theme → state → router → platforms → features → package manager
- 🌐 **On-demand platforms** — covers all uni-app platforms with group shortcuts
- 🃏 **TS / JS** — mutually exclusive, each generating its own project config files
- 🎨 **Built-in themes** — Default Purple / Blue / Green / Orange, working with Sass/Less/Stylus/plain CSS
- 🗃️ **State management** — Pinia / Vuex (both with persistence) auto-injected
- 🧭 **Router schemes** — uni-router / generateRouter / generatePages / generateUni, mutually exclusive
- 📦 **Optional features** — request wrapper + auth, uni-ui (easycom)
- 🛠️ **Companion commands** — `create` (add page), `info` (diagnose), `config` (persist template source)

## What It Is Not

| Might be mistaken for | Actually |
|---|---|
| A runtime library | A scaffold only; not involved after project delivery |
| Needs a GUI | Pure command-line interaction |
| Can overwrite an existing dir | Refuses when the target dir is non-empty |
| Auto-upgrades the uni version | Version is built-in; align via `npx @dcloudio/uvm@latest` |

## Next Steps

- [Installation](./installation) — install the CLI locally
- [Quick Start](./quick-start) — create your first project
- [CLI Reference](./cli) — learn all commands
- [Custom Templates](../template/custom-template) — plug in a team template