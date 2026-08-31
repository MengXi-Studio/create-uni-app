# 简介

`@mengxi/create-uni-app` 是基于 [uni-app](https://uniapp.dcloud.net.cn/) + Vue3 + Vite 的**交互式脚手架 CLI**。通过命令行对话按需生成 uni-app 基础项目与可选能力，只产出你选中的内容，不携带多余文件与依赖。

## 特性总览

- **交互式创建**：项目名 → 脚本语言（TS / JS）→ CSS 预处理器 → 内置主题 → 状态管理 → 路由方案 → 目标平台 → 可选功能 → 包管理器 → 是否自动安装依赖
- **多平台按需**：支持全部 15 个 uni-app 平台，提供「全部端 / 小程序(全部) / 快应用(全部)」分组快捷勾选
- **TS / JS 可选**：TS 生成 `tsconfig.json` 并注入类型检查；JS 生成 `jsconfig.json`，两者互斥
- **多套内置主题**：默认紫 / 清新蓝 / 自然绿 / 温暖橙，Sass / Less / Stylus / 原生 CSS 均可全局混入变量与 mixin
- **状态管理**：Pinia / Vuex 二选一，均可选状态持久化
- **路由 / 页面方案**：uni-router、generateRouter、generatePages、generateUni 组合互斥可选
- **可选功能**：请求封装 + 登录鉴权、uni-ui 组件库（easycom 按需引入）
- **配套命令**：`create` 建页（自动注册路由）、`info` 诊断、`config` 持久化模板源

## 技术栈

Node.js ≥ 16 · TypeScript · Commander · prompts · Vue3 · Vite · uni-app

## 仓库结构

本项目为 pnpm workspace，包含两个子项目：

| 目录 | npm 包名 | 说明 |
| --- | --- | --- |
| `packages/core` | `@mengxi/create-uni-app` | CLI 本体（源码 + 内置模板） |
| `packages/docs` | `@mengxi/create-uni-app-docs` | 本文档站（VitePress） |

## 文档导航

- [快速开始](./quick-start) — 安装与创建第一个项目
- [功能](./../features/platforms) — 各能力的详细说明
- [自定义模板](./../template/custom-template) — 如何接入团队模板