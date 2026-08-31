# 模板目录约定

一个模板 = 一个遵循约定目录结构的目录。`create-uni-app` 按约定解析模板，不遵循会在解析时报错。

## 目录结构

```
<模板根>/
├── template.json        # 可选：预填交互默认值
├── base/                # 基础骨架（静态文件 + ${} 占位符）
├── entry/               # 主入口
│   ├── ts/  ts-root/    # TS 项目（main.ts 进 src；tsconfig/env.d.ts 进根）
│   └── js/  js-root/    # JS 项目（main.js 进 src；jsconfig.json 进根）
└── features/            # 功能片段（按 ts/js 双版本：pinia|vuex · request · uni-ui · themes · router · subpackage）
```

## 各目录职责

| 目录 | 职责 |
| --- | --- |
| `template.json` | 预填交互默认值（可选） |
| `base/` | 基础骨架：静态文件 + `${token}` 占位符 |
| `entry/` | 主入口，按 TS / JS 各两份 |
| `features/` | 功能片段，按 ts/js 双版本组织 |

## base/ 占位符

`base/` 文件用 `${token}` 占位，渲染时替换为实际值：

| 占位符 | 说明 |
| --- | --- |
| `${safeName}` | 合法化后的项目名 |
| `${ext}` | `ts` / `js` |
| `${cssExt}` | `scss` / `less` / `stylus` / `css` |
| `${uniVersion}` | uni-app 运行时版本号 |
| `${stateImport}` | 状态管理 import 语句 |
| `${routerImport}` | 路由 import 语句 |
| `${easycomBlock}` | uni-ui easycom 配置块 |
| `${paletteLines}` | 主题色板变量 |

## template.json 预填交互默认值

模板可通过根目录 `template.json` 指定交互默认值（问答中仍可修改）：

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

| 字段 | 取值 |
| --- | --- |
| `useTypeScript` | `true` / `false` |
| `css` | `scss` / `less` / `stylus` / `none` |
| `theme` | `default` / `blue` / `green` / `orange` / `none` |
| `state` | `pinia` / `pinia-persist` / `vuex` / `vuex-persist` / `none` |
| `router` | `none` / `router` / `router-generate` / `pages` / `uni` |
| `platform` | 平台标识数组，如 `["mp-weixin", "h5"]` |
| `features` | `request` / `uni-ui` |
| `packageManager` | `npm` / `yarn` / `pnpm` |
| `installDeps` | `true` / `false` |

## 版本红线

- uni-app 打包器与 vite5 / pinia2 / typescript5 / vue-tsc2 强耦合，不要随意升 major
- 用 `npx @dcloudio/uvm@latest` 对齐 uni 版本即可

## 团队统一

用 `--template-source` 指向模板仓库根，配合 `config set` 持久化，让整个团队共享同一套模板。

## 下一步

- [模板组与 --template](./template-group) — 多模板组织与选择