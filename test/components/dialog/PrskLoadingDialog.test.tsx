import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { PrskLoadingDialog } from '@/components/dialog/PrskLoadingDialog'

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

describe('PrskLoadingDialog', () => {
  const defaultProps = {
    open: true,
    title: 'テストタイトル',
    imageSrc: 'https://example.com/sample.png',
    imageAlt: 'サンプル画像',
  }

  describe('正常系', () => {
    it('Portal 経由で document.body にレンダリングされる', () => {
      const root = document.createElement('div')
      document.body.appendChild(root)

      render(<PrskLoadingDialog {...defaultProps} />, { container: root })

      const dialog = screen.getByRole('dialog')
      expect(root).not.toContainElement(dialog)
      expect(document.body).toContainElement(dialog)

      document.body.removeChild(root)
    })

    it('タイトルが表示される', () => {
      render(<PrskLoadingDialog {...defaultProps} />)
      expect(screen.getByRole('heading', { name: 'テストタイトル' })).toBeInTheDocument()
    })

    it('画像が src と alt 付きで表示される', () => {
      render(<PrskLoadingDialog {...defaultProps} />)
      const img = screen.getByRole('img', { name: 'サンプル画像' })
      expect(img).toHaveAttribute('src', 'https://example.com/sample.png')
    })

    it('ダイアログにタイトルがアクセシブルネームとして設定される', () => {
      render(<PrskLoadingDialog {...defaultProps} />)
      expect(screen.getByRole('dialog', { name: 'テストタイトル' })).toHaveAttribute(
        'aria-busy',
        'true',
      )
    })

    it('className と style が転送される', () => {
      render(
        <PrskLoadingDialog {...defaultProps} className="custom-class" style={{ margin: '8px' }} />,
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('custom-class')
      expect(dialog).toHaveStyle({ margin: '8px' })
    })

    it('--sekai-color が設定される', () => {
      render(<PrskLoadingDialog {...defaultProps} />)
      expect(screen.getByRole('dialog').style.getPropertyValue('--sekai-color')).toBe('#33ccba')
    })

    it('withOverlay=true でもダイアログが表示される', () => {
      render(<PrskLoadingDialog {...defaultProps} withOverlay />)
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
    })
  })

  describe('異常系', () => {
    it('open=false の場合、オーバーレイなしでは何も表示されない', () => {
      render(<PrskLoadingDialog {...defaultProps} open={false} />)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
})
