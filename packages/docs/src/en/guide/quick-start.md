# Quick Start

> Prerequisite: get the CLI ready via [Installation](./installation), or use `npx @meng-xi/create-uni-app` directly.

## Create a Project

```bash
create-uni-app          # enter interactive prompts
create-uni-app my-app   # specify a name directly (still editable later)
```

Then answer the prompts step by step; at the end you may auto-install dependencies. About 9 steps in total:

| Step | Description |
| --- | --- |
| Project name | Required, sanitized to lowercase letters / digits / hyphens |
| Script language | TypeScript / JavaScript |
| CSS preprocessor | Sass/Scss · Less · Stylus · Plain CSS |
| State management | Pinia / Pinia+persist / Vuex / Vuex+persist / None |
| Router scheme | None / uni-router / +generateRouter / generatePages only / +generateUni |
| Target platforms | Multi-select with "All / Mini programs / Quick Apps" shortcuts; selecting a group auto-disables the covered options |
| Optional features | Built-in theme (pick a palette after enabling) · Request wrapper + auth · uni-ui (requires Sass/Scss) |
| Package manager | npm / yarn / pnpm |
| Install deps | Right away or later manually |

> Generation only produces what you select: unselected languages, features, and platforms are never generated, and there are no extra dependencies.

## Start Development

```bash
cd my-app
npm install              # if not auto-installed
npm run dev:h5           # start H5
npm run dev:mp-weixin    # start WeChat mini program
npm run type-check       # TS projects only
```

| Command | Purpose |
| --- | --- |
| `npm run dev:h5` | Preview in the browser |
| `npm run dev:mp-weixin` | Compile the WeChat mini program; open `dist/dev/mp-weixin` in DevTools |
| `npm run type-check` | Type-check for TS projects |

## Platform Commands

See [Platforms](../features/platforms) for all supported platforms and scripts.

## Next Steps

- [CLI Reference](./cli) — learn all commands and options
- [Create a Page](./create-page) — add a page in your project