import { render, screen, act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { TypewriterText } from '@/components/text/TypewriterText'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('TypewriterText', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('正常系', () => {
    it('デフォルトプロパティでレンダリングされる', () => {
      render(<TypewriterText text="テスト" />)
      expect(screen.getByText('テ')).toBeInTheDocument()
    })

    it('タイマーに基づいてテキストを1文字ずつ表示する', () => {
      render(
        <TypewriterText text="ABC" options={{ speed: 100, loop: false, showCursor: false }} />,
      )

      // 初回レンダリングで最初の1文字が表示される
      expect(screen.getByText('A')).toBeInTheDocument()

      // 100ms 経過で2文字目が追加される
      act(() => {
        vi.advanceTimersByTime(100)
      })
      expect(screen.getByText('AB')).toBeInTheDocument()

      // さらに 100ms 経過で3文字目が追加される
      act(() => {
        vi.advanceTimersByTime(100)
      })
      expect(screen.getByText('ABC')).toBeInTheDocument()
    })

    it('speed オプションでタイピング速度を制御できる', () => {
      render(
        <TypewriterText text="AB" options={{ speed: 200, loop: false, showCursor: false }} />,
      )

      expect(screen.getByText('A')).toBeInTheDocument()

      // 100ms ではまだ2文字目が表示されない
      act(() => {
        vi.advanceTimersByTime(100)
      })
      expect(screen.queryByText('AB')).not.toBeInTheDocument()

      // 200ms で2文字目が表示される
      act(() => {
        vi.advanceTimersByTime(100)
      })
      expect(screen.getByText('AB')).toBeInTheDocument()
    })

    it('全文字表示後にタイマーが停止する', () => {
      render(
        <TypewriterText text="AB" options={{ speed: 100, loop: false, showCursor: false }} />,
      )

      act(() => {
        vi.advanceTimersByTime(100)
      })
      expect(screen.getByText('AB')).toBeInTheDocument()

      // さらに時間が経過しても表示テキストは変わらない
      act(() => {
        vi.advanceTimersByTime(500)
      })
      expect(screen.getByText('AB')).toBeInTheDocument()
    })

    it('loop=true でテキストがリセットされ再度タイピングが開始される', () => {
      render(
        <TypewriterText text="AB" options={{ speed: 100, loop: true, showCursor: false }} />,
      )

      expect(screen.getByText('A')).toBeInTheDocument()

      act(() => {
        vi.advanceTimersByTime(100)
      })
      expect(screen.getByText('AB')).toBeInTheDocument()

      // ループでリセットされ、再び最初の文字から表示される
      act(() => {
        vi.advanceTimersByTime(100)
      })
      expect(screen.getByText('A')).toBeInTheDocument()
    })

    it('showCursor=true でカーソルクラスが適用される', () => {
      const { container } = render(
        <TypewriterText text="ABC" options={{ speed: 100, loop: false, showCursor: true }} />,
      )

      const root = container.firstElementChild as HTMLElement
      expect(root.className).toMatch(/sekai-cursor/)
    })

    it('showCursor=false でカーソルクラスが適用されない', () => {
      const { container } = render(
        <TypewriterText text="ABC" options={{ speed: 100, loop: false, showCursor: false }} />,
      )

      const root = container.firstElementChild as HTMLElement
      expect(root.className).not.toMatch(/sekai-cursor/)
    })

    it('className が適用される', () => {
      const { container } = render(
        <TypewriterText text="テスト" className="custom-typewriter" />,
      )
      const root = container.firstElementChild as HTMLElement
      expect(root).toHaveClass('custom-typewriter')
    })

    it('data-testid が転送される', () => {
      render(<TypewriterText text="テスト" data-testid="typewriter" />)
      expect(screen.getByTestId('typewriter')).toBeInTheDocument()
    })

    it('sekai プロパティで CSS 変数が設定される', () => {
      const { container } = render(<TypewriterText text="テスト" sekai="Miku" />)
      const root = container.firstElementChild as HTMLElement
      expect(root.style.getPropertyValue('--sekai-color')).toBe('#00CCBB')
    })
  })
})
