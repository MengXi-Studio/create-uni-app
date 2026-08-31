# 多平台支持

支持全部 uni-app 编译平台，全端模式下会额外生成 `dev:custom`、`dev:h5:ssr` 等脚本（对齐官方模板）。

## 平台列表

| 分组 | 平台 |
| --- | --- |
| 全端 | 全部平台（推荐） |
| H5/App | `h5`、`app` |
| 小程序 | 微信 `mp-weixin`、支付宝 `mp-alipay`、百度 `mp-baidu`、抖音 `mp-toutiao`、QQ `mp-qq`、飞书 `mp-lark`、京东 `mp-jd`、快手 `mp-kuaishou`、小红书 `mp-xhs` |
| 快应用 | 通用 `quickapp-webview`、华为 `quickapp-webview-huawei`、联盟 `quickapp-webview-union` |

## 分组快捷项

多选平台时提供「全部端 / 小程序(全部) / 快应用(全部)」快捷项：

- **全部端**：勾选后等价于全量平台
- **小程序(全部)**：展开为 `mp-*` 全部
- **快应用(全部)**：展开为 `quickapp-*` 全部

勾选分组项后由生成引擎展开为组内具体平台。

## 脚本生成

- **全量**（选「全部端」）：输出所有平台的 `dev:*` / `build:*` 脚本及 custom、SSR 脚本
- **单选**：只保留所选平台，`h5` 额外带 SSR 脚本
- **TS 场景**：追加 `type-check`(`vue-tsc --noEmit`)

## manifest.json 精简

`manifest.json` 按所选平台注入对应配置块，全量输出全部 `mp-*` 与 `h5` 配置，单选时只保留所选平台，避免冗余。