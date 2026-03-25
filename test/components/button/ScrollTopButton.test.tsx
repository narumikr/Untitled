import React from 'react'

import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { ScrollTopButton } from '@/components/button/ScrollTopButton'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

/**
 * ScrollTopButton はスクロール位置が300pxを超えた場合にのみ表示される。
 * createPortal で document.body に直接レンダリングされる。
 */
describe('ScrollTopButton', () => {
  beforeEach(() => {
    // scrollY のデフォルトを 0 に設定
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
    vi.clearAllMocks()
  })

  afterEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
  })

  /** scrollY を設定して scroll イベントを発火するヘルパー */
  const simulateScroll = (scrollY: number) => {
    Object.defineProperty(window, 'scrollY', { value: scrollY, writable: true })
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
  }

  describe('正常系', () => {
    it('スクロール位置が300px以下の場合はレンダリングされない', () => {
      const { container } = render(<ScrollTopButton />)
      // isVisible が false なので null を返す
      expect(container.innerHTML).toBe('')
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('スクロール位置が300pxを超えた場合に表示される', () => {
      render(<ScrollTopButton />)

      simulateScroll(301)

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('スクロール位置がちょうど300pxの場合は表示されない', () => {
      render(<ScrollTopButton />)

      simulateScroll(300)

      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('スクロール位置が300pxを超えた後、300px以下に戻ると非表示になる', () => {
      render(<ScrollTopButton />)

      simulateScroll(400)
      expect(screen.getByRole('button')).toBeInTheDocument()

      simulateScroll(100)
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('type="button" が設定される', () => {
      render(<ScrollTopButton />)

      simulateScroll(400)

      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })

    it('クリック時に window.scrollTo が呼び出される', async () => {
      const user = userEvent.setup()
      render(<ScrollTopButton />)

      simulateScroll(400)

      await user.click(screen.getByRole('button'))
      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    })

    it('sekai プロパティで CSS 変数が設定される', () => {
      render(<ScrollTopButton sekai="Miku" />)

      simulateScroll(400)

      const button = screen.getByRole('button')
      expect(button.style.getPropertyValue('--sekai-color')).toBe('#00CCBB')
    })

    it('className プロパティが適用される', () => {
      render(<ScrollTopButton className="custom-class" />)

      simulateScroll(400)

      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })

    it('data-testid が転送される', () => {
      render(<ScrollTopButton data-testid="scroll-btn" />)

      simulateScroll(400)

      expect(screen.getByTestId('scroll-btn')).toBeInTheDocument()
    })

    it('デフォルトの pos が bottom-right クラスを適用する', () => {
      render(<ScrollTopButton />)

      simulateScroll(400)

      expect(screen.getByRole('button')).toHaveClass('sekai-scroll-top-button-bottom-right')
    })

    it('pos="bottom-left" で対応するクラスが適用される', () => {
      render(<ScrollTopButton pos="bottom-left" />)

      simulateScroll(400)

      expect(screen.getByRole('button')).toHaveClass('sekai-scroll-top-button-bottom-left')
    })
  })
})
