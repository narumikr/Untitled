import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, it, expect, vi } from 'vitest'

import { XxMikuDialog } from '@/components/dialog/XxMikuDialog'

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
  children: <p>XxMiku content</p>,
}

describe('XxMikuDialog', () => {
  beforeEach(() => {
    onClose.mockClear()
  })
  it('open=true で role="dialog" で Portal 経由でレンダリングされる', () => {
    render(<XxMikuDialog {...defaultProps} />)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(screen.getByText('XxMiku content')).toBeInTheDocument()
  })

  it('Escape キーで onClose コールバックが呼び出される', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<XxMikuDialog {...defaultProps} onClose={onClose} />)

    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('aria-label 属性が title プロパティの値で設定される', () => {
    render(<XxMikuDialog {...defaultProps} title="XxMiku Title" />)

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'XxMiku Title')
  })

  it('title が未指定の場合 aria-label がデフォルト値 "Dialog" になる', () => {
    render(<XxMikuDialog {...defaultProps} />)

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Dialog')
  })

  it('className が転送される', () => {
    render(<XxMikuDialog {...defaultProps} className="custom-xxmiku" />)

    expect(screen.getByRole('dialog')).toHaveClass('custom-xxmiku')
  })

  it('data-testid が転送される', () => {
    render(<XxMikuDialog {...defaultProps} data-testid="my-xxmiku-dialog" />)

    expect(screen.getByTestId('my-xxmiku-dialog')).toBeInTheDocument()
  })
})
