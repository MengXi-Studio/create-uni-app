# Theming & Preprocessors

## CSS Preprocessors

Support Sass/Scss · Less · Stylus · Plain CSS:

| Choice | Description |
| --- | --- |
| `scss` | Sass/Scss, most common; theme variables auto-injected via `uni.scss` |
| `less` | Theme injected via Vite `additionalData` |
| `stylus` | Theme injected via Vite `additionalData` |
| `none` | Plain CSS, theme carried by CSS custom properties (`--var`) |

Selecting a preprocessor also injects the matching compile dependency (`sass` / `less` / `stylus`) — not installed when unused.

## Built-in Themes

Four theme palettes:

| Theme | primary |
| --- | --- |
| Default Purple | `#4b3fe3` |
| Blue | `#2563eb` |
| Green | `#059669` |
| Orange | `#ea580c` |

Each palette carries `primary` / `success` / `warning` / `error` / `bg`, rendered per preprocessor:

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
/* plain CSS (inside :root) */
--uni-color-primary: #4b3fe3;
```

> Under plain CSS, picking a theme imports `@/theme.css` in the main entry.

## How It Applies

- **scss**: variables go into `uni.scss`, auto-injected globally by uni-app
- **less / stylus**: injected globally via `preprocessorOptions.additionalData` in `vite.config.js`
- **none**: the main entry imports `theme.css`