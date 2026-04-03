import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Divider } from '@/components/divider/Divider'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('Divider', () => {
  describe('children なし（hr 要素）', () => {
    it('role="separator" が設定される', () => {
      render(<Divider data-testid="divider" />)
      expect(screen.getByRole('separator')).toBeInTheDocument()
    })

    it('aria-orientation="horizontal" が設定される', () => {
      render(<Divider />)
      expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal')
    })

    it('hr 要素としてレンダリングされる', () => {
      render(<Divider />)
      expect(screen.getByRole('separator').tagName).toBe('HR')
    })
  })

  describe('children あり（テキスト付きディバイダー）', () => {
    it('children のテキストが表示される', () => {
      render(<Divider>セクション</Divider>)
      expect(screen.getByText('セクション')).toBeInTheDocument()
    })

    it('role="separator" が設定される', () => {
      render(<Divider>テスト</Divider>)
      expect(screen.getByRole('separator')).toBeInTheDocument()
    })

    it('aria-orientation="horizontal" が設定される', () => {
      render(<Divider>テスト</Divider>)
      expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal')
    })

    it('div 要素としてレンダリングされる', () => {
      render(<Divider>テスト</Divider>)
      expect(screen.getByRole('separator').tagName).toBe('DIV')
    })
  })

  describe('共通プロパティ', () => {
    it('className が適用される', () => {
      render(<Divider className="custom-divider" data-testid="divider" />)
      expect(screen.getByTestId('divider')).toHaveClass('custom-divider')
    })

    it('data-testid が転送される', () => {
      render(<Divider data-testid="my-divider" />)
      expect(screen.getByTestId('my-divider')).toBeInTheDocument()
    })
  })
})
