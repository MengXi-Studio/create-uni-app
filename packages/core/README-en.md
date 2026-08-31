[中文](./README.md) | **English**

<div align="center">
	<a href="https://github.com/MengXi-Studio/create-uni-app">
		<img alt="MengXi Studio Logo" width="215" src="https://github.com/MengXi-Studio/create-uni-app/blob/master/packages/docs/src/public/logo.png">
	</a>
	<a href="https://github.com/MengXi-Studio/create-uni-app">
		<img alt="WeChat Official Account QR Code" width="215" src="https://github.com/MengXi-Studio/create-uni-app/blob/master/packages/docs/src/public/QR_code.jpg">
	</a>
	<br><br>
	<h1>@meng-xi/create-uni-app</h1>
	<p>An interactive scaffolding CLI for uni-app that generates only what you pick</p>
	<p>
		<a href="https://github.com/MengXi-Studio/create-uni-app/blob/master/LICENSE"><img alt="license" src="https://img.shields.io/github/license/MengXi-Studio/create-uni-app.svg"></a>
		<a href="https://www.npmjs.com/package/@meng-xi/create-uni-app"><img alt="npm version" src="https://img.shields.io/npm/v/@meng-xi/create-uni-app?color=blue"></a>
		<a href="https://www.npmjs.com/package/@meng-xi/create-uni-app"><img alt="npm downloads" src="https://img.shields.io/npm/dt/@meng-xi/create-uni-app?color=green"></a>
	</p>
</div>

An **interactive scaffolding CLI** for [uni-app](https://uniapp.dcloud.net.cn/) powered by Vue3 + Vite. It walks you through a command-line dialogue to generate a uni-app project with only the capabilities you select —
no extra files or dependencies.

## Features

- **Interactive creation**: project name → script language → CSS preprocessor → built-in theme → state management → router scheme → target platforms → optional features → package manager
- **On-demand multi-platform**: supports all uni-app platforms with quick group options ("All platforms" / "Mini programs" / "Quick Apps")
- **TS / JS optional**: `tsconfig.json` for TS, `jsconfig.json` for JS — mutually exclusive
- **Built-in themes**: Default Purple / Blue / Green / Orange, working with Sass / Less / Stylus / plain CSS
- **State management**: Pinia or Vuex, each with optional state persistence
- **Router / page schemes**: uni-router, generateRouter, generatePages, generateUni (mutually exclusive)
- **Optional features**: request wrapper + auth, uni-ui component library (easycom on demand)
- **Companion commands**: `create` (add page), `info` (diagnose), `config` (persist template source)

## Quick Start

```bash
# Install globally and use directly
npm i -g @meng-xi/create-uni-app
create-uni-app my-app

# Or run without installing
npx @meng-xi/create-uni-app my-app
```

Answer the interactive prompts and optionally auto-install dependencies at the end:

```bash
cd my-app
npm run dev:h5          # start H5
npm run dev:mp-weixin   # start WeChat mini program
```

## Development & Release

```bash
pnpm install       # install dependencies
pnpm run build     # compile TS to dist
pnpm run dev       # compile and print help
pnpm run start     # run CLI locally
```

`prepublishOnly` runs the build before publishing; `files` ships `dist` and `templates`.

## License

[MIT](./LICENSE)
