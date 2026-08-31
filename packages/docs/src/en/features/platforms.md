# Platforms

Supports all uni-app compile platforms. Full-platform mode also generates `dev:custom`, `dev:h5:ssr` scripts (aligned with the official template).

## Platform List

| Group | Platforms |
| --- | --- |
| All | All platforms (recommended) |
| H5/App | `h5`, `app` |
| Mini programs | WeChat `mp-weixin`, Alipay `mp-alipay`, Baidu `mp-baidu`, Toutiao `mp-toutiao`, QQ `mp-qq`, Feishu `mp-lark`, JD `mp-jd`, Kuaishou `mp-kuaishou`, XHS `mp-xhs` |
| Quick Apps | Generic `quickapp-webview`, Huawei `quickapp-webview-huawei`, Union `quickapp-webview-union` |

## Group Shortcuts

Platform multi-select provides quick items:

- **All**: equivalent to the full platform list
- **Mini programs (all)**: expands to all `mp-*`
- **Quick Apps (all)**: expands to all `quickapp-*`

Group items are expanded into concrete platforms by the generator.

## Script Generation

- **Full** (select "All"): outputs `dev:*` / `build:*` for every platform plus custom and SSR scripts
- **Single**: keeps only the selected platforms; `h5` additionally gets SSR scripts
- **TS**: adds `type-check` (`vue-tsc --noEmit`)

## manifest.json Slimming

`manifest.json` injects config blocks per selected platform. Full mode outputs all `mp-*` and `h5` blocks; single selection keeps only the chosen ones to avoid redundancy.