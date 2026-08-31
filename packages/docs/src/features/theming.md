# 主题与预处理器

## CSS 预处理器

支持 Sass / Scss · Less · Stylus · 原生 CSS：

| 选型 | 说明 |
| --- | --- |
| `scss` | Sass/Scss，最常用，主题变量经 `uni.scss` 自动全局注入 |
| `less` | Less，主题经 Vite `additionalData` 注入 |
| `stylus` | Stylus，主题经 Vite `additionalData` 注入 |
| `none` | 原生 CSS，通过 CSS 自定义属性（`--var`）承载主题 |

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

> 原生 CSS 下选择主题，会在主入口 `import '@/theme.css'` 全局生效。

## 生效方式

- **scss**：变量写入 `uni.scss`，由 uni-app 自动全局注入
- **less / stylus**：通过 `vite.config.js` 的 `preprocessorOptions.additionalData` 全局注入
- **none**：主入口 import `theme.css`