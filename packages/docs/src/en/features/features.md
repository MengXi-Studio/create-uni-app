# Integrations

Beyond the core skeleton, these optional integrations can be added (multi-select):

## Request Wrapper + Auth

A unified `uni.request` wrapper and login auth, including:

- Unified interception and error handling
- Token storage and refresh
- Login guard
- Example API (`src/api/user`) and utilities (`src/utils/request`, `src/utils/auth`)

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

Generates a `src/pages/index` example page demonstrating component usage.

## On-Demand Dependencies

| Feature | dependencies | Description |
| --- | --- | --- |
| uni-ui | `@dcloudio/uni-ui` | easycom on demand |
| request | none | Built on `uni.request` |

Only selected features get their dependencies and code injected; unselected ones are left out.