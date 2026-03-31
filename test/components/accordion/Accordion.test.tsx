import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Accordion } from '@/components/accordion/Accordion'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

vi.mock('@/img/chevron', () => ({
  ChevronSvg: (props: Record<string, unknown>) => (
    <svg data-testid="chevron-svg" className={props.className as string} />
  ),
}))

describe('Accordion', () => {
  const defaultProps = {
    summary: 'テストサマリー',
    details: 'テスト詳細コンテンツ',
  }

  describe('正常系', () => {
    it('summary テキストが表示される', () => {
      render(<Accordion {...defaultProps} />)
      expect(screen.getByText('テストサマリー')).toBeInTheDocument()
    })

    it('className プロパティが適用される', () => {
      const { container } = render(<Accordion {...defaultProps} className="custom-class" />)
      expect(container.firstChild).toHaveClass('custom-class')
    })

    it('data-testid が転送される', () => {
      render(<Accordion {...defaultProps} data-testid="my-accordion" />)
      expect(screen.getByTestId('my-accordion')).toBeInTheDocument()
    })

    it('details が文字列の場合にテキストが表示される', () => {
      render(<Accordion {...defaultProps} defaultOpen />)
      expect(screen.getByText('テスト詳細コンテンツ')).toBeInTheDocument()
    })

    it('details が文字列配列の場合に全テキストが表示される', () => {
      render(<Accordion summary="サマリー" details={['項目1', '項目2', '項目3']} defaultOpen />)
      expect(screen.getByText('項目1')).toBeInTheDocument()
      expect(screen.getByText('項目2')).toBeInTheDocument()
      expect(screen.getByText('項目3')).toBeInTheDocument()
    })

    it('details が ReactNode の場合にレンダリングされる', () => {
      render(
        <Accordion
          summary="サマリー"
          details={<span data-testid="custom-node">カスタム</span>}
          defaultOpen
        />,
      )
      expect(screen.getByTestId('custom-node')).toBeInTheDocument()
    })
  })

  describe('開閉動作', () => {
    it('デフォルトで aria-expanded="false" が設定される', () => {
      render(<Accordion {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('サマリークリック時に aria-expanded が true に切り替わる', async () => {
      const user = userEvent.setup()
      render(<Accordion {...defaultProps} />)
      const button = screen.getByRole('button')

      await user.click(button)
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })

    it('サマリーを2回クリックすると aria-expanded が false に戻る', async () => {
      const user = userEvent.setup()
      render(<Accordion {...defaultProps} />)
      const button = screen.getByRole('button')

      await user.click(button)
      expect(button).toHaveAttribute('aria-expanded', 'true')

      await user.click(button)
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('defaultOpen=true で aria-expanded="true" が初期設定される', () => {
      render(<Accordion {...defaultProps} defaultOpen />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })

    it('defaultOpen=true で詳細コンテンツが初期表示される', () => {
      render(<Accordion {...defaultProps} defaultOpen />)
      expect(screen.getByText('テスト詳細コンテンツ')).toBeInTheDocument()
    })
  })

  describe('アクセシビリティ', () => {
    it('詳細領域が role="region" を持つ', () => {
      render(<Accordion {...defaultProps} defaultOpen />)
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('サマリーボタンが aria-controls="details-contents" を持つ', () => {
      render(<Accordion {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-controls', 'details-contents')
    })

    it('サマリーボタンの id と詳細領域の aria-labelledby が一致する', () => {
      render(<Accordion {...defaultProps} defaultOpen />)
      const button = screen.getByRole('button')
      const region = screen.getByRole('region')
      expect(region).toHaveAttribute('aria-labelledby', button.id)
    })
  })
})
