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

| 目录              | 职责                         |
| --------------- | -------------------------- |
| `template.json` | 预填交互默认值（可选）                |
| `base/`         | 基础骨架：静态文件 + `${token}` 占位符 |
| `entry/`        | 主入口，按 TS / JS 各两份          |
| `features/`     | 功能片段，按 ts/js 双版本组织         |

## base/ 占位符

`base/` 文件用 `${token}` 占位，渲染时替换为实际值：

| 占位符                          | 说明                                                         |
| ---------------------------- | ---------------------------------------------------------- |
| `${safeName}`                | 合法化后的项目名                                                   |
| `${ext}`                     | `ts` / `js`                                                |
| `${cssExt}`                  | 样式后缀：`scss` / `less` / `stylus` / `css`                    |
| `${uniVersion}`              | uni-app 运行时版本号                                             |
| `${themeImport}`             | 主入口中引入全局主题的语句（原生 CSS 主题用）                                  |
| `${cssPreprocessorConfig}`   | vite.config 的 css 注入片段（less/stylus 主题全局注入）                 |
| `${stateImport}`             | 状态管理 main import（Pinia 导入 `./stores` 的 `createPiniaStore`） |
| `${stateSetup}`              | 状态管理初始化语句（如 `const pinia = createPiniaStore()`）            |
| `${stateUse}`                | `app.use(pinia)` / `app.use(store)` 注入                     |
| `${statePersistStoreImport}` | Pinia `stores/index` 的持久化插件 import                         |
| `${statePersistStoreUse}`    | Pinia `stores/index` 中插件注册语句                               |
| `${routerImport}`            | 主入口引入路由实例：`import router from './router'`                  |
| `${routerSetup}`             | 路由实例创建语句（已封装进 `src/router/index` + `guards`，main 无需注入）     |
| `${routerUse}`               | `app.use(router)` 注入                                       |
| `${vitePluginImports}`       | vite.config 顶部生成插件 import                                  |
| `${vitePluginList}`          | vite.config plugins 数组追加项（生成插件调用）                          |
| `${easycomBlock}`            | uni-ui easycom 配置块                                         |
| `${paletteLines}`            | 主题色板变量                                                     |

> 占位符由 `buildContext` 统一注入，更多字段以 `TemplateContext` 类型为准。

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

| 字段               | 取值                                                           |
| ---------------- | ------------------------------------------------------------ |
| `useTypeScript`  | `true` / `false`                                             |
| `css`            | `scss` / `less` / `stylus` / `none`                          |
| `theme`          | `default` / `blue` / `green` / `orange` / `none`             |
| `state`          | `pinia` / `pinia-persist` / `vuex` / `vuex-persist` / `none` |
| `router`         | `none` / `router` / `router-generate` / `pages` / `uni`      |
| `platform`       | 平台标识数组，如 `["mp-weixin", "h5"]`                               |
| `features`       | `request` / `uni-ui`                                         |
| `packageManager` | `npm` / `yarn` / `pnpm`                                      |
| `installDeps`    | `true` / `false`                                             |

## 版本红线

- uni-app 打包器与 vite5 / pinia2 / typescript5 / vue-tsc2 强耦合，不要随意升 major

- 用 `npx @dcloudio/uvm@latest` 对齐 uni 版本即可

## 团队统一

用 `--template-source` 指向模板仓库根，配合 `config set` 持久化，让整个团队共享同一套模板。

## 下一步

- [模板组与 --template](./template-group) — 多模板组织与选择

