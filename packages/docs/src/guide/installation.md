# 安装

## 环境要求

| 依赖 | 要求 |
| --- | --- |
| Node.js | ≥ 16 |

## 安装方式

三种方式任选其一，效果相同：

```bash
# npm
npm i -g @meng-xi/create-uni-app

# yarn
yarn add -g @meng-xi/create-uni-app

# pnpm
pnpm add -g @meng-xi/create-uni-app
```

也可以不安装、临时执行：

```bash
npx @meng-xi/create-uni-app my-app
```

> **包名 vs 命令名**：npm 包名为 `@meng-xi/create-uni-app`（作用域包，发布在 `meng-xi` 组织下）；包内的 `bin` 命令为短名 `create-uni-app`。因此全局安装后，直接运行 `create-uni-app` 即可，无需带作用域前缀。

## 验证

```bash
create-uni-app --version   # 应打印版本号
create-uni-app --help      # 应打印命令帮助
```

## 下一步

- [快速开始](./quick-start) — 创建你的第一个项目