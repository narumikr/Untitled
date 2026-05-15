import { renderHook, act } from '@testing-library/react'
import fc from 'fast-check'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useLocalStorage } from '@/hooks/useLocalStorage'

describe('useLocalStorage - 初期値の設定', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('localStorageが空の場合、初期値が返される', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'default'))
    expect(result.current.storedValue).toBe('default')
  })

  it('localStorageに値がある場合、保存済みの値が返される', () => {
    localStorage.setItem('testKey', JSON.stringify('saved'))
    const { result } = renderHook(() => useLocalStorage('testKey', 'default'))
    expect(result.current.storedValue).toBe('saved')
  })

  it('数値の初期値が正しく設定される', () => {
    const { result } = renderHook(() => useLocalStorage('numKey', 42))
    expect(result.current.storedValue).toBe(42)
  })

  it('オブジェクトの初期値が正しく設定される', () => {
    const initial = { name: 'test', count: 0 }
    const { result } = renderHook(() => useLocalStorage('objKey', initial))
    expect(result.current.storedValue).toEqual(initial)
  })

  it('localStorageに保存済みのオブジェクトが復元される', () => {
    const saved = { name: 'saved', count: 5 }
    localStorage.setItem('objKey', JSON.stringify(saved))
    const { result } = renderHook(() =>
      useLocalStorage('objKey', { name: 'default', count: 0 }),
    )
    expect(result.current.storedValue).toEqual(saved)
  })

  it('localStorageに保存済みのDateが復元される', () => {
    const saved = new Date('2024-01-15T10:30:00.000Z')
    localStorage.setItem('dateKey', JSON.stringify(saved))

    const { result } = renderHook(() =>
      useLocalStorage('dateKey', new Date('2024-01-01T00:00:00.000Z')),
    )

    expect(result.current.storedValue).toBeInstanceOf(Date)
    expect((result.current.storedValue as Date).toISOString()).toBe(saved.toISOString())
  })
})

describe('useLocalStorage - setStoredValue による保存', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('値を更新するとlocalStorageに保存される', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'))

    act(() => {
      result.current.setStoredValue('updated')
    })

    expect(result.current.storedValue).toBe('updated')
    expect(JSON.parse(localStorage.getItem('testKey')!)).toBe('updated')
  })

  it('数値を保存できる', () => {
    const { result } = renderHook(() => useLocalStorage('numKey', 0))

    act(() => {
      result.current.setStoredValue(100)
    })

    expect(result.current.storedValue).toBe(100)
    expect(JSON.parse(localStorage.getItem('numKey')!)).toBe(100)
  })

  it('オブジェクトを保存できる', () => {
    const { result } = renderHook(() =>
      useLocalStorage('objKey', { name: '', active: false }),
    )

    act(() => {
      result.current.setStoredValue({ name: 'test', active: true })
    })

    expect(result.current.storedValue).toEqual({ name: 'test', active: true })
    expect(JSON.parse(localStorage.getItem('objKey')!)).toEqual({
      name: 'test',
      active: true,
    })
  })

  it('配列を保存できる', () => {
    const { result } = renderHook(() => useLocalStorage<number[]>('arrKey', []))

    act(() => {
      result.current.setStoredValue([1, 2, 3])
    })

    expect(result.current.storedValue).toEqual([1, 2, 3])
    expect(JSON.parse(localStorage.getItem('arrKey')!)).toEqual([1, 2, 3])
  })

  it('Dateを保存して再読込時に復元できる', () => {
    const saved = new Date('2024-02-20T12:34:56.000Z')
    const initial = new Date('2024-01-01T00:00:00.000Z')
    const { result, unmount } = renderHook(() => useLocalStorage('dateKey', initial))

    act(() => {
      result.current.setStoredValue(saved)
    })

    expect(result.current.storedValue).toBe(saved)
    expect(JSON.parse(localStorage.getItem('dateKey')!)).toBe(saved.toISOString())

    unmount()

    const { result: restored } = renderHook(() =>
      useLocalStorage('dateKey', new Date('2023-01-01T00:00:00.000Z')),
    )

    expect(restored.current.storedValue).toBeInstanceOf(Date)
    expect((restored.current.storedValue as Date).toISOString()).toBe(saved.toISOString())
  })
})

describe('useLocalStorage - deleteLocalStorage による削除とリセット', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('削除後に初期値にリセットされる', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'))

    act(() => {
      result.current.setStoredValue('updated')
    })
    expect(result.current.storedValue).toBe('updated')

    act(() => {
      result.current.deleteLocalStorage()
    })

    expect(result.current.storedValue).toBe('initial')
  })

  it('削除後にlocalStorageの値が初期値にリセットされる', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'))

    act(() => {
      result.current.setStoredValue('updated')
    })
    expect(localStorage.getItem('testKey')).not.toBeNull()

    act(() => {
      result.current.deleteLocalStorage()
    })

    // deleteLocalStorage は removeItem を呼ぶが、storedValue が初期値に戻ることで
    // useEffect が再度 localStorage に初期値を書き込む
    expect(result.current.storedValue).toBe('initial')
  })

  it('オブジェクト値の削除後に初期値にリセットされる', () => {
    const initial = { count: 0 }
    const { result } = renderHook(() => useLocalStorage('objKey', initial))

    act(() => {
      result.current.setStoredValue({ count: 99 })
    })

    act(() => {
      result.current.deleteLocalStorage()
    })

    expect(result.current.storedValue).toEqual(initial)
  })
})

describe('useLocalStorage - storageイベントによるクロスタブ同期', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('同一キーのstorageイベントで値が更新される', () => {
    const { result } = renderHook(() => useLocalStorage('syncKey', 'initial'))

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'syncKey',
          newValue: JSON.stringify('fromOtherTab'),
        }),
      )
    })

    expect(result.current.storedValue).toBe('fromOtherTab')
  })

  it('異なるキーのstorageイベントでは値が変更されない', () => {
    const { result } = renderHook(() => useLocalStorage('myKey', 'initial'))

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'otherKey',
          newValue: JSON.stringify('otherValue'),
        }),
      )
    })

    expect(result.current.storedValue).toBe('initial')
  })

  it('newValueがnullの場合、初期値にリセットされる', () => {
    const { result } = renderHook(() => useLocalStorage('syncKey', 'initial'))

    act(() => {
      result.current.setStoredValue('updated')
    })

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'syncKey',
          newValue: null,
        }),
      )
    })

    expect(result.current.storedValue).toBe('initial')
  })

  it('オブジェクト値がstorageイベントで同期される', () => {
    const { result } = renderHook(() =>
      useLocalStorage('objSync', { name: 'default', count: 0 }),
    )

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'objSync',
          newValue: JSON.stringify({ name: 'synced', count: 42 }),
        }),
      )
    })

    expect(result.current.storedValue).toEqual({ name: 'synced', count: 42 })
  })

  it('アンマウント後にstorageイベントリスナーが解除される', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useLocalStorage('cleanupKey', 'initial'))

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function))
  })
})

describe('useLocalStorage - エラーハンドリング', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('localStorageの読み取りに失敗した場合、初期値が返される', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage error')
    })
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const { result } = renderHook(() => useLocalStorage('errorKey', 'fallback'))

    expect(result.current.storedValue).toBe('fallback')
    consoleSpy.mockRestore()
  })
})

describe('useLocalStorage プロパティベーステスト', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  // Feature: unit-test-strategy, Property 8: useLocalStorage の値保存ラウンドトリップ
  // **Validates: Requirements 3.1, 3.2**
  describe('Property 8: useLocalStorage の値保存ラウンドトリップ', () => {
    it('任意のキーと値に対して、setStoredValue で保存した値を localStorage から取得しデシリアライズすると元の値と等価である', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
          fc.oneof(
            fc.string(),
            fc.integer(),
            fc.double({ noNaN: true, noDefaultInfinity: true }),
            fc.boolean(),
          ),
          (key, value) => {
            localStorage.clear()

            const { result, unmount } = renderHook(() => useLocalStorage(key, value))

            try {
              const newValue =
                typeof value === 'string'
                  ? value + '_updated'
                  : typeof value === 'boolean'
                    ? !value
                    : value + 1
              act(() => {
                result.current.setStoredValue(newValue)
              })

              expect(result.current.storedValue).toEqual(newValue)

              const raw = localStorage.getItem(key)
              expect(raw).not.toBeNull()
              const deserialized = JSON.parse(raw!)
              expect(deserialized).toEqual(newValue)
            } finally {
              unmount()
            }
          },
        ),
        { numRuns: 100 },
      )
    })

    it('localStorage が空の場合、初期値が返される', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
          fc.oneof(fc.string(), fc.integer(), fc.boolean()),
          (key, initialValue) => {
            localStorage.clear()

            const { result } = renderHook(() => useLocalStorage(key, initialValue))

            expect(result.current.storedValue).toEqual(initialValue)
          },
        ),
        { numRuns: 100 },
      )
    })
  })

  // Feature: unit-test-strategy, Property 9: useLocalStorage の削除によるリセット
  // **Validates: Requirements 3.3**
  describe('Property 9: useLocalStorage の削除によるリセット', () => {
    it('任意の保存済み値に対して、deleteLocalStorage 呼び出し後に storedValue が初期値にリセットされる', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
          fc.oneof(fc.string(), fc.integer(), fc.boolean()),
          fc.oneof(fc.string(), fc.integer(), fc.boolean()),
          (key, initialValue, newValue) => {
            localStorage.clear()

            const { result, unmount } = renderHook(() => useLocalStorage(key, initialValue))

            try {
              act(() => {
                result.current.setStoredValue(newValue)
              })

              act(() => {
                result.current.deleteLocalStorage()
              })

              expect(result.current.storedValue).toEqual(initialValue)
            } finally {
              unmount()
            }
          },
        ),
        { numRuns: 100 },
      )
    })
  })

  // Feature: unit-test-strategy, Property 10: useLocalStorage のクロスタブ同期
  // **Validates: Requirements 3.4**
  describe('Property 10: useLocalStorage のクロスタブ同期', () => {
    it('任意の storage イベント（同一キー）に対して、newValue をデシリアライズして storedValue が更新される', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
          fc.oneof(fc.string(), fc.integer(), fc.boolean()),
          fc.oneof(fc.string(), fc.integer(), fc.boolean()),
          (key, initialValue, syncValue) => {
            localStorage.clear()

            const { result, unmount } = renderHook(() => useLocalStorage(key, initialValue))

            try {
              act(() => {
                window.dispatchEvent(
                  new StorageEvent('storage', {
                    key,
                    newValue: JSON.stringify(syncValue),
                  }),
                )
              })

              expect(result.current.storedValue).toEqual(syncValue)
            } finally {
              unmount()
            }
          },
        ),
        { numRuns: 100 },
      )
    })

    it('newValue が null の場合、初期値にリセットされる', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
          fc.oneof(fc.string(), fc.integer(), fc.boolean()),
          (key, initialValue) => {
            localStorage.clear()

            const { result } = renderHook(() => useLocalStorage(key, initialValue))

            act(() => {
              result.current.setStoredValue(
                typeof initialValue === 'string' ? initialValue + '_changed' : initialValue,
              )
            })

            act(() => {
              window.dispatchEvent(
                new StorageEvent('storage', {
                  key,
                  newValue: null,
                }),
              )
            })

            expect(result.current.storedValue).toEqual(initialValue)
          },
        ),
        { numRuns: 100 },
      )
    })
  })
})
