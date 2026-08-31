# Template Groups & --template

A template group = multiple templates under one root, each containing `base/`. Use it to organize several templates (e.g., admin / shop) in a single template source.

## Directory Structure

```
<template group root>/
├── tpl-shop/   base/  entry/  features/  template.json
└── tpl-admin/  base/  entry/  features/
```

## Selection Flow

```
Resolve template source ──► detect template group ──► --template given?──► yes: use it
                                            └── no: single candidate?──► yes: use automatically
                                                         └── no: interactive select
```

- Passing `--template <name>`: skips prompts and uses that template directly
- Only one candidate: used automatically
- Multiple candidates: enters interactive selection

## Usage

```bash
# Use the admin template from a local template group
create-uni-app my-app --template-source ./.my-template-group --template admin

# Use the shop template from a git template group
create-uni-app my-app --template-source github:owner/templates --template shop
```

> Validation: if the given template name isn't in the group, it errors and lists available templates.
> The built-in template is a single-template form (root contains `base/` directly), so `--template` is not needed.

## Template Source Shapes

| Shape | Detected by | Description |
| --- | --- | --- |
| Single-template | Root contains `base/` directly | The built-in template is this shape |
| Template-group | Multiple sub-dirs under root, each with `base/` | Pick via `--template` or interactively |

## Template Source Resolution Priority

`--template-source` option > global config (`~/.create-uni-app/config.json`) > built-in template.

## Next Steps

- [Template Layout](./custom-template) — the internal structure of a template
- [Persistent Config](../guide/config) — persist the template source