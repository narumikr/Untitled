import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { List } from '@/components/list/List'
import { StickyNote } from '@/components/list/StickyNote'

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

describe('StickyNote', () => {
  describe('正常系', () => {
    it('List 内で children をレンダリングする（デフォルト as="button"）', () => {
      renderInList(<StickyNote>テスト</StickyNote>)
      const listItem = screen.getByRole('listitem')
      expect(listItem).toBeInTheDocument()
      expect(screen.getByText('テスト')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('as="text" で ListItemText 経由でレンダリングされる', () => {
      renderInList(<StickyNote as="text">テキストモード</StickyNote>)
      const listItem = screen.getByRole('listitem')
      expect(listItem).toBeInTheDocument()
      expect(screen.getByText('テキストモード')).toBeInTheDocument()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('className プロパティが転送される', () => {
      renderInList(<StickyNote className="custom-class">テスト</StickyNote>)
      const listItem = screen.getByRole('listitem')
      expect(listItem).toHaveClass('custom-class')
    })
  })

  describe('警告', () => {
    it('List 外でレンダリングされた場合に ConsoleWarning が呼び出される', () => {
      mockConsoleWarning.mockClear()
      render(<StickyNote>テスト</StickyNote>)
      expect(mockConsoleWarning).toHaveBeenCalledWith(
        '⚠ Warning: <StickyNote> should be used inside <List>',
      )
    })
  })
})
