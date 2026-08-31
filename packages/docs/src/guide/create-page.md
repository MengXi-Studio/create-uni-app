# 创建页面

`create-uni-app create` 用于在当前 uni-app 项目中创建新页面，自动适配不同的工程形态。

## 用法

```bash
create-uni-app create                        # 交互输入页面名
create-uni-app create order-list             # 直接指定页面名
create-uni-app create order --subpackage pages-sub   # 建到 pages-sub 分包
```

## 自动探测

创建时会自动探测当前项目的：

- **脚本语言**：TS / JS
- **CSS 预处理器**：scss / less / stylus / css
- **分包目录**：是否存在 `src/pages-sub`
- **路由方式**：传统 / 手动 uni-router / generatePages / generateUni

## 路由联动

- **传统模式**：注册到 `src/pages.json`（主包 `pages` 或分包 `subPackages`）
- **手动 uni-router**：另向 `src/router.config` 追加路由条目
- **generatePages / generateUni**：仅生成页面文件，`pages.json` 交由插件自动注册
- 存在分包时交互选择主包/分包；重复注册自动去重

## --subpackage 参数

将新页面创建到指定分包：

```bash
create-uni-app create <pageName> --subpackage <root>
```

| 说明 | 内容 |
| --- | --- |
| `<root>` | 分包根目录名，目录位于 `src/<root>/` |
| 缺省 | 未指定时默认创建到主包 `src/pages/` |
| 交互 | 存在分包且未指定时交互询问主包还是分包 |
| 校验 | 指定的 `<root>` 目录不存在会报错退出 |