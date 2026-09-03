# 快速开始

> 前提：已通过 [安装](./installation) 准备好 CLI，或直接使用 `npx @meng-xi/create-uni-app`。

## 创建项目

```bash
create-uni-app          # 进入交互问答
create-uni-app my-app   # 直接指定项目名（后续仍可修改）
```

随后按提示逐步选择，结束时可选自动安装依赖。整个过程约 9 步：

| 步骤       | 说明                                                                  |
| -------- | ------------------------------------------------------------------- |
| 项目名称     | 必填，自动清洗为小写字母 / 数字 / 中划线                                             |
| 脚本语言     | TypeScript / JavaScript                                             |
| CSS 预处理器 | Sass/Scss · Less · Stylus · 原生 CSS                                  |
| 状态管理     | Pinia / Pinia+持久化 / Vuex / Vuex+持久化 / 不使用                           |
| 路由方案     | 不使用 / uni-router / +generateRouter / 仅 generatePages / +generateUni |
| 目标平台     | 可多选，含「全部端 / 小程序(全部) / 快应用(全部)」快捷项；选中分组时其余重选项自动禁用                    |
| 可选功能     | 内置主题（勾选后再选色板）· 请求封装+登录 · uni-ui（需选中 Sass/Scss）                      |
| 包管理器     | npm / yarn / pnpm                                                   |
| 安装依赖     | 生成后立即安装或稍后手动                                                        |

> 生成只产出你所选内容：未勾选的语言、功能、平台一律不生成，也没有多余依赖。

## 启动开发

```bash
cd my-app
npm install              # 若未自动安装
npm run dev:h5           # 启动 H5
npm run dev:mp-weixin    # 启动微信小程序
npm run type-check       # 仅 TS 项目有
```

| 命令                      | 作用                                    |
| ----------------------- | ------------------------------------- |
| `npm run dev:h5`        | 浏览器预览                                 |
| `npm run dev:mp-weixin` | 编译微信小程序，用开发者工具打开 `dist/dev/mp-weixin` |
| `npm run type-check`    | TS 项目的类型检查                            |

## 平台相关命令

支持的全部平台与脚本，见 [多平台支持](./../features/platforms)。

## 下一步

- [命令参考](./cli) — 了解全部命令与参数

- [创建页面](./create-page) — 在项目中新建页面

<br />
