import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { HamburgerButton } from '@/components/button/HamburgerButton'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('HamburgerButton', () => {
  describe('正常系', () => {
    it('デフォルトプロパティでレンダリングされる', () => {
      render(<HamburgerButton open={false} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('data-testid が転送される', () => {
      render(<HamburgerButton open={false} data-testid="hamburger" />)
      expect(screen.getByTestId('hamburger')).toBeInTheDocument()
    })

    it('className プロパティが適用される', () => {
      render(<HamburgerButton open={false} className="custom-class" />)
      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })

    it('open=false で aria-expanded="false" が設定される', () => {
      render(<HamburgerButton open={false} />)
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
    })

    it('open=true で aria-expanded="true" が設定される', () => {
      render(<HamburgerButton open={true} />)
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
    })

    it('open=false で aria-label="Open menu" が設定される', () => {
      render(<HamburgerButton open={false} />)
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Open menu')
    })

    it('open=true で aria-label="Close menu" が設定される', () => {
      render(<HamburgerButton open={true} />)
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Close menu')
    })

    it('クリックイベントが発火する', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<HamburgerButton open={false} onClick={handleClick} />)

      await user.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })
})
