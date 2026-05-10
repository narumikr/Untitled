# Storage Hooks Simplification Design

**Date:** 2026-05-10
**Branch:** feature/update-sharedvalue-provider

## Background

`useLocalStorage` and `useSessionStorage` currently use `deserializeDataWithTemplate<T>` to restore serialized data. This approach is complex, has known bugs (null template, type parameter inference), and is not tested. The goal is to remove the template-based deserialization and simplify all storage hooks to use plain `JSON.stringify` / `JSON.parse`.

## Scope

### Files to modify

| File | Change |
|---|---|
| `src/utils/serialization.ts` | Remove `deserializeDataWithTemplate`, `deserializeDateWithTemplate`, `deserializeArrayWithTemplate`, `deserializeObjectWithTemplate` |
| `src/hooks/useLocalStorage.ts` | Replace `serializeData` + `deserializeDataWithTemplate` with `JSON.stringify` / `JSON.parse` |
| `src/hooks/useSessionStorage.ts` | Same as above |
| `src/components/provider/SharedValueProvider.tsx` | No functional change needed; inherits simplification from `useSessionStorage` |

### Files not modified

- `src/utils/serialization.ts` — `serializeData`, `deserializeData`, `isValidDateString`, and their internal helpers are preserved.

## Design

### Serialization utilities

Remove the four template-based functions from `serialization.ts`:

- `deserializeDataWithTemplate` (exported)
- `deserializeDateWithTemplate` (internal)
- `deserializeArrayWithTemplate` (internal)
- `deserializeObjectWithTemplate` (internal)

The remaining public API of `serialization.ts` becomes:

```
serializeData     — Date → ISO string, recursive
deserializeData   — ISO string → Date, heuristic, recursive
isValidDateString — validates ISO 8601 date strings
```

### Storage hooks

Both hooks simplify to the same pattern:

**Save:** `storage.setItem(key, JSON.stringify(value))`
**Load:** `JSON.parse(storage.getItem(key))`

No special Date serialization. If a caller needs Date objects, they convert explicitly after loading.

The `StorageEvent` listener in `useLocalStorage` also switches to plain `JSON.parse`.

### SharedValueProvider

No change to props, context shape, or behavior. The provider uses `useSessionStorage` internally; the simplification propagates automatically.

## Trade-offs

| Concern | Decision |
|---|---|
| Date round-trip | Dropped. Storing and restoring Dates is the caller's responsibility. |
| Removal of `serializeData` from hooks | Removed. Plain `JSON.stringify` is sufficient and more predictable. |
| `deserializeData` kept in serialization.ts | Kept. It has independent utility and existing tests. |

## Out of scope

- Adding new utility functions for localStorage (decided against — hooks are sufficient)
- Changing `SharedValueProvider` props or storage backend (stays on sessionStorage)
- Updating `YourSekaiProvider` or any other consumer of `useLocalStorage`
