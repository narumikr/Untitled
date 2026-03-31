import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Loading } from '@/components/loading/Loading'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('Loading', () => {
  it('role="status" が設定される', () => {
    render(<Loading />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('aria-live="polite" が設定される', () => {
    render(<Loading />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')
  })

  it('8つのサークル要素がレンダリングされる', () => {
    render(<Loading />)
    const container = screen.getByRole('status')
    expect(container.children).toHaveLength(8)
  })

  it('className が適用される', () => {
    render(<Loading className="custom-loading" />)
    expect(screen.getByRole('status')).toHaveClass('custom-loading')
  })

  it('sekai プロパティで --sekai-color CSS 変数が設定される', () => {
    render(<Loading sekai="miku" />)
    const el = screen.getByRole('status')
    expect(el.style.getPropertyValue('--sekai-color')).toBe('#00CCBB')
  })
})
