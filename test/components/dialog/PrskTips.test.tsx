import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { PrskTips } from '@/components/dialog/PrskTips'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#33ccba',
    modeTheme: 'light',
    isLight: true,
  }),
}))

vi.mock('@/internal/usePortalContainer', () => ({
  usePortalContainer: () => document.body,
}))

describe('PrskTips', () => {
  const defaultProps = {
    open: true,
    tipsText: 'テストのTips内容',
  }

  describe('正常系', () => {
    it('Portal 経由で document.body にレンダリングされる', () => {
      const root = document.createElement('div')
      document.body.appendChild(root)

      render(<PrskTips {...defaultProps} />, { container: root })

      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
      expect(root).not.toContainElement(dialog)
      expect(document.body).toContainElement(dialog)

      document.body.removeChild(root)
    })

    it('tipsText が表示される', () => {
      render(<PrskTips {...defaultProps} />)
      expect(screen.getByText('テストのTips内容')).toBeInTheDocument()
    })

    it('「TIPS」タイトルが表示される', () => {
      render(<PrskTips {...defaultProps} />)
      expect(screen.getByText('TIPS')).toBeInTheDocument()
    })

    it('role="dialog" が設定される', () => {
      render(<PrskTips {...defaultProps} />)
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('className が転送される', () => {
      render(<PrskTips {...defaultProps} className="custom-class" />)
      expect(screen.getByRole('dialog')).toHaveClass('custom-class')
    })

    it('data-testid が転送される', () => {
      render(<PrskTips {...defaultProps} data-testid="my-tips" />)
      expect(screen.getByTestId('my-tips')).toBeInTheDocument()
    })
  })

  describe('open', () => {
    describe('withOverlay=true (デフォルト)', () => {
      it('open=true で Backdrop が visible になる', () => {
        render(<PrskTips {...defaultProps} open={true} data-testid="tips" />)
        const backdropWrapper = screen.getByTestId('tips').parentElement?.parentElement
        expect(backdropWrapper).toHaveClass('sekai-backdrop-visible')
      })

      it('open=false で Backdrop が hidden になる', () => {
        render(<PrskTips {...defaultProps} open={false} data-testid="tips" />)
        const backdropWrapper = screen.getByTestId('tips').parentElement?.parentElement
        expect(backdropWrapper).toHaveClass('sekai-backdrop-hidden')
      })
    })

    describe('withOverlay=false', () => {
      it('open=true でダイアログが表示される', () => {
        render(<PrskTips {...defaultProps} open={true} withOverlay={false} />)
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      it('open=false で何もレンダリングされない', () => {
        render(<PrskTips {...defaultProps} open={false} withOverlay={false} />)
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('withOverlay', () => {
    it('withOverlay=true のとき Backdrop でラップされる', () => {
      render(<PrskTips {...defaultProps} withOverlay={true} data-testid="tips" />)
      const backdropWrapper = screen.getByTestId('tips').parentElement?.parentElement
      expect(backdropWrapper).toHaveClass('sekai-backdrop-visible')
    })

    it('withOverlay=false のとき sekai-tips-no-overlay クラスのラッパーが適用される', () => {
      render(<PrskTips {...defaultProps} withOverlay={false} />)
      expect(screen.getByRole('dialog').parentElement).toHaveClass('sekai-tips-no-overlay')
    })
  })
})
