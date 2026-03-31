import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

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

const defaultProps = {
  open: true,
  onClose: vi.fn(),
  children: <p>Window content</p>,
}

describe('WindowDialog', () => {
  it('open=true で role="dialog" で Portal 経由でレンダリングされる', () => {
    render(<WindowDialog {...defaultProps} />)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(screen.getByText('Window content')).toBeInTheDocument()
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
