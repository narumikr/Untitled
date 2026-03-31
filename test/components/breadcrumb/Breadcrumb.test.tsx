import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Breadcrumb } from '@/components/breadcrumb/Breadcrumb'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('Breadcrumb', () => {
  describe('nav 要素とアクセシビリティ', () => {
    it('nav 要素としてレンダリングされる', () => {
      render(
        <Breadcrumb id="test">
          <span>Home</span>
        </Breadcrumb>,
      )
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('aria-label が "breadcrumb-{id}" で設定される', () => {
      render(
        <Breadcrumb id="main">
          <span>Home</span>
        </Breadcrumb>,
      )
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'breadcrumb-main')
    })

    it('children が ol > li 内にレンダリングされる', () => {
      render(
        <Breadcrumb id="nav">
          <span>Home</span>
          <span>About</span>
        </Breadcrumb>,
      )
      const nav = screen.getByRole('navigation')
      expect(nav.querySelector('ol')).toBeInTheDocument()
      expect(nav.querySelectorAll('li')).toHaveLength(2)
    })
  })

  describe('separator プロパティ', () => {
    it('デフォルトで "/" セパレーターが表示される', () => {
      render(
        <Breadcrumb id="sep">
          <span>Home</span>
          <span>About</span>
        </Breadcrumb>,
      )
      expect(screen.getByText('/')).toBeInTheDocument()
    })

    it('separator="arrow" で "→" が表示される', () => {
      render(
        <Breadcrumb id="sep" separator="arrow">
          <span>Home</span>
          <span>About</span>
        </Breadcrumb>,
      )
      expect(screen.getByText('→')).toBeInTheDocument()
    })

    it('separator="chevron" で ">" が表示される', () => {
      render(
        <Breadcrumb id="sep" separator="chevron">
          <span>Home</span>
          <span>About</span>
        </Breadcrumb>,
      )
      expect(screen.getByText('>')).toBeInTheDocument()
    })

    it('separator="dot" で "•" が表示される', () => {
      render(
        <Breadcrumb id="sep" separator="dot">
          <span>Home</span>
          <span>About</span>
        </Breadcrumb>,
      )
      expect(screen.getByText('•')).toBeInTheDocument()
    })

    it('separator="pipe" で "|" が表示される', () => {
      render(
        <Breadcrumb id="sep" separator="pipe">
          <span>Home</span>
          <span>About</span>
        </Breadcrumb>,
      )
      expect(screen.getByText('|')).toBeInTheDocument()
    })

    it('最後のアイテムの後にセパレーターが表示されない', () => {
      render(
        <Breadcrumb id="sep">
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
        </Breadcrumb>,
      )
      // セパレーターは items 間にのみ表示される（3アイテム → 2個）
      expect(screen.getAllByText('/')).toHaveLength(2)
    })
  })

  describe('共通プロパティ', () => {
    it('className が適用される', () => {
      render(
        <Breadcrumb id="cls" className="custom-breadcrumb">
          <span>Home</span>
        </Breadcrumb>,
      )
      expect(screen.getByRole('navigation')).toHaveClass('custom-breadcrumb')
    })

    it('data-testid が転送される', () => {
      render(
        <Breadcrumb id="tid" data-testid="my-breadcrumb">
          <span>Home</span>
        </Breadcrumb>,
      )
      expect(screen.getByTestId('my-breadcrumb')).toBeInTheDocument()
    })
  })
})
