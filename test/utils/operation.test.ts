import fc from 'fast-check'
import { describe, it, expect, vi } from 'vitest'

import { fireOnEnterKey, fireOnEscapeKey, shuffleArray } from '@/utils/operation'

import type React from 'react'

describe('fireOnEnterKey', () => {
  it('Enterキーが押された場合にハンドラーを呼び出す', () => {
    const handler = vi.fn()
    const wrappedHandler = fireOnEnterKey(handler)
    const event = {
      key: 'Enter',
      preventDefault: vi.fn(),
    } as unknown as React.KeyboardEvent<HTMLElement>

    wrappedHandler(event)

    expect(handler).toHaveBeenCalledOnce()
    expect(handler).toHaveBeenCalledWith(event)
    expect(event.preventDefault).toHaveBeenCalledOnce()
  })

  it('Enter以外のキーではハンドラーを呼び出さない', () => {
    const handler = vi.fn()
    const wrappedHandler = fireOnEnterKey(handler)

    const keys = ['Escape', 'Tab', 'Space', 'a', 'ArrowDown']
    for (const key of keys) {
      const event = {
        key,
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent<HTMLElement>

      wrappedHandler(event)
    }

    expect(handler).not.toHaveBeenCalled()
  })
})

describe('fireOnEscapeKey', () => {
  it('Escapeキーが押された場合にハンドラーを呼び出す', () => {
    const handler = vi.fn()
    const wrappedHandler = fireOnEscapeKey(handler)
    const event = {
      key: 'Escape',
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent

    wrappedHandler(event)

    expect(handler).toHaveBeenCalledOnce()
    expect(handler).toHaveBeenCalledWith(event)
    expect(event.preventDefault).toHaveBeenCalledOnce()
  })

  it('Escape以外のキーではハンドラーを呼び出さない', () => {
    const handler = vi.fn()
    const wrappedHandler = fireOnEscapeKey(handler)

    const keys = ['Enter', 'Tab', 'Space', 'a', 'ArrowDown']
    for (const key of keys) {
      const event = {
        key,
        preventDefault: vi.fn(),
      } as unknown as KeyboardEvent

      wrappedHandler(event)
    }

    expect(handler).not.toHaveBeenCalled()
  })

  it('Escapeキーでない場合もpreventDefaultは呼び出される', () => {
    const handler = vi.fn()
    const wrappedHandler = fireOnEscapeKey(handler)
    const event = {
      key: 'Tab',
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent

    wrappedHandler(event)

    expect(event.preventDefault).toHaveBeenCalledOnce()
    expect(handler).not.toHaveBeenCalled()
  })
})

describe('shuffleArray', () => {
  it('シャッフル後の配列が元の配列と同じ長さを持つ', () => {
    const arr = [1, 2, 3, 4, 5]
    const shuffled = shuffleArray(arr)
    expect(shuffled).toHaveLength(arr.length)
  })

  it('シャッフル後の配列が元の配列と同じ要素を含む', () => {
    const arr = [1, 2, 3, 4, 5]
    const shuffled = shuffleArray(arr)
    expect(shuffled.sort()).toEqual([...arr].sort())
  })

  it('元の配列を変更しない', () => {
    const arr = [1, 2, 3, 4, 5]
    const original = [...arr]
    shuffleArray(arr)
    expect(arr).toEqual(original)
  })

  it('空の配列に対して空の配列を返す', () => {
    expect(shuffleArray([])).toEqual([])
  })

  it('要素が1つの配列に対してその要素を含む配列を返す', () => {
    expect(shuffleArray([42])).toEqual([42])
  })

  it('重複要素を含む配列でも要素が保存される', () => {
    const arr = [1, 1, 2, 2, 3]
    const shuffled = shuffleArray(arr)
    expect(shuffled).toHaveLength(arr.length)
    expect(shuffled.sort()).toEqual([...arr].sort())
  })
})

describe('fireOnEnterKey - プロパティベーステスト', () => {
  // Feature: unit-test-strategy, Property 6: キーボードイベントハンドラーの選択性
  it('Enter以外の任意のキーではコールバックが呼び出されない', () => {
    fc.assert(
      fc.property(
        fc.string().filter((s) => s !== 'Enter' && s.length > 0),
        (key) => {
          const handler = vi.fn()
          const wrappedHandler = fireOnEnterKey(handler)
          const event = {
            key,
            preventDefault: vi.fn(),
          } as unknown as React.KeyboardEvent<HTMLElement>

          wrappedHandler(event)

          expect(handler).not.toHaveBeenCalled()
        },
      ),
      { numRuns: 100 },
    )
  })

  // Feature: unit-test-strategy, Property 6: キーボードイベントハンドラーの選択性
  it('Enterキーでは常にコールバックが呼び出される', () => {
    const handler = vi.fn()
    const wrappedHandler = fireOnEnterKey(handler)
    const event = {
      key: 'Enter',
      preventDefault: vi.fn(),
    } as unknown as React.KeyboardEvent<HTMLElement>

    wrappedHandler(event)

    expect(handler).toHaveBeenCalledOnce()
  })
})

describe('fireOnEscapeKey - プロパティベーステスト', () => {
  // Feature: unit-test-strategy, Property 6: キーボードイベントハンドラーの選択性
  it('Escape以外の任意のキーではコールバックが呼び出されない', () => {
    fc.assert(
      fc.property(
        fc.string().filter((s) => s !== 'Escape' && s.length > 0),
        (key) => {
          const handler = vi.fn()
          const wrappedHandler = fireOnEscapeKey(handler)
          const event = {
            key,
            preventDefault: vi.fn(),
          } as unknown as KeyboardEvent

          wrappedHandler(event)

          expect(handler).not.toHaveBeenCalled()
        },
      ),
      { numRuns: 100 },
    )
  })

  // Feature: unit-test-strategy, Property 6: キーボードイベントハンドラーの選択性
  it('Escapeキーでは常にコールバックが呼び出される', () => {
    const handler = vi.fn()
    const wrappedHandler = fireOnEscapeKey(handler)
    const event = {
      key: 'Escape',
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent

    wrappedHandler(event)

    expect(handler).toHaveBeenCalledOnce()
  })
})

describe('shuffleArray - プロパティベーステスト', () => {
  // Feature: unit-test-strategy, Property 7: shuffleArray の不変量
  it('任意の配列に対して、要素と長さが保存される', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr) => {
        const shuffled = shuffleArray(arr)
        expect(shuffled).toHaveLength(arr.length)
        expect([...shuffled].sort((a, b) => a - b)).toEqual([...arr].sort((a, b) => a - b))
      }),
      { numRuns: 100 },
    )
  })

  // Feature: unit-test-strategy, Property 7: shuffleArray の不変量
  it('任意の文字列配列に対して、要素と長さが保存される', () => {
    fc.assert(
      fc.property(fc.array(fc.string()), (arr) => {
        const shuffled = shuffleArray(arr)
        expect(shuffled).toHaveLength(arr.length)
        expect([...shuffled].sort()).toEqual([...arr].sort())
      }),
      { numRuns: 100 },
    )
  })

  // Feature: unit-test-strategy, Property 7: shuffleArray の不変量
  it('元の配列を変更しない', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr) => {
        const original = [...arr]
        shuffleArray(arr)
        expect(arr).toEqual(original)
      }),
      { numRuns: 100 },
    )
  })
})
