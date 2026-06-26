import { render, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { IntoTheSekai } from '@/components/effect/IntoTheSekai'

vi.mock('@/internal/usePortalContainer', () => ({
  usePortalContainer: () => document.body,
}))

const mockCtxBase = () =>
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    fill: vi.fn(),
    fillStyle: '',
  } as unknown as CanvasRenderingContext2D)

describe('IntoTheSekai', () => {
  beforeEach(() => {
    mockCtxBase()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('正常系', () => {
    it('Portal 経由で canvas 要素がレンダリングされる', () => {
      render(<IntoTheSekai />)
      const canvas = document.body.querySelector('canvas')
      expect(canvas).toBeInTheDocument()
      expect(canvas).toHaveClass('into-the-sekai')
    })

    it('className プロパティが canvas 要素に適用される', () => {
      render(<IntoTheSekai className="custom-effect" />)
      const canvas = document.body.querySelector('canvas')
      expect(canvas).toHaveClass('into-the-sekai')
      expect(canvas).toHaveClass('custom-effect')
    })

    it('style プロパティが canvas 要素に適用される', () => {
      render(<IntoTheSekai style={{ opacity: 0.5 }} />)
      const canvas = document.body.querySelector('canvas')
      expect(canvas).toHaveStyle({ opacity: '0.5' })
    })

    it('data-testid プロパティが canvas 要素に転送される', () => {
      render(<IntoTheSekai data-testid="sekai-canvas" />)
      const canvas = document.body.querySelector('[data-testid="sekai-canvas"]')
      expect(canvas).toBeInTheDocument()
      expect(canvas?.tagName).toBe('CANVAS')
    })
  })

  describe('execEvent', () => {
    let rafCallbacks: FrameRequestCallback[]

    beforeEach(() => {
      rafCallbacks = []

      // rAF はコールバックを溜めるだけにして、手動でフラッシュできるようにする
      vi.stubGlobal(
        'requestAnimationFrame',
        vi.fn((cb: FrameRequestCallback) => {
          rafCallbacks.push(cb)
          return rafCallbacks.length
        }),
      )
      vi.stubGlobal('cancelAnimationFrame', vi.fn())

      // setTimeout / clearTimeout のみフェイク化（React スケジューラに影響しないよう限定）
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    })

    afterEach(() => {
      vi.useRealTimers()
      vi.unstubAllGlobals()
      rafCallbacks = []
    })

    // 溜まった rAF コールバックを1フレーム分まとめて実行する
    const flushRaf = () => {
      const batch = rafCallbacks.splice(0)
      batch.forEach((cb) => cb(0))
    }

    // アニメーションが完全に終わるまでフレームを進める
    // opacity: 1 → 0.0075 ずつ減少、0以下になったらフィルタ除去
    // ceil(1 / 0.0075) = 134 フレームで全ピース消滅
    const FRAMES_TO_COMPLETE = 134

    const drainAnimation = () => {
      for (let i = 0; i < FRAMES_TO_COMPLETE; i++) {
        act(() => {
          flushRaf()
        })
      }
    }

    it('アニメーション完了後に execEventDelay(ms) を経て execEvent が発火する', () => {
      const execEvent = vi.fn()

      render(<IntoTheSekai execEvent={execEvent} execEventDelay={390} />)

      const canvas = document.body.querySelector('canvas')!

      act(() => {
        fireEvent.click(canvas, { clientX: 100, clientY: 100 })
      })

      drainAnimation()

      // タイムアウト経過前は発火しない
      act(() => {
        vi.advanceTimersByTime(389)
      })
      expect(execEvent).not.toHaveBeenCalled()

      // execEventDelay 経過後に発火する
      act(() => {
        vi.advanceTimersByTime(1)
      })
      expect(execEvent).toHaveBeenCalledTimes(1)
    })

    it('execEventDelay のデフォルト値は 390ms である', () => {
      const execEvent = vi.fn()

      render(<IntoTheSekai execEvent={execEvent} />)

      const canvas = document.body.querySelector('canvas')!

      act(() => {
        fireEvent.click(canvas, { clientX: 100, clientY: 100 })
      })

      drainAnimation()

      act(() => {
        vi.advanceTimersByTime(389)
      })
      expect(execEvent).not.toHaveBeenCalled()

      act(() => {
        vi.advanceTimersByTime(1)
      })
      expect(execEvent).toHaveBeenCalledTimes(1)
    })

    it('execEvent が未指定の場合はエラーが発生しない', () => {
      render(<IntoTheSekai />)

      const canvas = document.body.querySelector('canvas')!

      act(() => {
        fireEvent.click(canvas, { clientX: 100, clientY: 100 })
      })

      drainAnimation()

      expect(() => {
        act(() => {
          vi.advanceTimersByTime(390)
        })
      }).not.toThrow()
    })

    it('execEvent はアニメーション1回につき1度だけ発火する', () => {
      const execEvent = vi.fn()

      render(<IntoTheSekai execEvent={execEvent} execEventDelay={100} />)

      const canvas = document.body.querySelector('canvas')!

      act(() => {
        fireEvent.click(canvas, { clientX: 100, clientY: 100 })
      })

      drainAnimation()

      act(() => {
        vi.advanceTimersByTime(100)
      })

      expect(execEvent).toHaveBeenCalledTimes(1)
    })
  })
})
