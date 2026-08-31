# @mengxi/create-uni-app

基于 [uni-app](https://uniapp.dcloud.net.cn/) + Vue3 + Vite 的**交互式脚手架 CLI**。通过命令行对话按需生成 uni-app 基础项目与可选能力，只产出你选中的内容，不携带多余文件与依赖。

## 特性

* **交互式创建**：项目名 → 脚本语言（TS / JS）→ CSS 预处理器 → 内置主题 → 状态管理（Pinia / Vuex）→ 路由方案 → 目标平台 → 可选功能 → 包管理器 → 是否自动安装依赖

* **多平台按需**：支持全部 15 个 uni-app 平台，提供「全部端」「小程序（全部）」「快应用（全部）」分组快捷勾选

* **TS / JS 可选**：TS 项目生成 `tsconfig.json` 并注入类型检查；JS 项目生成 `jsconfig.json`，两者互斥、不留多余依赖

* **多套内置主题**：默认紫 / 清新蓝 / 自然绿 / 温暖橙；Sass / Less / Stylus / 原生 CSS（CSS 变量）均可全局混入变量与 mixin

* **状态管理**：Pinia / Vuex 二选一，均可选[状态持久化](#状态管理)，自动注入主入口并生成 store 示例

* **路由 / 页面方案**：uni-router、generateRouter、generatePages、generateUni 组合互斥可选（详见[路由方案](#路由页面方案)）

* **可选功能**：请求封装 + 登录鉴权、uni-ui 组件库（easycom 按需引入）

* **配套命令**：`create` 建页（自动注册路由）、`info` 诊断、`config` 持久化模板源

## 快速开始

### 安装

```bash
# 全局安装后直接使用
npm i -g @mengxi/create-uni-app
create-uni-app my-app

# 或不经安装，直接执行
npx @mengxi/create-uni-app my-app
```

> **包名 vs 命令名**：本包的 npm 包名为 `@mengxi/create-uni-app`（作用域包，发布在 `mengxi` 组织下）；包内的 `bin` 命令仍为短名 `create-uni-app`，因此全局安装后直接使用 `create-uni-app` 命令即可。也支持 `yarn add -g` / `pnpm add -g` 安装。

### 创建项目

```bash
create-uni-app
# 或直接指定项目名（后续仍可修改）
create-uni-app my-app
```

进入交互问答，按提示逐步选择即可，结束时可选自动安装依赖。

| 步骤       | 说明                                                                  |
| -------- | ------------------------------------------------------------------- |
| 项目名称     | 必填，自动清洗为小写字母 / 数字 / 中划线                                             |
| 脚本语言     | TypeScript / JavaScript                                             |
| CSS 预处理器 | Sass/Scss · Less · Stylus · 原生 CSS                                  |
| 内置主题     | 一套全局混入主题（原生 CSS 用 CSS 变量）                                           |
| 状态管理     | Pinia / Pinia+持久化 / Vuex / Vuex+持久化 / 不使用                           |
| 路由方案     | 不使用 / uni-router / +generateRouter / 仅 generatePages / +generateUni |
| 目标平台     | 可多选，含「全部端 / 小程序(全部) / 快应用(全部)」快捷项                                   |
| 可选功能     | 请求封装+登录 / uni-ui                                                    |
| 包管理器     | npm / yarn / pnpm                                                   |
| 安装依赖     | 生成后立即安装或稍后手动                                                        |

## 支持的平台

| 分组     | 平台                                                                                                                            |
| ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| 全端     | 全部平台（推荐）                                                                                                                      |
| H5/App | `h5`、`app`                                                                                                                    |
| 小程序    | 微信 `mp-weixin`、支付宝 `mp-alipay`、百度 `mp-baidu`、抖音 `mp-toutiao`、QQ `mp-qq`、飞书 `mp-lark`、京东 `mp-jd`、快手 `mp-kuaishou`、小红书 `mp-xhs` |
| 快应用    | 通用 `quickapp-webview`、华为 `quickapp-webview-huawei`、联盟 `quickapp-webview-union`                                                |

> 全端模式下会额外生成 `dev:custom`、`dev:h5:ssr` 等脚本（对齐官方模板）。

## 命令参考

顶层命令 `create-uni-app` 用于创建项目，另提供三个子命令。

### 创建参数

```bash
create-uni-app [projectName] [options]
```

| 参数/选项               | 说明                                                                           |
| ------------------- | ---------------------------------------------------------------------------- |
| `[projectName]`     | 项目名称（可选，问答中仍可修改）                                                             |
| `--uni-version`     | 指定 uni-app 运行时版本号，缺省用内置默认值                                                   |
| `--template-source` | 使用自定义模板源：本地目录路径或 git 仓库（`github:owner/repo` / `gitlab:owner/repo` / git url） |
| `--template`        | 在模板组中选择具体模板（缺省交互选择）                                                          |

```bash
# 指定 uni-app 版本
create-uni-app my-app --uni-version 3.0.0-xxx

# 使用本地模板目录
create-uni-app my-app --template-source ./my-templates

# 使用 git 模板仓库（自动浅克隆到临时目录）
create-uni-app my-app --template-source github:owner/templates
create-uni-app my-app --template-source https://github.com/owner/templates.git
```

#### `--template` 参数

当模板源是**模板组**（根目录下多个模板）时，用 `--template` 直接指定要使用的模板名，跳过交互选择：

```bash
create-uni-app <projectName> --template-source <组> --template <模板名>
```

```bash
# 从本地模板组中用 admin 模板
create-uni-app my-app --template-source ./.my-template-group --template admin

# 从 git 模板组中用 shop 模板
create-uni-app my-app --template-source github:owner/templates --template shop
```

若不传 `--template`，模板组存在多个候选时会进入交互选择；只有一个候选项时自动使用。

示例模板组结构（`--template admin` 即使用 `tpl-admin/`）：

```
.my-templates/               # 模板组根（--template-source 指向此处）
├── tpl-shop/   base/  entry/  features/  template.json
└── tpl-admin/  base/  entry/  features/
```

> 校验：指定的模板名不在模板组中会报错，并列出可用模板。
> 内置模板为单模板形态（根目录直接含 `base/`），无需使用 `--template`。

缺省 uni-app 版本可在生成后执行 `npx @dcloudio/uvm@latest` 对齐官方最新。

### create —— 新建页面

```bash
create-uni-app create                        # 交互输入页面名
create-uni-app create order-list             # 直接指定页面名
create-uni-app create order --subpackage pages-sub   # 建到 pages-sub 分包
```

自动探测当前项目的 TS/JS、CSS 预处理器、分包目录与路由方式，生成匹配的页面文件并正确注册：

* **传统模式**：注册到 `src/pages.json`（主包 `pages` 或分包 `subPackages`）

* **手动 uni-router**：另向 `src/router.config` 追加路由条目

* **generatePages / generateUni**：仅生成页面文件，`pages.json` 交由插件自动注册

* 存在分包时交互选择主包/分包；重复注册自动去重

**使用示例**（以传统模式 + 手动 uni-router 项目为例）：

```bash
# 直接指定页面名，创建到主包
cd my-app
create-uni-app create order-list

# 创建到 pages-sub 分包（分包目录需已存在）
create-uni-app create order --subpackage pages-sub

# 不传页面名则进入交互问答
create-uni-app create
```

创建后会生成对应文件并自动联动：

```
my-app/src/
├── pages/
│   └── order-list/
│       └── order-list.vue      # 主包页面
└── pages-sub/
    └── order/
        └── order.vue           # 分包页面（--subpackage）
```

同时依据工程形态输出联动结果：

```text
✅ 页面已创建：.../src/pages/order-list/order-list.vue
📄 已注册路由：/pages/order-list/order-list
🔗 已追加 uni-router 路由：.../src/router.config.ts   # 仅手动 uni-router 方案
```

> 若项目使用 generatePages / generateUni，则不输出「已注册路由」，改为提示页面将交由插件自动注册到 `pages.json`。

#### `--subpackage` 参数

将新页面创建到指定分包：

```bash
create-uni-app create <pageName> --subpackage <root>
```

| 说明       | 内容                                                                                   |
| -------- | ------------------------------------------------------------------------------------ |
| `<root>` | 分包根目录名，目录位于 `src/<root>/`（与 `generatePages`/`generateUni` 的 `subPackages.root` 约定一致） |
| 缺省       | 未指定时默认创建到主包 `src/pages/`                                                             |
| 交互       | 存在分包且未指定 `<root>` 时，会交互询问创建到主包还是哪个分包                                                 |
| 校验       | 指定的 `<root>` 目录不存在会报错退出                                                              |

示例：

```bash
# 创建到 src/pages-sub/ 分包
create-uni-app create order --subpackage pages-sub

# 分包下多个页面
create-uni-app create detail --subpackage pages-sub
create-uni-app create cart --subpackage pages-sub
```

对应生成的目录结构：

```
src/pages-sub/                 # 分包根（root = pages-sub）
├── order/
│   └── order.vue
├── detail/
│   └── detail.vue
└── cart/
    └── cart.vue
```

> 传统模式下，分包页面会追加注册到 `pages.json` 的 `subPackages` 数组；手动 uni-router 方案下还会向 `router.config` 追加对应路由条目。
>
> 分包目录需先存在（由脚手架生成、或 `generatePages`/`generateUni` 方案自动创建）。

### info —— 诊断

```bash
create-uni-app info
```

打印 CLI / Node 版本，并检测当前目录是否为 uni-app 项目及是否启用 TS / Sass / Pinia / Vuex / uni-ui。

### config —— 持久化模板源

```bash
create-uni-app config set ./my-templates   # 持久化为默认模板源
create-uni-app config get                  # 查看当前模板源
create-uni-app config remove               # 清除，回到内置模板
```

模板源解析优先级：`--template-source` 参数 > 全局配置（`~/.create-uni-app/config.json`）> 内置模板。

## 自定义模板 / 模板组

### 目录约定

一个模板 = 一个遵循约定目录结构的目录：

```
<模板根>/
├── template.json        # 可选：预填交互默认值
├── base/                # 基础骨架（静态文件 + ${} 占位符）
├── entry/               # 主入口
│   ├── ts/  ts-root/    # TS 项目（main.ts 进 src；tsconfig/env.d.ts 进根）
│   └── js/  js-root/    # JS 项目（main.js 进 src；jsconfig.json 进根）
└── features/            # 功能片段（按 ts/js 双版本：pinia|vuex · request · uni-ui · themes · router · subpackage）
```

不遵循该约定的模板源会在解析时报错。

### template.json 预填交互默认值

模板可通过根目录的 `template.json` 指定交互默认值（问答中仍可修改或直接确认）：

```json
{
  "useTypeScript": false,
  "css": "scss",
  "theme": "blue",
  "state": "pinia-persist",
  "router": "router-generate",
  "platform": ["mp-weixin", "h5"],
  "features": ["request", "uni-ui"],
  "packageManager": "pnpm",
  "installDeps": false
}
```

支持字段（均可选）：

* `useTypeScript`：`true` / `false`

* `css`：`scss` / `less` / `stylus` / `none`

* `theme`：`default` / `blue` / `green` / `orange` / `none`

* `state`：`pinia` / `pinia-persist` / `vuex` / `vuex-persist` / `none`

* `router`：`none` / `router` / `router-generate` / `pages` / `uni`

* `platform`：平台标识数组，如 `["mp-weixin", "h5"]`

* `features`：`request` / `uni-ui`

* `packageManager`：`npm` / `yarn` / `pnpm`

* `installDeps`：`true` / `false`

### 模板组组织

模板组 = 根目录下多个模板，每个子目录含 `base/`：

```
<模板组根>/
├── tpl-shop/   base/  entry/  features/  template.json
└── tpl-admin/  base/  entry/  features/
```

创建时用 `--template` 指定或在交互中选择一个；只有一个候选项时自动使用。

### 最佳实践

* `base/` 文件用 `${token}` 占位，可用变量：`${safeName}`、`${ext}`、`${cssExt}`、`${uniVersion}`、`${stateImport}`、`${routerImport}`、`${easycomBlock}`、`${paletteLines}` 等。

* 依赖版本：`package.json` 用 `${uniVersion}` 统一 uni-app 版本；`tsconfig.json` 依赖 `@vue/tsconfig`，随 TS 选择自动注入。

* **版本红线**：uni-app 打包器与 vite5 / pinia2 / typescript5 / vue-tsc2 强耦合，不要随意升 major；用 `npx @dcloudio/uvm@latest` 对齐 uni 版本即可。

* 团队统一：用 `--template-source` 指向模板仓库根，配合 `config set` 持久化，让整个团队共享同一套模板。

## 生成的项目结构

```
my-app/
├── package.json        # scripts 按所选平台生成
├── vite.config.js      # uni-app Vite 配置（按需注入生成插件 / 主题）
├── index.html          # H5 入口
├── tsconfig.json       # 选 TS 时生成
├── jsconfig.json       # 选 JS 时生成
└── src/
    ├── main.ts/js      # 应用入口（按需注入状态管理 / uni-router）
    ├── App.vue         # 应用根组件
    ├── pages.json      # 页面配置（含 uni-ui easycom）
    ├── manifest.json   # 应用清单（按所选平台精简）
    ├── uni.scss        # 全局主题变量（选主题时注入色板）
    └── pages/...       # 页面（generatePages/generateUni 方案含 pages-sub 分包示例）
```

生成后可运行：

```bash
cd my-app
npm install
npm run dev:h5            # 启动 H5
npm run dev:mp-weixin     # 启动微信小程序
npm run type-check        # 仅 TS 项目有
```

## 开发与发布

```bash
pnpm install          # 安装依赖（本仓库使用 pnpm 管理）
pnpm run build        # 编译 TS 到 dist
pnpm run dev          # 编译后打印帮助
pnpm run start        # 本地运行 CLI
```

发布前 `prepublishOnly` 会自动构建；`files` 已锁定 `dist` 与 `templates`，`bin` 指向 `dist/index.js`。

## 技术栈

Node.js ≥ 16 · TypeScript · Commander · prompts · Vue3 · Vite · uni-app

## License

[MIT](./LICENSE)
