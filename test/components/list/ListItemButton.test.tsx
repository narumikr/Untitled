import type React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { List } from '@/components/list/List'
import { ListItemButton } from '@/components/list/ListItemButton'

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

describe('ListItemButton', () => {
  describe('正常系', () => {
    it('List 内で li 要素としてレンダリングされる', () => {
      renderInList(<ListItemButton>テスト</ListItemButton>)
      const listItem = screen.getByRole('listitem')
      expect(listItem).toBeInTheDocument()
      expect(screen.getByText('テスト')).toBeInTheDocument()
    })

    it('内部に type="button" のボタン要素を持つ', () => {
      renderInList(<ListItemButton>テスト</ListItemButton>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })

    it('クリックイベントが発火する', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      renderInList(<ListItemButton onClick={handleClick}>テスト</ListItemButton>)

      await user.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('className プロパティが li 要素に適用される', () => {
      renderInList(<ListItemButton className="custom-class">テスト</ListItemButton>)
      const listItem = screen.getByRole('listitem')
      expect(listItem).toHaveClass('custom-class')
    })

    it('id プロパティが li 要素に適用される', () => {
      const { container } = renderInList(<ListItemButton id="my-item">テスト</ListItemButton>)
      expect(container.querySelector('#my-item')).toBeInTheDocument()
    })
  })

  describe('disabled 状態', () => {
    it('disabled=true でボタンが無効状態になる', () => {
      renderInList(<ListItemButton disabled>テスト</ListItemButton>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('disabled=true でクリックイベントが発火しない', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      renderInList(
        <ListItemButton disabled onClick={handleClick}>
          テスト
        </ListItemButton>,
      )

      await user.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('リップルエフェクト', () => {
    it('クリック時にリップル要素が追加される', async () => {
      const user = userEvent.setup()
      renderInList(<ListItemButton>テスト</ListItemButton>)
      const button = screen.getByRole('button')

      await user.click(button)

      const ripple = button.querySelector('span')
      expect(ripple).not.toBeNull()
    })
  })

  describe('警告', () => {
    it('List 外でレンダリングされた場合に ConsoleWarning が呼び出される', () => {
      mockConsoleWarning.mockClear()
      render(<ListItemButton>テスト</ListItemButton>)
      expect(mockConsoleWarning).toHaveBeenCalledWith(
        '⚠ Warning: <ListItemButton> should be used inside <List>',
      )
    })
  })
})
