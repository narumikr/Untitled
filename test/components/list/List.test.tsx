import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { List } from '@/components/list/List'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('List', () => {
  describe('正常系', () => {
    it('デフォルトで ul 要素としてレンダリングされる', () => {
      const { container } = render(<List>テスト</List>)
      const ul = container.querySelector('ul')
      expect(ul).toBeInTheDocument()
      expect(ul).toHaveTextContent('テスト')
    })

    it('as="ol" で ol 要素としてレンダリングされる', () => {
      const { container } = render(<List as="ol">テスト</List>)
      const ol = container.querySelector('ol')
      expect(ol).toBeInTheDocument()
      expect(container.querySelector('ul')).not.toBeInTheDocument()
    })

    it('className プロパティが適用される', () => {
      const { container } = render(<List className="custom-class">テスト</List>)
      const ul = container.querySelector('ul')
      expect(ul).toHaveClass('custom-class')
    })

    it('data-testid が転送される', () => {
      render(<List data-testid="my-list">テスト</List>)
      expect(screen.getByTestId('my-list')).toBeInTheDocument()
    })

    it('sekai プロパティで CSS 変数が設定される', () => {
      const { container } = render(<List sekai="Miku">テスト</List>)
      const ul = container.querySelector('ul')
      expect(ul!.style.getPropertyValue('--sekai-color')).toBe('#00CCBB')
    })
  })

  describe('noBullet プロパティ', () => {
    it('デフォルト (noBullet=true) でリストスタイルが none になる', () => {
      const { container } = render(<List>テスト</List>)
      const ul = container.querySelector('ul')
      expect(ul!.style.listStyleType).toBe('none')
      expect(ul!.style.paddingLeft).toBe('0px')
    })

    it('noBullet=false でリストスタイルが適用される', () => {
      const { container } = render(<List noBullet={false}>テスト</List>)
      const ul = container.querySelector('ul')
      expect(ul!.style.listStyleType).toBe('')
      expect(ul!.style.paddingLeft).toBe('36px')
    })
  })
})
