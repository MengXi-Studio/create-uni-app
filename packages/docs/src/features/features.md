# 可选功能

除核心骨架外，可选装以下功能（可多选）：

## 请求封装 + 登录鉴权

基于 `uni.request` 的统一请求封装与登录鉴权，包含：

- 统一拦截、错误处理
- token 存取与刷新
- 登录守卫
- 示例 API（`src/api/user`）与工具（`src/utils/request`、`src/utils/auth`）

## uni-ui 组件库

集成 `@dcloudio/uni-ui`，通过 `pages.json` 的 **easycom 按需引入**：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
    }
  }
}
```

生成 `src/pages/index` 示例页面演示组件用法。

## 依赖按需注入

| 功能 | dependencies | 说明 |
| --- | --- | --- |
| uni-ui | `@dcloudio/uni-ui` | easycom 按需引入 |
| request | 无额外依赖 | 基 / `uni.request` 封装 |

只勾选的功能才注入依赖与代码，不勾选则不携带。