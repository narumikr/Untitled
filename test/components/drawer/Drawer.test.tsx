import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Drawer } from '@/components/drawer/Drawer'

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

describe('Drawer', () => {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    children: <div>Drawer Content</div>,
    'data-testid': 'drawer-contents',
  }

  describe('正常系', () => {
    it('open=true で children を表示する', () => {
      render(<Drawer {...defaultProps} />)
      expect(screen.getByText('Drawer Content')).toBeInTheDocument()
    })

    it('open=true で visible クラスが適用される', () => {
      render(<Drawer {...defaultProps} />)
      const overlay = screen.getByTestId('drawer-contents').parentElement!
      expect(overlay).toHaveClass('sekai-drawer-visible')
    })

    it('open=false で hidden クラスが適用される', () => {
      render(<Drawer {...defaultProps} open={false} />)
      const overlay = screen.getByTestId('drawer-contents').parentElement!
      expect(overlay).toHaveClass('sekai-drawer-hidden')
    })

    it('デフォルトの pos="right" で対応するクラスが適用される', () => {
      render(<Drawer {...defaultProps} />)
      expect(screen.getByTestId('drawer-contents')).toHaveClass('sekai-drawer-contents-right')
    })

    it('pos="left" で対応するクラスが適用される', () => {
      render(<Drawer {...defaultProps} pos="left" />)
      expect(screen.getByTestId('drawer-contents')).toHaveClass('sekai-drawer-contents-left')
    })

    it('pos="top" で対応するクラスが適用される', () => {
      render(<Drawer {...defaultProps} pos="top" />)
      expect(screen.getByTestId('drawer-contents')).toHaveClass('sekai-drawer-contents-top')
    })

    it('pos="bottom" で対応するクラスが適用される', () => {
      render(<Drawer {...defaultProps} pos="bottom" />)
      expect(screen.getByTestId('drawer-contents')).toHaveClass('sekai-drawer-contents-bottom')
    })

    it('className プロパティが contents 要素に適用される', () => {
      render(<Drawer {...defaultProps} className="custom-class" />)
      expect(screen.getByTestId('drawer-contents')).toHaveClass('custom-class')
    })

    it('data-testid が contents 要素に転送される', () => {
      render(<Drawer {...defaultProps} data-testid="my-drawer" />)
      expect(screen.getByTestId('my-drawer')).toBeInTheDocument()
    })

    it('contents 要素に role="presentation" が設定される', () => {
      render(<Drawer {...defaultProps} />)
      expect(screen.getByRole('presentation', { hidden: true })).toBeInTheDocument()
    })
  })

  describe('インタラクション', () => {
    it('オーバーレイクリック時に onClose が呼び出される', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()
      render(<Drawer {...defaultProps} onClose={handleClose} />)

      const overlay = screen.getByTestId('drawer-contents').parentElement!
      await user.click(overlay)
      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('contents 領域クリック時に onClose が呼び出されない', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()
      render(<Drawer {...defaultProps} onClose={handleClose} />)

      await user.click(screen.getByText('Drawer Content'))
      expect(handleClose).not.toHaveBeenCalled()
    })
  })
})
