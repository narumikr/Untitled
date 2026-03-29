import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { List } from '@/components/list/List'
import { ListItemText } from '@/components/list/ListItemText'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

const mockConsoleWarning = vi.fn()
vi.mock('@/internal/logging', () => ({
  ConsoleWarning: (...args: unknown[]) => mockConsoleWarning(...args),
}))

const renderInList = (ui: React.ReactElement) => render(<List>{ui}</List>)

describe('ListItemText', () => {
  describe('正常系', () => {
    it('children を li 要素内に表示する', () => {
      renderInList(<ListItemText>テストテキスト</ListItemText>)
      const listItem = screen.getByRole('listitem')
      expect(listItem).toBeInTheDocument()
      expect(screen.getByText('テストテキスト')).toBeInTheDocument()
    })

    it('デフォルトで children を p 要素でラップする', () => {
      renderInList(<ListItemText>テスト</ListItemText>)
      const listItem = screen.getByRole('listitem')
      expect(listItem.querySelector('p')).toHaveTextContent('テスト')
    })

    it('as="span" で children を span 要素でラップする', () => {
      renderInList(<ListItemText as="span">テスト</ListItemText>)
      const listItem = screen.getByRole('listitem')
      expect(listItem.querySelector('span')).toHaveTextContent('テスト')
      expect(listItem.querySelector('p')).not.toBeInTheDocument()
    })

    it('children が React 要素の場合はラップせずそのまま表示する', () => {
      renderInList(
        <ListItemText>
          <strong data-testid="child-el">太字テキスト</strong>
        </ListItemText>,
      )
      expect(screen.getByTestId('child-el')).toHaveTextContent('太字テキスト')
    })

    it('className プロパティが li 要素に適用される', () => {
      renderInList(<ListItemText className="custom-class">テスト</ListItemText>)
      const listItem = screen.getByRole('listitem')
      expect(listItem).toHaveClass('custom-class')
    })

    it('id プロパティが li 要素に適用される', () => {
      const { container } = renderInList(<ListItemText id="my-item">テスト</ListItemText>)
      expect(container.querySelector('#my-item')).toBeInTheDocument()
    })
  })

  describe('icon プロパティ', () => {
    it('icon が文字列の場合に img 要素が表示される', () => {
      const { container } = renderInList(<ListItemText icon="/icon.png">テスト</ListItemText>)
      const img = container.querySelector('img')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', '/icon.png')
      expect(img).toHaveAttribute('alt', '')
    })

    it('icon が React 要素の場合にそのまま表示される', () => {
      renderInList(
        <ListItemText icon={<span data-testid="custom-icon">★</span>}>テスト</ListItemText>,
      )
      expect(screen.getByTestId('custom-icon')).toHaveTextContent('★')
    })

    it('icon が未指定の場合にアイコンが表示されない', () => {
      const { container } = renderInList(<ListItemText>テスト</ListItemText>)
      expect(container.querySelector('img')).not.toBeInTheDocument()
    })
  })

  describe('警告', () => {
    it('List 外でレンダリングされた場合に ConsoleWarning が呼び出される', () => {
      mockConsoleWarning.mockClear()
      render(<ListItemText>テスト</ListItemText>)
      expect(mockConsoleWarning).toHaveBeenCalledWith(
        '⚠ Warning: <ListItemText> should be used inside <List>',
      )
    })
  })
})
