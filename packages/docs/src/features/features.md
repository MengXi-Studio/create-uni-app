# 集成项

除核心骨架外，可选集成以下能力（可多选）。只勾选的能力才注入依赖与代码，未勾选一概不带入。

## 请求封装 + 登录鉴权

基于 `uni.request` 的统一请求封装与登录鉴权，生成可直接使用的工具与示例：

| 生成文件 | 作用 |
| --- | --- |
| `src/utils/request` | 统一拦截、错误处理、token 注入 |
| `src/utils/auth` | token 存取与刷新、登录守卫 |
| `src/api/user` | 示例 API |

无需配置即可起步，后续按需扩展。

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

生成 `src/pages/index` 示例页面演示组件用法，模板中使用 `uni-*` 标签即自动按需引入，无需手动 import。

> uni-ui 组件内部样式基于 scss，因此**仅当 CSS 预处理器选为 Sass/Scss 时该选项才可选择**；未选 scss 时会自动禁用。

## 内置主题（可选）

勾选后在下一步挑选色板（默认紫 / 清新蓝 / 自然绿 / 温暖橙），按所选预处理器生成全局主题变量，详见[主题与预处理器](./theming)。

## 依赖按需注入

| 功能 | dependencies | 说明 |
| --- | --- | --- |
| uni-ui | `@dcloudio/uni-ui` | easycom 按需引入 |
| request | 无额外依赖 | 基于 `uni.request` 封装 |

## 下一步

- [模板目录约定](../template/custom-template) — 把团队模板接入脚手架