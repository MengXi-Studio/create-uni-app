# Platforms

Supports all uni-app compile platforms. Once you pick platforms, the `dev:*` / `build:*` scripts in `package.json` and the `manifest.json` config are **slimmed to your selection**. Full-platform mode additionally generates `dev:custom`, `dev:h5:ssr` scripts (aligned with the official template).

## Platform List

| Group | Platforms |
| --- | --- |
| All | All platforms (recommended) |
| H5/App | `h5`, `app` |
| Mini programs | WeChat `mp-weixin`, Alipay `mp-alipay`, Baidu `mp-baidu`, Toutiao `mp-toutiao`, QQ `mp-qq`, Feishu `mp-lark`, JD `mp-jd`, Kuaishou `mp-kuaishou`, XHS `mp-xhs` |
| Quick Apps | Generic `quickapp-webview`, Huawei `quickapp-webview-huawei`, Union `quickapp-webview-union` |

## Group Shortcuts

Platform multi-select provides three shortcuts, expanded into concrete platforms by the generator:

| Shortcut | Expands to |
| --- | --- |
| All platforms | All platforms |
| Mini programs (all) | All `mp-*` |
| Quick Apps (all) | All `quickapp-*` |

## Script Generation

- **Full** (select "All platforms"): outputs `dev:*` / `build:*` for every platform plus custom and SSR scripts
- **Single**: keeps only the selected platforms; `h5` additionally gets SSR scripts
- **TS**: adds `type-check` (`vue-tsc --noEmit`)

For example, selecting "WeChat mini program + H5":

```jsonc
{
  "scripts": {
    "dev:mp-weixin": "uni -p mp-weixin",
    "build:mp-weixin": "uni build -p mp-weixin",
    "dev:h5": "uni",
    "build:h5": "uni build",
    "dev:h5:ssr": "uni --ssr",       // h5 only
    "build:h5:ssr": "uni build --ssr",
    "type-check": "vue-tsc --noEmit" // TS projects only
  }
}
```

## manifest.json Slimming

| Mode | `manifest.json` behavior |
| --- | --- |
| Full | Outputs all `mp-*` and `h5` config blocks |
| Single | Keeps only the selected platform blocks |

The fewer platforms you pick, the slimmer the generated `manifest.json`, avoiding redundant platform config.

## Next Steps

- [Theming & Preprocessors](./theming) — styling and theme choices