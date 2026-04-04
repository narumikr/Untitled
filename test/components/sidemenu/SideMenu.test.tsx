import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { SideMenu } from '@/components/sidemenu/SideMenu'

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

describe('SideMenu', () => {
  const defaultProps = {
    open: true,
    children: <div>Menu Content</div>,
    'data-testid': 'side-menu',
  }

  describe('正常系', () => {
    it('open=true で Portal 経由で children を表示する', () => {
      render(<SideMenu {...defaultProps} />)
      expect(screen.getByText('Menu Content')).toBeInTheDocument()
    })

    it('open=true で open クラスが適用される', () => {
      render(<SideMenu {...defaultProps} />)
      expect(screen.getByTestId('side-menu')).toHaveClass('sekai-side-menu-open')
    })

    it('open=false で closed クラスが適用される', () => {
      render(<SideMenu {...defaultProps} open={false} />)
      expect(screen.getByTestId('side-menu')).toHaveClass('sekai-side-menu-closed')
    })

    it('デフォルトの pos="left" で対応するクラスが適用される', () => {
      render(<SideMenu {...defaultProps} />)
      expect(screen.getByTestId('side-menu')).toHaveClass('sekai-side-menu-left')
    })

    it('pos="right" で対応するクラスが適用される', () => {
      render(<SideMenu {...defaultProps} pos="right" />)
      expect(screen.getByTestId('side-menu')).toHaveClass('sekai-side-menu-right')
    })

    it('className プロパティが適用される', () => {
      render(<SideMenu {...defaultProps} className="custom-class" />)
      expect(screen.getByTestId('side-menu')).toHaveClass('custom-class')
    })

    it('data-testid が転送される', () => {
      render(<SideMenu {...defaultProps} data-testid="my-sidemenu" />)
      expect(screen.getByTestId('my-sidemenu')).toBeInTheDocument()
    })

    it('ハンバーガーボタンが表示される', () => {
      render(<SideMenu {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('open=true でハンバーガーボタンの aria-expanded="true" が設定される', () => {
      render(<SideMenu {...defaultProps} />)
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
    })

    it('open=false でハンバーガーボタンの aria-expanded="false" が設定される', () => {
      render(<SideMenu {...defaultProps} open={false} />)
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
    })

    it('id が指定された場合にハンバーガーボタンの id が設定される', () => {
      render(<SideMenu {...defaultProps} id="test-menu" />)
      expect(screen.getByRole('button')).toHaveAttribute('id', 'test-menu-side-menu-btn')
    })
  })

  describe('インタラクション', () => {
    it('ハンバーガーボタンクリック時にメニューの開閉状態が切り替わる', async () => {
      const user = userEvent.setup()
      render(<SideMenu {...defaultProps} open={false} />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'false')

      await user.click(button)
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })

    it('ハンバーガーボタンクリック時に onClick コールバックが呼び出される', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<SideMenu {...defaultProps} onClick={handleClick} />)

      await user.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('ハンバーガーボタンクリックで open 状態から closed 状態に切り替わる', async () => {
      const user = userEvent.setup()
      render(<SideMenu {...defaultProps} />)

      expect(screen.getByTestId('side-menu')).toHaveClass('sekai-side-menu-open')

      await user.click(screen.getByRole('button'))
      expect(screen.getByTestId('side-menu')).toHaveClass('sekai-side-menu-closed')
    })
  })
})
