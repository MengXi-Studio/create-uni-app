# 更新日志

本项目的变更记录遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 与 [语义化版本](https://semver.org/lang/zh-CN/)。

## [1.0.0] - 2026-09-01

> 首个正式版本。基于 uni-app + Vue3 + Vite 的交互式脚手架 CLI，通过命令行对话按需生成 uni-app 工程。

### ✨ 新特性

#### 交互式创建

- 完整的交互问答流程：项目名 → 脚本语言 → CSS 预处理器 → 内置主题 → 状态管理 → 路由方案 → 目标平台 → 可选功能 → 包管理器 → 是否自动安装依赖
- 项目名自动清洗为合法的 npm 安全名（小写字母 / 数字 / 中划线）
- 支持命令行直接指定项目名，后续仍可在问答中修改

#### 多平台按需

- 覆盖全部 uni-app 编译平台（H5、App、9 个小程序、3 个快应用）
- 提供「全部端 / 小程序(全部) / 快应用(全部)」分组快捷勾选
- 按所选平台自动生成 `dev:*` / `build:*` 脚本，全端模式额外生成 custom 与 SSR 脚本
- `manifest.json` 按所选平台精简，单选时只保留对应配置块

#### 语言选型

- TypeScript / JavaScript 双选，互斥生成
- TS 生成 `tsconfig.json` 并注入类型检查（`vue-tsc`）；JS 生成 `jsconfig.json`

#### 主题与样式

- 内置 4 套主题色板：默认紫 / 清新蓝 / 自然绿 / 温暖橙
- 兼容 Sass / Less / Stylus / 原生 CSS（CSS 变量）
- 按所选预处理器自动注入对应的全局样式依赖与混入方式

#### 状态管理

- Pinia / Vuex 二选一，均支持可选状态持久化
- 自动向主入口注入 store，并生成 counter 示例

#### 路由 / 页面方案

- uni-router、generateRouter、generatePages、generateUni 组合互斥可选
- 按方案自动注入主入口路由配置、`vite.config.js` 生成插件及对应依赖

#### 可选集成

- 请求封装 + 登录鉴权（统一拦截、token、守卫、示例 API）
- uni-ui 组件库（easycom 按需引入）与示例页面

#### 配套命令

- `create` 建页：自动探测工程形态并注册路由 / 分销包
- `info` 诊断：打印环境与项目信息
- `config`：持久化 / 查看 / 清除模板源

#### 自定义模板

- 自定义模板源：本地目录或 git 仓库（`github:` / `gitlab:` / git url）
- 模板组组织与 `--template` 指定
- `template.json` 预填交互默认值
- 基于 `${token}` 占位符的渲染引擎

### 🛠 工程化

- pnpm workspace monorepo：`packages/core`（CLI）+ `packages/docs`（VitePress 文档站）
- 文档站支持中英双语（`/` 中文、`/en/` 英文）
- ESLint（flat config + Prettier）代码规范
- TypeScript 类型检查

---

历史版本见 [Releases](https://github.com/MengXi-Studio/create-uni-app/releases)。
