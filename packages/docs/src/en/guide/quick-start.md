# Quick Start

## Installation

```bash
# Install globally and use directly
npm i -g @meng-xi/create-uni-app
create-uni-app my-app

# Or run without installing
npx @meng-xi/create-uni-app my-app
```

> **Package name vs command name**: the npm package is `@meng-xi/create-uni-app` (scoped), while the `bin` command is the short `create-uni-app`. After a global install you use `create-uni-app` directly. `yarn add -g` / `pnpm add -g` also work.

## Create a Project

```bash
create-uni-app          # enter interactive prompts
create-uni-app my-app   # specify a name directly (still editable later)
```

Answer the prompts; at the end you may auto-install dependencies.

| Step | Description |
| --- | --- |
| Project name | Required, sanitized to lowercase letters / digits / hyphens |
| Script language | TypeScript / JavaScript |
| CSS preprocessor | Sass/Scss · Less · Stylus · Plain CSS |
| Built-in theme | A globally mixed-in theme (CSS variables for plain CSS) |
| State management | Pinia / Pinia+persist / Vuex / Vuex+persist / None |
| Router scheme | None / uni-router / +generateRouter / generatePages only / +generateUni |
| Target platforms | Multi-select with "All / Mini programs / Quick Apps" shortcuts |
| Optional features | Request wrapper + auth / uni-ui |
| Package manager | npm / yarn / pnpm |
| Install deps | Right away or later manually |

## Start Development

```bash
cd my-app
npm install
npm run dev:h5            # start H5
npm run dev:mp-weixin     # start WeChat mini program
npm run type-check        # TS projects only
```

See [Platforms](../features/platforms) for all supported platforms and scripts.