import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { OutlineText } from '@/components/text/OutlineText'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('OutlineText', () => {
  describe('正常系', () => {
    it('text プロパティの値を表示する', () => {
      render(<OutlineText text="テストテキスト" />)
      expect(screen.getByText('テストテキスト')).toBeInTheDocument()
    })

    it('data-text 属性に text プロパティの値が設定される', () => {
      render(<OutlineText text="アウトライン" />)
      expect(screen.getByText('アウトライン')).toHaveAttribute('data-text', 'アウトライン')
    })

    it('aria-label 属性に text プロパティの値が設定される', () => {
      render(<OutlineText text="アクセシブル" />)
      expect(screen.getByLabelText('アクセシブル')).toBeInTheDocument()
    })

    it('className が適用される', () => {
      render(<OutlineText text="テスト" className="custom-outline" />)
      expect(screen.getByText('テスト')).toHaveClass('custom-outline')
    })

    it('data-testid が転送される', () => {
      render(<OutlineText text="テスト" data-testid="outline-text" />)
      expect(screen.getByTestId('outline-text')).toBeInTheDocument()
    })

    it('sekai プロパティで CSS 変数が設定される', () => {
      render(<OutlineText text="テスト" sekai="Miku" />)
      const el = screen.getByText('テスト')
      expect(el.style.getPropertyValue('--sekai-color')).toBe('#00CCBB')
    })

    it('modeTheme に応じたクラス名が適用される', () => {
      render(<OutlineText text="テスト" />)
      expect(screen.getByText('テスト')).toHaveClass('sekai-outline-text-light')
    })
  })
})
