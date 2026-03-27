import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Chip } from '@/components/select/Chip'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('Chip', () => {
  describe('正常系', () => {
    it('デフォルトプロパティでレンダリングされる', () => {
      render(<Chip label="テスト" />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('label プロパティのテキストが表示される', () => {
      render(<Chip label="タグ名" />)
      expect(screen.getByText('タグ名')).toBeInTheDocument()
    })

    it('className がルート要素に適用される', () => {
      render(<Chip label="テスト" className="custom-class" />)
      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })

    it('data-testid が転送される', () => {
      render(<Chip label="テスト" data-testid="my-chip" />)
      expect(screen.getByTestId('my-chip')).toBeInTheDocument()
    })

    it('sekai プロパティで CSS 変数が設定される', () => {
      render(<Chip label="テスト" sekai="Miku" />)
      const chip = screen.getByRole('button')
      expect(chip.style.getPropertyValue('--sekai-color')).toBe('#00CCBB')
    })

    it('クリック時に onClick コールバックが呼び出される', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Chip label="テスト" onClick={handleClick} />)

      await user.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('Enter キーで onClick コールバックが呼び出される', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Chip label="テスト" onClick={handleClick} />)

      screen.getByRole('button').focus()
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('Space キーで onClick コールバックが呼び出される', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Chip label="テスト" onClick={handleClick} />)

      screen.getByRole('button').focus()
      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('削除ボタン', () => {
    it('onDelete が渡された場合に削除ボタンが表示される', () => {
      const handleDelete = vi.fn()
      render(<Chip label="テスト" onDelete={handleDelete} />)
      expect(screen.getByRole('button', { name: 'delete' })).toBeInTheDocument()
    })

    it('onDelete が渡されていない場合に削除ボタンが表示されない', () => {
      render(<Chip label="テスト" />)
      expect(screen.queryByRole('button', { name: 'delete' })).not.toBeInTheDocument()
    })

    it('削除ボタンクリック時に onDelete コールバックが呼び出される', async () => {
      const user = userEvent.setup()
      const handleDelete = vi.fn()
      render(<Chip label="テスト" onDelete={handleDelete} />)

      await user.click(screen.getByRole('button', { name: 'delete' }))
      expect(handleDelete).toHaveBeenCalledTimes(1)
    })
  })

  describe('size プロパティ', () => {
    it('size="small" で sekai-chip-small クラスが付与される', () => {
      render(<Chip label="テスト" size="small" />)
      expect(screen.getByRole('button')).toHaveClass('sekai-chip-small')
    })

    it('size="medium" で sekai-chip-medium クラスが付与される', () => {
      render(<Chip label="テスト" size="medium" />)
      expect(screen.getByRole('button')).toHaveClass('sekai-chip-medium')
    })

    it('size="large" で sekai-chip-large クラスが付与される', () => {
      render(<Chip label="テスト" size="large" />)
      expect(screen.getByRole('button')).toHaveClass('sekai-chip-large')
    })

    it('size 未指定時にデフォルトで sekai-chip-medium クラスが付与される', () => {
      render(<Chip label="テスト" />)
      expect(screen.getByRole('button')).toHaveClass('sekai-chip-medium')
    })
  })

  describe('variant プロパティ', () => {
    it('variant="filled" で sekai-chip-filled クラスが付与される', () => {
      render(<Chip label="テスト" variant="filled" />)
      expect(screen.getByRole('button')).toHaveClass('sekai-chip-filled')
    })

    it('variant="outlined" で sekai-chip-outlined クラスが付与される', () => {
      render(<Chip label="テスト" variant="outlined" />)
      expect(screen.getByRole('button')).toHaveClass('sekai-chip-outlined')
    })

    it('variant 未指定時にデフォルトで sekai-chip-filled クラスが付与される', () => {
      render(<Chip label="テスト" />)
      expect(screen.getByRole('button')).toHaveClass('sekai-chip-filled')
    })
  })
})
