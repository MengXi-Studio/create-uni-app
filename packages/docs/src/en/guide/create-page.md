# Create a Page

`create-uni-app create` adds a new page to the current uni-app project, automatically adapting to the project shape.

## Usage

```bash
create-uni-app create                        # interactive page name
create-uni-app create order-list             # direct page name
create-uni-app create order --subpackage pages-sub   # into a subpackage
```

## Auto Detection

When creating, the CLI detects:

- **Script language**: TS / JS
- **CSS preprocessor**: scss / less / stylus / css
- **Subpackages**: whether `src/pages-sub` exists
- **Router scheme**: traditional / manual uni-router / generatePages / generateUni

## Route Registry

- **Traditional**: registered in `src/pages.json` (main `pages` or subpackage `subPackages`)
- **Manual uni-router**: appends a route entry to `src/router.config`
- **generatePages / generateUni**: page file only; `pages.json` is auto-registered by the plugin
- When subpackages exist, you choose the target interactively; duplicate registrations are deduplicated

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