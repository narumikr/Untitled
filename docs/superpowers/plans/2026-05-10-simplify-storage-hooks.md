# Storage Hooks Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `deserializeDataWithTemplate` と関連する template-based deserialization を `serialization.ts` から削除し、`useLocalStorage` / `useSessionStorage` を plain `JSON.stringify` / `JSON.parse` に置き換える。

**Architecture:** まず hooks を plain JSON に切り替え（`deserializeDataWithTemplate` への依存を断つ）、最後に `serialization.ts` から template 関数を削除する。この順序により、各コミット後もビルドが通り続ける。`SharedValueProvider` は `useSessionStorage` を内部で使うため、コード変更なしで自動的に恩恵を受ける。

**Tech Stack:** TypeScript, React, Vitest, @testing-library/react

---

### Task 1: `useLocalStorage.ts` をシンプル化する

**Files:**
- Modify: `src/hooks/useLocalStorage.ts`
- Test: `test/hooks/useLocalStorage.test.ts` (変更なし)

- [ ] **Step 1: 既存テストが通ることを確認する**

```bash
npx vitest run test/hooks/useLocalStorage.test.ts
```

Expected: 全テスト PASS

- [ ] **Step 2: `useLocalStorage.ts` を書き換える**

`src/hooks/useLocalStorage.ts` の内容を以下で置き換える:

```typescript
import { useCallback, useEffect, useRef, useState } from 'react'

import { ConsoleError } from '@/internal/logging'

export const useLocalStorage = <T>(localStorageKey: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current) return
    isInitialized.current = true

    try {
      const items = localStorage.getItem(localStorageKey)
      if (items) {
        setStoredValue(JSON.parse(items) as T)
      }
    } catch (err) {
      ConsoleError('Failed to get local storage value : ', err)
    }
  }, [initialValue, localStorageKey])

  useEffect(() => {
    if (!isInitialized.current) return

    try {
      localStorage.setItem(localStorageKey, JSON.stringify(storedValue))
    } catch (err) {
      ConsoleError('Failed to set local storage : ', err)
    }
  }, [localStorageKey, storedValue])

  useEffect(() => {
    const updateLocalStorage = (e: StorageEvent) => {
      try {
        if (e.key !== localStorageKey) return

        if (e.newValue === null) {
          setStoredValue(initialValue)
        } else {
          setStoredValue(JSON.parse(e.newValue) as T)
        }
      } catch (err) {
        ConsoleError('Failed to set local storage : ', err)
      }
    }

    window.addEventListener('storage', updateLocalStorage)

    return () => window.removeEventListener('storage', updateLocalStorage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteLocalStorage = useCallback(() => {
    setStoredValue(initialValue)
    localStorage.removeItem(localStorageKey)
  }, [initialValue, localStorageKey])

  return {
    storedValue,
    setStoredValue,
    deleteLocalStorage,
  }
}
```

- [ ] **Step 3: テストが通ることを確認する**

```bash
npx vitest run test/hooks/useLocalStorage.test.ts
```

Expected: 全テスト PASS

- [ ] **Step 4: コミット**

```bash
git add src/hooks/useLocalStorage.ts
git commit -m "refactor: simplify useLocalStorage to use plain JSON.parse/stringify"
```

---

### Task 2: `useSessionStorage.ts` のテストを書いてシンプル化する

**Files:**
- Create: `test/hooks/useSessionStorage.test.ts`
- Modify: `src/hooks/useSessionStorage.ts`

- [ ] **Step 1: テストファイルを作成する**

`test/hooks/useSessionStorage.test.ts` を以下の内容で作成する:

```typescript
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useSessionStorage } from '@/hooks/useSessionStorage'

describe('useSessionStorage - 初期値の設定', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.restoreAllMocks()
  })

  it('sessionStorageが空の場合、初期値が返される', () => {
    const { result } = renderHook(() => useSessionStorage('testKey', 'default'))
    expect(result.current.storedValue).toBe('default')
  })

  it('sessionStorageに値がある場合、保存済みの値が返される', () => {
    sessionStorage.setItem('testKey', JSON.stringify('saved'))
    const { result } = renderHook(() => useSessionStorage('testKey', 'default'))
    expect(result.current.storedValue).toBe('saved')
  })

  it('数値の初期値が正しく設定される', () => {
    const { result } = renderHook(() => useSessionStorage('numKey', 42))
    expect(result.current.storedValue).toBe(42)
  })

  it('オブジェクトの初期値が正しく設定される', () => {
    const initial = { name: 'test', count: 0 }
    const { result } = renderHook(() => useSessionStorage('objKey', initial))
    expect(result.current.storedValue).toEqual(initial)
  })

  it('sessionStorageに保存済みのオブジェクトが復元される', () => {
    const saved = { name: 'saved', count: 5 }
    sessionStorage.setItem('objKey', JSON.stringify(saved))
    const { result } = renderHook(() =>
      useSessionStorage('objKey', { name: 'default', count: 0 }),
    )
    expect(result.current.storedValue).toEqual(saved)
  })
})

describe('useSessionStorage - setStoredValue による保存', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.restoreAllMocks()
  })

  it('値を更新するとsessionStorageに保存される', () => {
    const { result } = renderHook(() => useSessionStorage('testKey', 'initial'))

    act(() => {
      result.current.setStoredValue('updated')
    })

    expect(result.current.storedValue).toBe('updated')
    expect(JSON.parse(sessionStorage.getItem('testKey')!)).toBe('updated')
  })

  it('数値を保存できる', () => {
    const { result } = renderHook(() => useSessionStorage('numKey', 0))

    act(() => {
      result.current.setStoredValue(100)
    })

    expect(result.current.storedValue).toBe(100)
    expect(JSON.parse(sessionStorage.getItem('numKey')!)).toBe(100)
  })

  it('オブジェクトを保存できる', () => {
    const { result } = renderHook(() =>
      useSessionStorage('objKey', { name: '', active: false }),
    )

    act(() => {
      result.current.setStoredValue({ name: 'test', active: true })
    })

    expect(result.current.storedValue).toEqual({ name: 'test', active: true })
    expect(JSON.parse(sessionStorage.getItem('objKey')!)).toEqual({
      name: 'test',
      active: true,
    })
  })

  it('配列を保存できる', () => {
    const { result } = renderHook(() => useSessionStorage<number[]>('arrKey', []))

    act(() => {
      result.current.setStoredValue([1, 2, 3])
    })

    expect(result.current.storedValue).toEqual([1, 2, 3])
    expect(JSON.parse(sessionStorage.getItem('arrKey')!)).toEqual([1, 2, 3])
  })
})

describe('useSessionStorage - deleteSessionStorage による削除とリセット', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.restoreAllMocks()
  })

  it('削除後に初期値にリセットされる', () => {
    const { result } = renderHook(() => useSessionStorage('testKey', 'initial'))

    act(() => {
      result.current.setStoredValue('updated')
    })
    expect(result.current.storedValue).toBe('updated')

    act(() => {
      result.current.deleteSessionStorage()
    })

    expect(result.current.storedValue).toBe('initial')
  })

  it('オブジェクト値の削除後に初期値にリセットされる', () => {
    const initial = { count: 0 }
    const { result } = renderHook(() => useSessionStorage('objKey', initial))

    act(() => {
      result.current.setStoredValue({ count: 99 })
    })

    act(() => {
      result.current.deleteSessionStorage()
    })

    expect(result.current.storedValue).toEqual(initial)
  })
})

describe('useSessionStorage - エラーハンドリング', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.restoreAllMocks()
  })

  it('sessionStorageの読み取りに失敗した場合、初期値が返される', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage error')
    })
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const { result } = renderHook(() => useSessionStorage('errorKey', 'fallback'))

    expect(result.current.storedValue).toBe('fallback')
    consoleSpy.mockRestore()
  })
})
```

- [ ] **Step 2: テストを実行して現在の実装でも通ることを確認する**

```bash
npx vitest run test/hooks/useSessionStorage.test.ts
```

Expected: 全テスト PASS

- [ ] **Step 3: `useSessionStorage.ts` を書き換える**

`src/hooks/useSessionStorage.ts` の内容を以下で置き換える:

```typescript
import { useCallback, useEffect, useRef, useState } from 'react'

import { ConsoleError } from '@/internal/logging'

export const useSessionStorage = <T>(sessionStorageKey: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current) return
    isInitialized.current = true

    try {
      const items = sessionStorage.getItem(sessionStorageKey)
      if (items) {
        setStoredValue(JSON.parse(items) as T)
      }
    } catch (err) {
      ConsoleError('Failed to get session storage value : ', err)
    }
  }, [initialValue, sessionStorageKey])

  useEffect(() => {
    if (!isInitialized.current) return

    try {
      sessionStorage.setItem(sessionStorageKey, JSON.stringify(storedValue))
    } catch (err) {
      ConsoleError('Failed to set session storage : ', err)
    }
  }, [sessionStorageKey, storedValue])

  const deleteSessionStorage = useCallback(() => {
    setStoredValue(initialValue)
    sessionStorage.removeItem(sessionStorageKey)
  }, [initialValue, sessionStorageKey])

  return {
    storedValue,
    setStoredValue,
    deleteSessionStorage,
  }
}
```

- [ ] **Step 4: テストが通ることを確認する**

```bash
npx vitest run test/hooks/useSessionStorage.test.ts
```

Expected: 全テスト PASS

- [ ] **Step 5: コミット**

```bash
git add test/hooks/useSessionStorage.test.ts src/hooks/useSessionStorage.ts
git commit -m "refactor: simplify useSessionStorage to use plain JSON.parse/stringify"
```

---

### Task 3: `serialization.ts` から template-based 関数を削除する

**Files:**
- Modify: `src/utils/serialization.ts`
- Test: `test/utils/serialization.test.ts` (変更なし)

この時点で `useLocalStorage.ts` と `useSessionStorage.ts` はすでに `deserializeDataWithTemplate` を import していないため、安全に削除できる。

- [ ] **Step 1: `src/utils/serialization.ts` から以下の4関数を削除する**

削除対象のブロック:
1. `export const deserializeDataWithTemplate` (L55〜L81、`// For deserializeDataWithTemplate start` コメントの手前まで)
2. `const deserializeDateWithTemplate` (L219〜L230)
3. `const deserializeArrayWithTemplate` (L232〜L259)
4. `const deserializeObjectWithTemplate` (L261〜L289)
5. `// For deserializeDataWithTemplate start` / `// For deserializeDataWithTemplate end` コメント

削除後に残る公開 API:
- `serializeData`
- `deserializeData`
- `isValidDateString`

- [ ] **Step 2: 全テストスイートを実行して回帰がないことを確認する**

```bash
npx vitest run
```

Expected: 全テスト PASS

- [ ] **Step 3: ビルドを実行する**

```bash
npm run build
```

Expected: ビルド成功（エラーなし）

- [ ] **Step 4: コミット**

```bash
git add src/utils/serialization.ts
git commit -m "refactor: remove template-based deserialization from serialization.ts"
```
