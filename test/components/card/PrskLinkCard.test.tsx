import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { PrskLinkCard } from '@/components/card/PrskLinkCard'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('PrskLinkCard', () => {
  const defaultProps = {
    title: 'テストタイトル',
    subText: 'テストサブテキスト',
    icon: 'https://example.com/icon.png',
  }

  describe('正常系', () => {
    it('title のテキストを表示する', () => {
      render(<PrskLinkCard {...defaultProps} />)
      // NamePlate がテキストを複数 span に分割するため、部分一致で検証
      const titleEl = document.getElementById('prsk-link-card-title')
      expect(titleEl).toBeInTheDocument()
      expect(titleEl).toHaveTextContent('テストタイトル')
    })

    it('subText のテキストを表示する', () => {
      render(<PrskLinkCard {...defaultProps} />)
      expect(screen.getByText('テストサブテキスト')).toBeInTheDocument()
    })

    it('className が転送される', () => {
      render(
        <PrskLinkCard {...defaultProps} className="custom-class" data-testid="prsk-card" />,
      )
      expect(screen.getByTestId('prsk-card')).toHaveClass('custom-class')
    })

    it('data-testid が転送される', () => {
      render(<PrskLinkCard {...defaultProps} data-testid="prsk-card" />)
      expect(screen.getByTestId('prsk-card')).toBeInTheDocument()
    })

    it('icon が文字列の場合に img 要素が表示される', () => {
      render(<PrskLinkCard {...defaultProps} />)
      // alt="" のため role="presentation" になる。querySelector で検証
      const img = document.querySelector('img[src="https://example.com/icon.png"]')
      expect(img).toBeInTheDocument()
    })

    it('icon が ReactNode の場合にそのノードが表示される', () => {
      render(<PrskLinkCard {...defaultProps} icon={<span data-testid="custom-icon">★</span>} />)
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })
  })
})
