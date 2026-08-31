# Quick Start

> Prerequisite: get the CLI ready via [Installation](./installation), or use `npx @meng-xi/create-uni-app` directly.

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