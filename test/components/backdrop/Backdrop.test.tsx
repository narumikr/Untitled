import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { Backdrop } from '@/components/backdrop/Backdrop'

import { useOptionalSekai } from '@/internal/useOptionalSekai'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: vi.fn(() => ({
    sekaiColor: '#33ccba',
    modeTheme: 'light',
    isLight: true,
  })),
}))

vi.mock('@/internal/usePortalContainer', () => ({
  usePortalContainer: () => document.body,
}))

describe('Backdrop', () => {
  describe('正常系', () => {
    it('open=true で Portal 経由でレンダリングされる', () => {
      const root = document.createElement('div')
      document.body.appendChild(root)

      render(
        <Backdrop open={true}>
          <p>Backdrop content</p>
        </Backdrop>,
        { container: root },
      )

      const contentElement = screen.getByText('Backdrop content')
      expect(contentElement).toBeInTheDocument()
      expect(root).not.toContainElement(contentElement)
      expect(document.body).toContainElement(contentElement)

      document.body.removeChild(root)
    })

    it('open=true で sekai-backdrop-visible クラスが適用される', () => {
      render(
        <Backdrop open={true} data-testid="backdrop">
          <p>content</p>
        </Backdrop>,
      )

      const wrapper = screen.getByTestId('backdrop').parentElement
      expect(wrapper).toHaveClass('sekai-backdrop-visible')
    })

    it('open=false で sekai-backdrop-hidden クラスが適用される', () => {
      render(
        <Backdrop open={false} data-testid="backdrop">
          <p>content</p>
        </Backdrop>,
      )

      const wrapper = screen.getByTestId('backdrop').parentElement
      expect(wrapper).toHaveClass('sekai-backdrop-hidden')
    })

    it('children が表示される', () => {
      render(
        <Backdrop open={true}>
          <span>child element</span>
        </Backdrop>,
      )

      expect(screen.getByText('child element')).toBeInTheDocument()
    })

    it('className が転送される', () => {
      render(
        <Backdrop open={true} className="custom-class" data-testid="backdrop">
          <p>content</p>
        </Backdrop>,
      )

      expect(screen.getByTestId('backdrop')).toHaveClass('custom-class')
    })

    it('data-testid が転送される', () => {
      render(
        <Backdrop open={true} data-testid="my-backdrop">
          <p>content</p>
        </Backdrop>,
      )

      expect(screen.getByTestId('my-backdrop')).toBeInTheDocument()
    })

    describe('blur', () => {
      it('blur=false のとき sekai-overlay-light クラスが適用される', () => {
        render(
          <Backdrop open={true} blur={false} data-testid="backdrop">
            <p>content</p>
          </Backdrop>,
        )

        expect(screen.getByTestId('backdrop')).toHaveClass('sekai-overlay-light')
      })

      it('blur が未指定のとき sekai-overlay-light クラスが適用される', () => {
        render(
          <Backdrop open={true} data-testid="backdrop">
            <p>content</p>
          </Backdrop>,
        )

        expect(screen.getByTestId('backdrop')).toHaveClass('sekai-overlay-light')
      })

      it('blur=true のとき sekai-overlay-blur-light クラスが適用される', () => {
        render(
          <Backdrop open={true} blur={true} data-testid="backdrop">
            <p>content</p>
          </Backdrop>,
        )

        expect(screen.getByTestId('backdrop')).toHaveClass('sekai-overlay-blur-light')
      })

      it('blur=true のとき sekai-overlay-light クラスが適用されない', () => {
        render(
          <Backdrop open={true} blur={true} data-testid="backdrop">
            <p>content</p>
          </Backdrop>,
        )

        expect(screen.getByTestId('backdrop')).not.toHaveClass('sekai-overlay-light')
      })
    })
  })

  describe('dark モード', () => {
    beforeEach(() => {
      vi.mocked(useOptionalSekai).mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'dark',
        isLight: false,
      })
    })

    afterEach(() => {
      vi.mocked(useOptionalSekai).mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'light',
        isLight: true,
      })
    })

    it('blur=true のとき sekai-overlay-blur-dark クラスが適用される', () => {
      render(
        <Backdrop open={true} blur={true} data-testid="backdrop">
          <p>content</p>
        </Backdrop>,
      )

      expect(screen.getByTestId('backdrop')).toHaveClass('sekai-overlay-blur-dark')
    })

    it('blur=true のとき sekai-overlay-dark クラスが適用されない', () => {
      render(
        <Backdrop open={true} blur={true} data-testid="backdrop">
          <p>content</p>
        </Backdrop>,
      )

      expect(screen.getByTestId('backdrop')).not.toHaveClass('sekai-overlay-dark')
    })
  })
})
