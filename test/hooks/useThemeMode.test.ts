import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useThemeMode, LIGHT_MODE, DARK_MODE } from '@/hooks/useThemeMode'

type MatchMediaMock = {
  matches: boolean
  media: string
  onchange: null
  addListener: ReturnType<typeof vi.fn>
  removeListener: ReturnType<typeof vi.fn>
  addEventListener: ReturnType<typeof vi.fn>
  removeEventListener: ReturnType<typeof vi.fn>
  dispatchEvent: ReturnType<typeof vi.fn>
}

const createMatchMediaMock = (matches: boolean): MatchMediaMock => ({
  matches,
  media: '(prefers-color-scheme: dark)',
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
})

describe('useThemeMode', () => {
  let matchMediaMock: MatchMediaMock

  beforeEach(() => {
    vi.restoreAllMocks()
    matchMediaMock = createMatchMediaMock(false)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue(matchMediaMock),
    })
  })

  describe('ライトモード判定', () => {
    it('prefers-color-scheme: dark が false の場合、light を返す', () => {
      const { result } = renderHook(() => useThemeMode())
      expect(result.current).toBe(LIGHT_MODE)
    })

    it('初期状態（isDarkMode が null）では light を返す', () => {
      // matchMedia がまだ呼ばれる前の初期レンダリングでは LIGHT_MODE
      const { result } = renderHook(() => useThemeMode())
      expect(result.current).toBe(LIGHT_MODE)
    })
  })

  describe('ダークモード判定', () => {
    it('prefers-color-scheme: dark が true の場合、dark を返す', () => {
      matchMediaMock = createMatchMediaMock(true)
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockReturnValue(matchMediaMock),
      })

      const { result } = renderHook(() => useThemeMode())
      expect(result.current).toBe(DARK_MODE)
    })
  })

  describe('メディアクエリ変更の監視', () => {
    it('change イベントリスナーが登録される', () => {
      renderHook(() => useThemeMode())
      expect(matchMediaMock.addEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function),
      )
    })

    it('ダークモードへの変更イベントで dark に切り替わる', () => {
      const { result } = renderHook(() => useThemeMode())
      expect(result.current).toBe(LIGHT_MODE)

      const changeHandler = matchMediaMock.addEventListener.mock.calls.find(
        (call: [string, unknown]) => call[0] === 'change',
      )?.[1] as (event: MediaQueryListEvent) => void

      act(() => {
        changeHandler({ matches: true } as MediaQueryListEvent)
      })

      expect(result.current).toBe(DARK_MODE)
    })

    it('ライトモードへの変更イベントで light に切り替わる', () => {
      matchMediaMock = createMatchMediaMock(true)
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockReturnValue(matchMediaMock),
      })

      const { result } = renderHook(() => useThemeMode())
      expect(result.current).toBe(DARK_MODE)

      const changeHandler = matchMediaMock.addEventListener.mock.calls.find(
        (call: [string, unknown]) => call[0] === 'change',
      )?.[1] as (event: MediaQueryListEvent) => void

      act(() => {
        changeHandler({ matches: false } as MediaQueryListEvent)
      })

      expect(result.current).toBe(LIGHT_MODE)
    })

    it('アンマウント時にイベントリスナーが解除される', () => {
      const { unmount } = renderHook(() => useThemeMode())

      const changeHandler = matchMediaMock.addEventListener.mock.calls.find(
        (call: [string, unknown]) => call[0] === 'change',
      )?.[1] as (event: MediaQueryListEvent) => void

      unmount()

      expect(matchMediaMock.removeEventListener).toHaveBeenCalledWith(
        'change',
        changeHandler,
      )
    })
  })

  describe('エクスポート定数', () => {
    it('LIGHT_MODE は "light" である', () => {
      expect(LIGHT_MODE).toBe('light')
    })

    it('DARK_MODE は "dark" である', () => {
      expect(DARK_MODE).toBe('dark')
    })
  })
})
