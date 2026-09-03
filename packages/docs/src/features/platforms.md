# 多平台支持

支持全部 uni-app 编译平台。选择平台后，`package.json` 的 `dev:*` / `build:*` 脚本与 `manifest.json` 配置会**按所选平台精简生成**，全端模式则会额外生成 `dev:custom`、`dev:h5:ssr` 等脚本（对齐官方模板）。

## 平台列表

| 分组 | 平台 |
| --- | --- |
| 全端 | 全部平台（推荐） |
| H5/App | `h5`、`app` |
| 小程序 | 微信 `mp-weixin`、支付宝 `mp-alipay`、百度 `mp-baidu`、抖音 `mp-toutiao`、QQ `mp-qq`、飞书 `mp-lark`、京东 `mp-jd`、快手 `mp-kuaishou`、小红书 `mp-xhs` |
| 快应用 | 通用 `quickapp-webview`、华为 `quickapp-webview-huawei`、联盟 `quickapp-webview-union` |

## 分组快捷项

多选平台时提供三个快捷项，勾选后由生成引擎展开为组内具体平台。分组快捷项与具体平台**互斥**：选中某个快捷项后，其覆盖的具体平台（及更大范围的选择）会自动禁用，避免重复勾选。

| 快捷项 | 展开为 |
| --- | --- |
| 全部端 | 全部平台 |
| 小程序(全部) | 全部 `mp-*` |
| 快应用(全部) | 全部 `quickapp-*` |

## 脚本生成

- **全量**（选「全部端」）：输出所有平台的 `dev:*` / `build:*` 脚本及 custom、SSR 脚本
- **单选**：只保留所选平台，`h5` 额外带 SSR 脚本
- **TS 场景**：追加 `type-check`（`vue-tsc --noEmit`）

以单选「微信小程序 + H5」为例，生成的脚本：

```jsonc
{
  "scripts": {
    "dev:mp-weixin": "uni -p mp-weixin",
    "build:mp-weixin": "uni build -p mp-weixin",
    "dev:h5": "uni",
    "build:h5": "uni build",
    "dev:h5:ssr": "uni --ssr",       // h5 专属
    "build:h5:ssr": "uni build --ssr",
    "type-check": "vue-tsc --noEmit" // 仅 TS 项目
  }
}
```

## manifest.json 精简

| 模式 | `manifest.json` 行为 |
| --- | --- |
| 全量 | 输出全部 `mp-*` 与 `h5` 配置块 |
| 单选 | 只保留所选平台配置块 |

选择越少，生成的 `manifest.json` 越精简，避免冗余平台配置。

## 下一步

- [主题与预处理器](./theming) — 样式与主题选型