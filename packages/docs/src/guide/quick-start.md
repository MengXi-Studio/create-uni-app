# 快速开始

## 安装

```bash
# 全局安装后直接使用
npm i -g @mengxi/create-uni-app
create-uni-app my-app

# 或不经安装，直接执行
npx @mengxi/create-uni-app my-app
```

> **包名 vs 命令名**：npm 包名为 `@mengxi/create-uni-app`（作用域包），包内 `bin` 命令为短名 `create-uni-app`，因此全局安装后直接使用 `create-uni-app` 即可。也支持 `yarn add -g` / `pnpm add -g`。

## 创建项目

```bash
create-uni-app          # 进入交互问答
create-uni-app my-app   # 直接指定项目名（后续仍可修改）
```

进入交互问答后按提示逐步选择，结束时可选自动安装依赖。

| 步骤 | 说明 |
| --- | --- |
| 项目名称 | 必填，自动清洗为小写字母 / 数字 / 中划线 |
| 脚本语言 | TypeScript / JavaScript |
| CSS 预处理器 | Sass/Scss · Less · Stylus · 原生 CSS |
| 内置主题 | 一套全局混入主题（原生 CSS 用 CSS 变量） |
| 状态管理 | Pinia / Pinia+持久化 / Vuex / Vuex+持久化 / 不使用 |
| 路由方案 | 不使用 / uni-router / +generateRouter / 仅 generatePages / +generateUni |
| 目标平台 | 可多选，含「全部端 / 小程序(全部) / 快应用(全部)」快捷项 |
| 可选功能 | 请求封装+登录 / uni-ui |
| 包管理器 | npm / yarn / pnpm |
| 安装依赖 | 生成后立即安装或稍后手动 |

## 启动开发

```bash
cd my-app
npm install
npm run dev:h5            # 启动 H5
npm run dev:mp-weixin     # 启动微信小程序
npm run type-check        # 仅 TS 项目有
```

## 平台相关命令

支持的全部平台与脚本，见 [多平台支持](./../features/platforms)。