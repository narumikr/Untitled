
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { PictureViewer } from '@/components/viewer/PictureViewer'

import type React from 'react'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

vi.mock('@/internal/usePortalContainer', () => ({
  usePortalContainer: () => document.body,
}))

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  motion: {
    div: ({
      children,
      className,
      style,
      onClick,
      ...rest
    }: React.PropsWithChildren<{
      'className'?: string
      'style'?: React.CSSProperties
      'onClick'?: () => void
      'data-testid'?: string
    }>) => (
      <div
        className={className}
        style={style}
        onClick={onClick}
        data-testid={rest['data-testid']}>
        {children}
      </div>
    ),
    button: ({
      children,
      className,
      onClick,
    }: React.PropsWithChildren<{ className?: string; onClick?: () => void }>) => (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    ),
  },
}))

describe('PictureViewer', () => {
  const defaultProps = {
    imgSrc: '/test-image.png',
    alt: 'テスト画像',
  }

  describe('サムネイル画像の表示', () => {
    it('サムネイル画像が imgSrc と alt で表示される', () => {
      render(<PictureViewer {...defaultProps} />)

      const img = screen.getByAltText('テスト画像')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', '/test-image.png')
    })

    it('デフォルトの width=210 が適用される', () => {
      render(<PictureViewer {...defaultProps} />)

      const img = screen.getByAltText('テスト画像')
      expect(img).toHaveAttribute('width', '210')
    })

    it('カスタム width が適用される', () => {
      render(<PictureViewer {...defaultProps} width={300} />)

      const img = screen.getByAltText('テスト画像')
      expect(img).toHaveAttribute('width', '300')
    })

    it('objectFit が img の style に適用される', () => {
      render(<PictureViewer {...defaultProps} objectFit="cover" />)

      const img = screen.getByAltText('テスト画像')
      expect(img.style.objectFit).toBe('cover')
    })

    it('className がサムネイルコンテナに転送される', () => {
      render(<PictureViewer {...defaultProps} className="custom-class" />)

      const thumbnail = screen.getByAltText('テスト画像').parentElement
      expect(thumbnail).toHaveClass('custom-class')
    })

    it('data-testid がサムネイルコンテナに転送される', () => {
      render(<PictureViewer {...defaultProps} data-testid="picture-viewer" />)

      expect(screen.getByTestId('picture-viewer')).toBeInTheDocument()
    })

    it('sekai プロパティで --sekai-color CSS 変数が設定される', () => {
      render(<PictureViewer {...defaultProps} sekai="Miku" />)

      const thumbnail = screen.getByAltText('テスト画像').parentElement
      expect(thumbnail?.style.getPropertyValue('--sekai-color')).toBe('#00CCBB')
    })
  })

  describe('プレビュー表示', () => {
    it('サムネイルクリックでプレビュー画像が表示される', async () => {
      const user = userEvent.setup()
      render(<PictureViewer {...defaultProps} />)

      const thumbnail = screen.getByAltText('テスト画像').parentElement!
      await user.click(thumbnail)

      const images = screen.getAllByAltText('テスト画像')
      expect(images).toHaveLength(2)
    })

    it('プレビューの閉じるボタンクリックでプレビューが非表示になる', async () => {
      const user = userEvent.setup()
      render(<PictureViewer {...defaultProps} />)

      const thumbnail = screen.getByAltText('テスト画像').parentElement!
      await user.click(thumbnail)

      expect(screen.getAllByAltText('テスト画像')).toHaveLength(2)

      const closeButton = screen.getByRole('button')
      await user.click(closeButton)

      expect(screen.getAllByAltText('テスト画像')).toHaveLength(1)
    })
  })
})
