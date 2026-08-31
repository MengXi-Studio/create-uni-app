# 命令参考

顶层命令 `create-uni-app` 用于创建项目，另提供三个子命令。

## 创建参数

```bash
create-uni-app [projectName] [options]
```

| 参数/选项 | 说明 |
| --- | --- |
| `[projectName]` | 项目名称（可选，问答中仍可修改） |
| `--uni-version` | 指定 uni-app 运行时版本号，缺省用内置默认值 |
| `--template-source` | 使用自定义模板源：本地目录路径或 git 仓库 |
| `--template` | 在模板组中选择具体模板（缺省交互选择） |

```bash
# 指定 uni-app 版本
create-uni-app my-app --uni-version 3.0.0-xxx

# 使用本地模板目录
create-uni-app my-app --template-source ./my-templates

# 使用 git 模板仓库（自动浅克隆到临时目录）
create-uni-app my-app --template-source github:owner/templates
create-uni-app my-app --template-source https://github.com/owner/templates.git
```

缺省 uni-app 版本可在生成后执行 `npx @dcloudio/uvm@latest` 对齐官方最新。

## create —— 新建页面

```bash
create-uni-app create                        # 交互输入页面名
create-uni-app create order-list             # 直接指定页面名
create-uni-app create order --subpackage pages-sub   # 建到 pages-sub 分包
```

详见 [创建页面](./create-page)。

## info —— 诊断

```bash
create-uni-app info
```

打印 CLI / Node 版本，并检测当前目录是否为 uni-app 项目及是否启用 TS / Sass / Pinia / Vuex / uni-ui。

## config —— 持久化模板源

```bash
create-uni-app config set ./my-templates   # 持久化为默认模板源
create-uni-app config get                  # 查看当前模板源
create-uni-app config remove               # 清除，回到内置模板
```

详见 [配置持久化](./../template/config)。