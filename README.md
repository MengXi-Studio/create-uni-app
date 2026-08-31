**中文** | [English](./README-en.md)

<div align="center">
    <a href="https://github.com/MengXi-Studio/create-uni-app">
        <img alt="梦曦工作室 Logo" width="215" src="https://raw.githubusercontent.com/MengXi-Studio/create-uni-app/master/packages/docs/src/public/logo.png">
    </a>
    <a href="https://github.com/MengXi-Studio/create-uni-app">
        <img alt="微信公众号 二维码" width="215" src="https://raw.githubusercontent.com/MengXi-Studio/create-uni-app/master/packages/docs/src/public/QR_code.jpg">
    </a>
    <br><br>
    <h1>@meng-xi/create-uni-app</h1>
    <p>基于 uni-app 的交互式脚手架 CLI，按需生成 uni-app 基础项目与可选功能</p>
    <p>
        <a href="https://github.com/MengXi-Studio/create-uni-app/blob/master/LICENSE"><img alt="license" src="https://img.shields.io/github/license/MengXi-Studio/create-uni-app.svg"></a>
        <a href="https://www.npmjs.com/package/@meng-xi/create-uni-app"><img alt="npm version" src="https://img.shields.io/npm/v/@meng-xi/create-uni-app?color=blue"></a>
        <a href="https://www.npmjs.com/package/@meng-xi/create-uni-app"><img alt="npm downloads" src="https://img.shields.io/npm/dt/@meng-xi/create-uni-app?color=green"></a>
    </p>
</div>

基于 [uni-app](https://uniapp.dcloud.net.cn/) + Vue3 + Vite 的**交互式脚手架 CLI**。通过命令行对话按需生成 uni-app 基础项目与可选能力，只产出你选中的内容，不携带多余文件与依赖。

## 特性

- **交互式创建**：项目名 → 脚本语言 → CSS 预处理器 → 内置主题 → 状态管理 → 路由方案 → 目标平台 → 可选功能 → 包管理器

- **多平台按需**：支持全部 uni-app 平台，提供「全部端 / 小程序(全部) / 快应用(全部)」分组快捷勾选

- **TS / JS 可选**：TS 生成 `tsconfig.json`，JS 生成 `jsconfig.json`，两者互斥

- **多套内置主题**：默认紫 / 清新蓝 / 自然绿 / 温暖橙，兼容 Sass / Less / Stylus / 原生 CSS

- **状态管理**：Pinia / Vuex 二选一，均可选状态持久化

- **路由 / 页面方案**：uni-router、generateRouter、generatePages、generateUni 组合互斥可选

- **可选功能**：请求封装 + 登录鉴权、uni-ui 组件库（easycom 按需引入）

- **配套命令**：`create` 建页、`info` 诊断、`config` 模板源持久化

## 快速开始

```bash
# 全局安装后直接使用
npm i -g @meng-xi/create-uni-app
create-uni-app my-app

# 或不经安装，直接执行
npx @meng-xi/create-uni-app my-app
```

进入交互问答按提示选择，结束时可选自动安装依赖：

```bash
cd my-app
npm run dev:h5          # 启动 H5
npm run dev:mp-weixin   # 启动微信小程序
```

## 开发与发布

```bash
pnpm install       # 安装依赖
pnpm run build     # 编译 TS 到 dist
pnpm run dev       # 编译后打印帮助
pnpm run start     # 本地运行 CLI
```

发布前 `prepublishOnly` 会自动构建；`files` 已锁定 `dist` 与 `templates`。

## 文档

📖 **[https://mengxi-studio.github.io/create-uni-app/](https://mengxi-studio.github.io/create-uni-app/)**

## 更新日志

📝 **[https://mengxi-studio.github.io/create-uni-app/changelog.html/](https://mengxi-studio.github.io/create-uni-app/changelog.html/)**

## License

[MIT](./LICENSE)
