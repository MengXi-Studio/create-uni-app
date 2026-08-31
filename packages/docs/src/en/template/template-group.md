# Template Groups & --template

A template group = multiple templates under one root, each with `base/`:

```
<template group root>/
├── tpl-shop/   base/  entry/  features/  template.json
└── tpl-admin/  base/  entry/  features/
```

When creating, use `--template` to pick one, or select it interactively. A single candidate is auto-selected.

```bash
# Use the admin template from a local template group
create-uni-app my-app --template-source ./.my-template-group --template admin

# Use the shop template from a git template group
create-uni-app my-app --template-source github:owner/templates --template shop
```

> Validation: if the given template name isn't in the group, it errors and lists available templates.
> The built-in template is a single-template form (root contains `base/` directly), so `--template` is not needed.

## Template Source Shapes

- **Single-template mode**: root contains `base/` directly
- **Template-group mode**: multiple sub-directories under the root, each with `base/`

## Resolution Priority

`--template-source` option > global config (`~/.create-uni-app/config.json`) > built-in template.