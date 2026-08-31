# 主题与预处理器

## 为什么需要它

uni-app 的全局样式注入方式因预处理器而异：Sass 的 `uni.scss` 是官方约定，Less / Stylus 则需手动配置。`create-uni-app` 帮你把「选型 + 依赖 + 全局注入」一次配好，还附带 4 套内置主题色板。

## CSS 预处理器

| 选型 | 说明 | 主题注入方式 |
| --- | --- | --- |
| `scss` | 最常用 | 变量写入 `uni.scss`，由 uni-app 自动全局注入 |
| `less` | — | Vite `preprocessorOptions.additionalData` |
| `stylus` | — | Vite `preprocessorOptions.additionalData` |
| `none` | 原生 CSS | CSS 自定义属性（`--var`），主入口 import `theme.css` |

选择预处理器的同时会注入对应编译依赖（`sass` / `less` / `stylus`），不选用不装。

## 内置主题

提供 4 套主题色板：

| 主题 | primary 主色 |
| --- | --- |
| 默认紫 | `#4b3fe3` |
| 清新蓝 | `#2563eb` |
| 自然绿 | `#059669` |
| 温暖橙 | `#ea580c` |

每套主题含 `primary` / `success` / `warning` / `error` / `bg` 五类色值，按所选预处理器渲染变量：

```scss
// scss
$uni-color-primary: #4b3fe3;
```

```less
@uni-color-primary: #4b3fe3;
```

```stylus
uni-color-primary = #4b3fe3
```

```css
/* 原生 CSS（置于 :root） */
--uni-color-primary: #4b3fe3;
```

## 生效方式

| 预处理器 | 生效链路 |
| --- | --- |
| scss | `uni.scss` → uni-app 自动全局注入 |
| less / stylus | `vite.config.js` 的 `additionalData` → 每个样式文件自动 import 主题 |
| none | 主入口 `import '@/theme.css'` → `:root` 变量全局可用 |

## 下一步

- [状态管理](./state) — 状态管理选型