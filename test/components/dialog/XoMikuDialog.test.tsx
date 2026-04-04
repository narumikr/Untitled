import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, it, expect, vi } from 'vitest'

import { XoMikuDialog } from '@/components/dialog/XoMikuDialog'

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
  children: <p>XoMiku content</p>,
}

describe('XoMikuDialog', () => {
  beforeEach(() => {
    onClose.mockClear()
  })
  it('open=true で role="dialog" で Portal 経由でレンダリングされる', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    render(<XoMikuDialog {...defaultProps} />, { container })

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(screen.getByText('XoMiku content')).toBeInTheDocument()
    expect(container.contains(dialog)).toBe(false)
    expect(document.body.contains(dialog)).toBe(true)

    document.body.removeChild(container)
  })

  it('Escape キーで onClose コールバックが呼び出される', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<XoMikuDialog {...defaultProps} onClose={onClose} />)

    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('aria-label 属性が title プロパティの値で設定される', () => {
    render(<XoMikuDialog {...defaultProps} title="XoMiku Title" />)

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'XoMiku Title')
  })

  it('title が未指定の場合 aria-label がデフォルト値 "Dialog" になる', () => {
    render(<XoMikuDialog {...defaultProps} />)

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Dialog')
  })

  it('className が転送される', () => {
    render(<XoMikuDialog {...defaultProps} className="custom-xomiku" />)

    expect(screen.getByRole('dialog')).toHaveClass('custom-xomiku')
  })

  it('data-testid が転送される', () => {
    render(<XoMikuDialog {...defaultProps} data-testid="my-xomiku-dialog" />)

    expect(screen.getByTestId('my-xomiku-dialog')).toBeInTheDocument()
  })
})
