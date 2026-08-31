# 模板组与 --template

模板组 = 根目录下多个模板，每个子目录含 `base/`。用于在一个模板源里组织多套模板（如 admin / shop）。

## 目录结构

```
<模板组根>/
├── tpl-shop/   base/  entry/  features/  template.json
└── tpl-admin/  base/  entry/  features/
```

## 选择流程

```
解析模板源 ──► 识别为模板组 ──► 指定 --template？──► 是：直接使用
                                        └── 否：候选唯一？──► 是：自动使用
                                                    └── 否：交互选择
```

- 传入 `--template <name>`：跳过交互，直接使用该模板
- 只有一个候选：自动使用
- 多个候选：进入交互选择

## 用法

```bash
# 从本地模板组中用 admin 模板
create-uni-app my-app --template-source ./.my-template-group --template admin

# 从 git 模板组中用 shop 模板
create-uni-app my-app --template-source github:owner/templates --template shop
```

> 校验：指定的模板名不在模板组中会报错，并列出可用模板。
> 内置模板为单模板形态（根目录直接含 `base/`），无需使用 `--template`。

## 模板源形态

| 形态 | 判定 | 说明 |
| --- | --- | --- |
| 单模板模式 | 根目录直接含 `base/` | 内置模板即此形态 |
| 模板组模式 | 根目录下多个子目录含 `base/` | 用 `--template` 或交互选择 |

## 模板源解析优先级

`--template-source` 参数 > 全局配置（`~/.create-uni-app/config.json`）> 内置模板。

## 下一步

- [模板目录约定](./custom-template) — 模板内部结构
- [配置持久化](../guide/config) — 持久化模板源