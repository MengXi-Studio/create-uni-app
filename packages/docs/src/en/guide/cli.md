# CLI Reference

The top-level command `create-uni-app` creates a project. Three sub-commands are also provided.

| Command | Purpose |
| --- | --- |
| `create-uni-app [projectName]` | Create a project (top-level) |
| `create-uni-app create` | Add a page in a project |
| `create-uni-app info` | Print environment and project diagnostics |
| `create-uni-app config` | View / set template source config |

## Create a Project (Top-level)

```bash
create-uni-app [projectName] [options]
```

| Option | Description |
| --- | --- |
| `[projectName]` | Project name (optional, editable in prompts) |
| `--uni-version` | Specify the uni-app runtime version (defaults to a built-in value) |
| `--template-source` | Use a custom template source: local path or git repo |
| `--template` | Pick a template within a template group (interactive by default) |

```bash
# Specify the uni-app version
create-uni-app my-app --uni-version 3.0.0-xxx

# Use a local template dir
create-uni-app my-app --template-source ./my-templates

# Use a git template repo (shallow-cloned to a temp dir)
create-uni-app my-app --template-source github:owner/templates
create-uni-app my-app --template-source https://github.com/owner/templates.git
```

> Template source resolution priority: `--template-source` option > global config > built-in template. See [Persistent Config](./config).

You can always align versions after generation via `npx @dcloudio/uvm@latest`.

## create — Add a Page

```bash
create-uni-app create                        # interactive page name
create-uni-app create order-list             # direct page name
create-uni-app create order --subpackage pages-sub   # into a subpackage
```

Auto-detects the project shape and registers routes correctly. See [Create a Page](./create-page).

## info — Diagnose

```bash
create-uni-app info
```

Prints the CLI / Node versions and detects whether the current directory is a uni-app project and whether TS / Sass / Pinia / Vuex / uni-ui are enabled. Attach the `info` output when filing an issue.

## config — Persist Template Source

```bash
create-uni-app config set ./my-templates   # persist as the default template source
create-uni-app config get                  # show the current template source
create-uni-app config remove               # clear and fall back to the built-in template
```

See [Persistent Config](./config).

## Next Steps

- [Create a Page](./create-page) — details of the `create` sub-command
- [Persistent Config](./config) — persist the template source