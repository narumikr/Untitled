import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, it, expect, vi } from 'vitest'

import { Dialog } from '@/components/dialog/Dialog'

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

const onClose = vi.fn()
const defaultProps = {
  open: true,
  onClose,
  children: <p>Dialog content</p>,
}

describe('Dialog', () => {
  beforeEach(() => {
    onClose.mockClear()
  })
  describe('正常系', () => {
    it('open=true で role="dialog" で Portal 経由でレンダリングされる', () => {
      render(<Dialog {...defaultProps} />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
      expect(screen.getByText('Dialog content')).toBeInTheDocument()
    })

    it('open=false で Backdrop が非表示クラスを持つ', () => {
      render(<Dialog {...defaultProps} open={false} data-testid="dialog" />)

      const dialog = screen.getByTestId('dialog')
      const backdrop = dialog.parentElement
      expect(backdrop?.parentElement).toHaveClass('sekai-backdrop-hidden')
    })

    it('aria-label 属性が title プロパティの値で設定される', () => {
      render(<Dialog {...defaultProps} title="My Dialog" />)

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'My Dialog')
    })

    it('title が未指定の場合 aria-label がデフォルト値 "Dialog" になる', () => {
      render(<Dialog {...defaultProps} />)

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Dialog')
    })

    it('showCloseIcon=true で閉じるボタンが表示される', () => {
      render(<Dialog {...defaultProps} title="Test" showCloseIcon={true} />)

      const closeButton = screen.getByRole('button')
      expect(closeButton).toBeInTheDocument()
    })

    it('showCloseIcon=false で閉じるボタンが表示されない', () => {
      render(<Dialog {...defaultProps} title="Test" showCloseIcon={false} />)

      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('閉じるボタンクリック時に onClose が呼び出される', async () => {
      const onClose = vi.fn()
      const user = userEvent.setup()
      render(<Dialog {...defaultProps} onClose={onClose} title="Test" showCloseIcon={true} />)

      await user.click(screen.getByRole('button'))
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('Escape キーで onClose コールバックが呼び出される', async () => {
      const onClose = vi.fn()
      const user = userEvent.setup()
      render(<Dialog {...defaultProps} onClose={onClose} />)

      await user.keyboard('{Escape}')
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('buttons プロパティでボタンが表示される', () => {
      const buttons = [
        { text: 'Cancel', onClick: vi.fn() },
        { text: 'OK', onClick: vi.fn() },
      ]
      render(<Dialog {...defaultProps} buttons={buttons} />)

      expect(screen.getByText('Cancel')).toBeInTheDocument()
      expect(screen.getByText('OK')).toBeInTheDocument()
    })

    it('buttons が3つ渡されても最大2つまで表示される', () => {
      const buttons = [
        { text: 'First', onClick: vi.fn() },
        { text: 'Second', onClick: vi.fn() },
        { text: 'Third', onClick: vi.fn() },
      ]
      render(<Dialog {...defaultProps} buttons={buttons} />)

      expect(screen.getByText('First')).toBeInTheDocument()
      expect(screen.getByText('Second')).toBeInTheDocument()
      expect(screen.queryByText('Third')).not.toBeInTheDocument()
    })

    it('className が転送される', () => {
      render(<Dialog {...defaultProps} className="custom-dialog" />)

      expect(screen.getByRole('dialog')).toHaveClass('custom-dialog')
    })

    it('data-testid が転送される', () => {
      render(<Dialog {...defaultProps} data-testid="my-dialog" />)

      expect(screen.getByTestId('my-dialog')).toBeInTheDocument()
    })
  })
})
