# Integrations

Beyond the core skeleton, these optional integrations can be added (multi-select). Only selected ones bring in dependencies and code; unselected ones are left out.

## Request Wrapper + Auth

A unified `uni.request` wrapper and login auth, generating ready-to-use utilities and examples:

| Generated file | Purpose |
| --- | --- |
| `src/utils/request` | Unified interception, error handling, token injection |
| `src/utils/auth` | Token storage and refresh, login guard |
| `src/api/user` | Example API |

Just works from the start; extend as needed.

## uni-ui Component Library

Integrates `@dcloudio/uni-ui` via **easycom** on-demand in `pages.json`:

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

Generates a `src/pages/index` example page. Using `uni-*` tags in templates auto-imports on demand — no manual imports.

## On-Demand Dependencies

| Feature | dependencies | Description |
| --- | --- | --- |
| uni-ui | `@dcloudio/uni-ui` | easycom on demand |
| request | none | Built on `uni.request` |

## Next Steps

- [Template Layout](../template/custom-template) — plug your team templates into the scaffold