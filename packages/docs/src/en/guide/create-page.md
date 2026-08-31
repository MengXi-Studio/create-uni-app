# Create a Page

`create-uni-app create` adds a new page to the current uni-app project, automatically adapting to the project shape.

## Usage

```bash
create-uni-app create                        # interactive page name
create-uni-app create order-list             # direct page name
create-uni-app create order --subpackage pages-sub   # into a subpackage
```

## How It Works

When creating, the CLI auto-detects the project shape, then generates a matching page and registers it:

```
Detect project ──► resolve page name ──► generate .vue file ──► register route (per shape) ──► print result
```

## Auto Detection

| Detected item | Values |
| --- | --- |
| Script language | TS / JS |
| CSS preprocessor | scss / less / stylus / css |
| Subpackages | whether `src/pages-sub` exists |
| Router scheme | traditional / manual uni-router / generatePages / generateUni |

## Route Registry

| Project shape | Behavior |
| --- | --- |
| Traditional | Registered in `src/pages.json` (main `pages` or subpackage `subPackages`) |
| Manual uni-router | Appends a route entry to `src/router.config` |
| generatePages / generateUni | Page file only; `pages.json` auto-registered by the plugin |

When subpackages exist, you choose the target interactively; duplicate registrations are deduplicated.

## --subpackage Option

Create the page into a specific subpackage:

```bash
create-uni-app create <pageName> --subpackage <root>
```

| Detail | Content |
| --- | --- |
| `<root>` | Subpackage root dir name, located at `src/<root>/` |
| Default | If not set, falls back to the main package `src/pages/` |
| Interactive | When subpackages exist, asks main package vs subpackage |
| Validation | Errors out if the given `<root>` does not exist |

### Example

```bash
# Create into the src/pages-sub/ subpackage
create-uni-app create order --subpackage pages-sub
```

Generates:

```
src/pages-sub/
└── order/
    └── order.vue
```

And appends a registration to `subPackages` in `pages.json` (also appends to `router.config` under the manual uni-router scheme).

## Next Steps

- [CLI Reference](./cli) — other commands and options