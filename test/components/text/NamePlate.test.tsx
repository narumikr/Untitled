import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { NamePlate } from '@/components/text/NamePlate'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('NamePlate', () => {
  describe('正常系', () => {
    it('デフォルトプロパティでレンダリングされる', () => {
      render(<NamePlate text="テスト" />)
      expect(screen.getByText('テ')).toBeInTheDocument()
      expect(screen.getByText('スト')).toBeInTheDocument()
    })

    it('colorLength に基づいてテキストを色付き部分と通常部分に分割して表示する', () => {
      const { container } = render(<NamePlate text="初音ミク" colorLength={2} />)
      const spans = container.querySelectorAll('span')
      expect(spans[0]).toHaveTextContent('初音')
      expect(spans[1]).toHaveTextContent('ミク')
    })

    it('デフォルトの colorLength=1 で先頭1文字が色付き部分になる', () => {
      const { container } = render(<NamePlate text="ABCDE" />)
      const spans = container.querySelectorAll('span')
      expect(spans[0]).toHaveTextContent('A')
      expect(spans[1]).toHaveTextContent('BCDE')
    })

    it('colorLength がテキスト全体の長さと同じ場合、全文字が色付き部分になる', () => {
      const { container } = render(<NamePlate text="ABC" colorLength={3} />)
      const spans = container.querySelectorAll('span')
      expect(spans[0]).toHaveTextContent('ABC')
      expect(spans[1]).toHaveTextContent('')
    })

    it('色付き部分の span に sekai-name-plate-color クラスが適用される', () => {
      const { container } = render(<NamePlate text="テスト" colorLength={1} />)
      const colorSpan = container.querySelectorAll('span')[0]
      expect(colorSpan).toHaveClass('sekai-name-plate-color')
    })

    it('className が適用される', () => {
      const { container } = render(<NamePlate text="テスト" className="custom-class" />)
      expect(container.firstChild).toHaveClass('custom-class')
    })

    it('data-testid が転送される', () => {
      render(<NamePlate text="テスト" data-testid="name-plate" />)
      expect(screen.getByTestId('name-plate')).toBeInTheDocument()
    })

    it('sekai プロパティで CSS 変数が設定される', () => {
      const { container } = render(<NamePlate text="テスト" sekai="Miku" />)
      const root = container.firstChild as HTMLElement
      expect(root.style.getPropertyValue('--sekai-color')).toBe('#00CCBB')
    })

    it('modeTheme に応じたクラス名が適用される', () => {
      const { container } = render(<NamePlate text="テスト" />)
      expect(container.firstChild).toHaveClass('sekai-name-plate-light')
    })
  })
})
