# 模板组与 --template

模板组 = 根目录下多个模板，每个子目录含 `base/`：

```
<模板组根>/
├── tpl-shop/   base/  entry/  features/  template.json
└── tpl-admin/  base/  entry/  features/
```

创建时用 `--template` 指定或在交互中选择一个；只有一个候选项时自动使用。

```bash
# 从本地模板组中用 admin 模板
create-uni-app my-app --template-source ./.my-template-group --template admin

# 从 git 模板组中用 shop 模板
create-uni-app my-app --template-source github:owner/templates --template shop
```

> 校验：指定的模板名不在模板组中会报错，并列出可用模板。
> 内置模板为单模板形态（根目录直接含 `base/`），无需使用 `--template`。

## 模板源形态

- **单模板模式**：根目录直接含 `base/`
- **模板组模式**：根目录下多个子目录含 `base/`

## 模板源解析优先级

`--template-source` 参数 > 全局配置（`~/.create-uni-app/config.json`）> 内置模板。