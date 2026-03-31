import { render } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { IntoTheSekai } from '@/components/effect/IntoTheSekai'

vi.mock('@/internal/usePortalContainer', () => ({
  usePortalContainer: () => document.body,
}))

describe('IntoTheSekai', () => {
  let getContextSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    getContextSpy = vi.fn().mockReturnValue({
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      fill: vi.fn(),
      fillStyle: '',
    })
    HTMLCanvasElement.prototype.getContext =
      getContextSpy as unknown as typeof HTMLCanvasElement.prototype.getContext
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('正常系', () => {
    it('Portal 経由で canvas 要素がレンダリングされる', () => {
      render(<IntoTheSekai />)
      const canvas = document.body.querySelector('canvas')
      expect(canvas).toBeInTheDocument()
      expect(canvas).toHaveClass('into-the-sekai')
    })

    it('className プロパティが canvas 要素に適用される', () => {
      render(<IntoTheSekai className="custom-effect" />)
      const canvas = document.body.querySelector('canvas')
      expect(canvas).toHaveClass('into-the-sekai')
      expect(canvas).toHaveClass('custom-effect')
    })

    it('style プロパティが canvas 要素に適用される', () => {
      render(<IntoTheSekai style={{ opacity: 0.5 }} />)
      const canvas = document.body.querySelector('canvas')
      expect(canvas).toHaveStyle({ opacity: '0.5' })
    })

    it('data-testid プロパティが canvas 要素に転送される', () => {
      render(<IntoTheSekai data-testid="sekai-canvas" />)
      const canvas = document.body.querySelector('[data-testid="sekai-canvas"]')
      expect(canvas).toBeInTheDocument()
      expect(canvas?.tagName).toBe('CANVAS')
    })
  })
})
