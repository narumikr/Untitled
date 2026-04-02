import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { TextLink } from '@/components/link/TextLink'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('TextLink', () => {
  describe('デフォルトレンダリング', () => {
    it('a 要素としてレンダリングされる', () => {
      render(<TextLink text="リンク" href="https://example.com" />)
      const link = screen.getByRole('link', { name: 'リンク' })
      expect(link.tagName).toBe('A')
    })

    it('href 属性が設定される', () => {
      render(<TextLink text="リンク" href="https://example.com" />)
      expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com')
    })

    it('text プロパティのテキストが表示される', () => {
      render(<TextLink text="テストリンク" href="/test" />)
      expect(screen.getByText('テストリンク')).toBeInTheDocument()
    })
  })

  describe('isExternal プロパティ', () => {
    it('デフォルト（isExternal=true）で target="_blank" が設定される', () => {
      render(<TextLink text="外部リンク" href="https://example.com" />)
      expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
    })

    it('デフォルト（isExternal=true）で rel="noopener noreferrer" が設定される', () => {
      render(<TextLink text="外部リンク" href="https://example.com" />)
      expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('isExternal=false で target="_self" が設定される', () => {
      render(<TextLink text="内部リンク" href="/internal" isExternal={false} />)
      expect(screen.getByRole('link')).toHaveAttribute('target', '_self')
    })
  })

  describe('disabled プロパティ', () => {
    it('disabled=true で aria-disabled="true" が設定される', () => {
      render(<TextLink text="無効リンク" href="/test" disabled />)
      expect(screen.getByRole('link')).toHaveAttribute('aria-disabled', 'true')
    })

    it('disabled=false で aria-disabled="false" が設定される', () => {
      render(<TextLink text="有効リンク" href="/test" disabled={false} />)
      expect(screen.getByRole('link')).toHaveAttribute('aria-disabled', 'false')
    })
  })

  describe('共通プロパティ', () => {
    it('className が適用される', () => {
      render(<TextLink text="リンク" href="/test" className="custom-link" />)
      expect(screen.getByRole('link')).toHaveClass('custom-link')
    })

    it('data-testid が転送される', () => {
      render(<TextLink text="リンク" href="/test" data-testid="my-link" />)
      expect(screen.getByTestId('my-link')).toBeInTheDocument()
    })
  })
})
