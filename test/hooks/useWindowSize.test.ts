import { renderHook, act } from '@testing-library/react'
import fc from 'fast-check'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useInnerSize, useOrientation, ORIENTATION } from '@/hooks/useWindowSize'

describe('useInnerSize', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    Object.defineProperty(document.documentElement, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  it('初期値としてウィンドウ幅を返す', () => {
    const { result } = renderHook(() => useInnerSize())
    expect(result.current).toBe(1024)
  })

  it('window.innerWidth と clientWidth の小さい方を返す', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    })
    Object.defineProperty(document.documentElement, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    const { result } = renderHook(() => useInnerSize())
    expect(result.current).toBe(800)
  })

  it('clientWidth が innerWidth より小さい場合、clientWidth を返す', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    Object.defineProperty(document.documentElement, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 900,
    })

    const { result } = renderHook(() => useInnerSize())
    expect(result.current).toBe(900)
  })

  it('resize イベントで値が更新される', () => {
    const { result } = renderHook(() => useInnerSize())
    expect(result.current).toBe(1024)

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      })
      Object.defineProperty(document.documentElement, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 500,
      })
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current).toBe(500)
  })

  it('複数回の resize イベントに追従する', () => {
    const { result } = renderHook(() => useInnerSize())

    const sizes = [640, 1280, 375]
    for (const size of sizes) {
      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: size,
        })
        Object.defineProperty(document.documentElement, 'clientWidth', {
          writable: true,
          configurable: true,
          value: size,
        })
        window.dispatchEvent(new Event('resize'))
      })
      expect(result.current).toBe(size)
    }
  })

  it('アンマウント時に resize イベントリスナーが解除される', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    const removeSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useInnerSize())
    const handler = addSpy.mock.calls[0]?.[1] as EventListener
    expect(typeof handler).toBe('function')

    unmount()
    expect(removeSpy).toHaveBeenCalledWith('resize', handler)

    addSpy.mockRestore()
    removeSpy.mockRestore()
  })
})

describe('useOrientation', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('ウィンドウ幅が 768px 以下の場合、PORTRAIT を返す', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    })
    Object.defineProperty(document.documentElement, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 768,
    })

    const { result } = renderHook(() => useOrientation())
    expect(result.current).toBe(ORIENTATION.PORTRAIT)
  })

  it('ウィンドウ幅が 768px 未満の場合、PORTRAIT を返す', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })
    Object.defineProperty(document.documentElement, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })

    const { result } = renderHook(() => useOrientation())
    expect(result.current).toBe(ORIENTATION.PORTRAIT)
  })

  it('ウィンドウ幅が 769px 以上の場合、LANDSCAPE を返す', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 769,
    })
    Object.defineProperty(document.documentElement, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 769,
    })

    const { result } = renderHook(() => useOrientation())
    expect(result.current).toBe(ORIENTATION.LANDSCAPE)
  })

  it('ウィンドウ幅が大きい場合、LANDSCAPE を返す', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    })
    Object.defineProperty(document.documentElement, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    })

    const { result } = renderHook(() => useOrientation())
    expect(result.current).toBe(ORIENTATION.LANDSCAPE)
  })

  it('resize イベントでオリエンテーションが切り替わる', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    Object.defineProperty(document.documentElement, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    const { result } = renderHook(() => useOrientation())
    expect(result.current).toBe(ORIENTATION.LANDSCAPE)

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 600,
      })
      Object.defineProperty(document.documentElement, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 600,
      })
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current).toBe(ORIENTATION.PORTRAIT)
  })
})

describe('useInnerSize プロパティベーステスト', () => {
  // Feature: unit-test-strategy, Property 11: useInnerSize のウィンドウ幅追従
  it('任意のウィンドウ幅に対して、resize 後に Math.min(clientWidth, innerWidth) と等しい値を返す', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10000 }),
        fc.integer({ min: 1, max: 10000 }),
        (innerWidth, clientWidth) => {
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: innerWidth,
          })
          Object.defineProperty(document.documentElement, 'clientWidth', {
            writable: true,
            configurable: true,
            value: clientWidth,
          })

          const { result, unmount } = renderHook(() => useInnerSize())

          try {
            act(() => {
              window.dispatchEvent(new Event('resize'))
            })

            expect(result.current).toBe(Math.min(clientWidth, innerWidth))
          } finally {
            unmount()
          }
        },
      ),
      { numRuns: 100 },
    )
  })
})

describe('useOrientation プロパティベーステスト', () => {
  // Feature: unit-test-strategy, Property 12: useOrientation のブレークポイント判定
  it('任意の正の整数のウィンドウ幅に対して、768 以下なら PORTRAIT、それ以外なら LANDSCAPE を返す', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 10000 }), (width) => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        })
        Object.defineProperty(document.documentElement, 'clientWidth', {
          writable: true,
          configurable: true,
          value: width,
        })

        const { result, unmount } = renderHook(() => useOrientation())

        try {
          act(() => {
            window.dispatchEvent(new Event('resize'))
          })

          const expected = width <= 768 ? ORIENTATION.PORTRAIT : ORIENTATION.LANDSCAPE
          expect(result.current).toBe(expected)
        } finally {
          unmount()
        }
      }),
      { numRuns: 100 },
    )
  })
})
