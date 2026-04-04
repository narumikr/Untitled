import { render, screen } from '@testing-library/react'
import { beforeEach, describe, it, expect, vi } from 'vitest'

import { WindowDialog } from '@/components/dialog/WindowDialog'

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
  children: <p>Window content</p>,
}

describe('WindowDialog', () => {
  beforeEach(() => {
    onClose.mockClear()
  })
  it('open=true で role="dialog" で Portal 経由でレンダリングされる', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)

    render(<WindowDialog {...defaultProps} />, { container: root })

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(screen.getByText('Window content')).toBeInTheDocument()
    expect(root.contains(dialog)).toBe(false)
    expect(document.body.contains(dialog)).toBe(true)

    document.body.removeChild(root)
  })

  it('open=false で非表示クラスを持つ', () => {
    render(<WindowDialog {...defaultProps} open={false} data-testid="window-dialog" />)

    const dialog = screen.getByTestId('window-dialog')
    expect(dialog).toHaveClass('sekai-dialog-hidden')
  })

  it('className が転送される', () => {
    render(<WindowDialog {...defaultProps} className="custom-window" />)

    expect(screen.getByRole('dialog')).toHaveClass('custom-window')
  })

  it('data-testid が転送される', () => {
    render(<WindowDialog {...defaultProps} data-testid="my-window-dialog" />)

    expect(screen.getByTestId('my-window-dialog')).toBeInTheDocument()
  })
})
