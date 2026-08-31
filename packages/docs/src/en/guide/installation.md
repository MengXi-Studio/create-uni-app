# Installation

## Requirements

| Dependency | Requirement |
| --- | --- |
| Node.js | ≥ 16 |

## Installation Methods

Choose any one of the following — all equivalent:

```bash
# npm
npm i -g @meng-xi/create-uni-app

# yarn
yarn add -g @meng-xi/create-uni-app

# pnpm
pnpm add -g @meng-xi/create-uni-app
```

You can also run it temporarily without installing:

```bash
npx @meng-xi/create-uni-app my-app
```

> **Package name vs command name**: the npm package is `@meng-xi/create-uni-app` (scoped, under the `meng-xi` org), while the `bin` command is the short `create-uni-app`. So after a global install, run `create-uni-app` directly — no scope prefix needed.

## Verify

```bash
create-uni-app --version   # should print the version
create-uni-app --help      # should print command help
```

## Next Steps

- [Quick Start](./quick-start) — create your first project