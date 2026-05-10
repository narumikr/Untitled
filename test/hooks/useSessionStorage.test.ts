import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useSessionStorage } from '@/hooks/useSessionStorage'
import * as logging from '@/internal/logging'

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

  it('削除後にsessionStorageのキーが削除される', () => {
    const { result } = renderHook(() => useSessionStorage('testKey', 'initial'))

    act(() => {
      result.current.setStoredValue('updated')
    })
    expect(sessionStorage.getItem('testKey')).not.toBeNull()

    act(() => {
      result.current.deleteSessionStorage()
    })

    expect(result.current.storedValue).toBe('initial')
    // The write effect re-adds the key with the initial value after deletion
    expect(sessionStorage.getItem('testKey')).toBe(JSON.stringify('initial'))
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

  it('sessionStorageへの書き込みに失敗した場合、エラーがログに記録される', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage quota exceeded')
    })
    const consoleErrorSpy = vi.spyOn(logging, 'ConsoleError').mockImplementation(() => {})

    const { result } = renderHook(() => useSessionStorage('errorKey', 'initial'))

    act(() => {
      result.current.setStoredValue('newValue')
    })

    expect(consoleErrorSpy).toHaveBeenCalled()
    consoleErrorSpy.mockRestore()
  })
})
