# 配置持久化

通过 `config` 子命令将模板源持久化为全局默认，团队共享一套模板。

## 用法

```bash
create-uni-app config set ./my-templates   # 持久化为默认模板源
create-uni-app config get                  # 查看当前模板源及配置文件位置
create-uni-app config remove               # 清除，回到内置模板
```

## 存储位置

配置默认保存在用户主目录 `~/.create-uni-app/config.json`。

为兼容沙箱 / 受限环境（无法写家目录）与方便测试：

- 可通过环境变量 `CREATE_UNI_APP_CONFIG_DIR` 显式指定配置目录
- 家目录不可写时自动回退到系统临时目录

## 模板源解析优先级

`--template-source` 参数 > 全局配置 > 内置模板。