import { render, screen } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, describe, it, expect, vi } from 'vitest'

import { MarqueeText } from '@/components/text/MarqueeText'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

const mockObserve = vi.fn()

describe('MarqueeText', () => {
  const originalResizeObserver = globalThis.ResizeObserver

  beforeAll(() => {
    globalThis.ResizeObserver = vi.fn().mockImplementation(function () {
      return {
        observe: mockObserve,
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      }
    })
  })

  afterAll(() => {
    globalThis.ResizeObserver = originalResizeObserver
  })

  afterEach(() => {
    mockObserve.mockClear()
  })

  describe('正常系', () => {
    it('children（文字列）を表示する', () => {
      render(<MarqueeText>テストテキスト</MarqueeText>)
      expect(screen.getByText('テストテキスト')).toBeInTheDocument()
      expect(mockObserve).toHaveBeenCalled()
    })

    it('children（React要素）を表示する', () => {
      render(
        <MarqueeText>
          <span>要素テキスト</span>
        </MarqueeText>,
      )
      expect(screen.getByText('要素テキスト')).toBeInTheDocument()
    })

    it('className が適用される', () => {
      const { container } = render(<MarqueeText className="custom-marquee">テスト</MarqueeText>)
      expect(container.firstElementChild).toHaveClass('custom-marquee')
    })

    it('data-testid が転送される', () => {
      render(<MarqueeText data-testid="marquee-text">テスト</MarqueeText>)
      expect(screen.getByTestId('marquee-text')).toBeInTheDocument()
    })

    it('sekai プロパティで CSS 変数が設定される', () => {
      const { container } = render(<MarqueeText sekai="Miku">テスト</MarqueeText>)
      const root = container.firstElementChild as HTMLElement
      expect(root.style.getPropertyValue('--sekai-color')).toBe('#00CCBB')
    })
  })
})
