# Theming & Preprocessors

## Why You Need It

uni-app's global style injection differs by preprocessor: Sass uses the official `uni.scss` convention, while Less / Stylus require manual config. `create-uni-app` wires up "choice + dependency + global injection" in one go, and ships 4 built-in theme palettes.

## CSS Preprocessors

| Choice | Description | Theme injection |
| --- | --- | --- |
| `scss` | Most common | Variables written into `uni.scss`, auto-injected globally by uni-app |
| `less` | — | Vite `preprocessorOptions.additionalData` |
| `stylus` | — | Vite `preprocessorOptions.additionalData` |
| `none` | Plain CSS | CSS custom properties (`--var`), main entry imports `theme.css` |

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

## How It Applies

| Preprocessor | Chain |
| --- | --- |
| scss | `uni.scss` → auto-injected globally by uni-app |
| less / stylus | `additionalData` in `vite.config.js` → auto-imports the theme into every style file |
| none | Main entry `import '@/theme.css'` → `:root` variables available globally |

## Next Steps

- [State Management](./state) — state management choices