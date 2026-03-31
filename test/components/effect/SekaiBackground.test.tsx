import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { SekaiBackground } from '@/components/effect/SekaiBackground'

describe('SekaiBackground', () => {
  let getContextSpy: ReturnType<typeof vi.fn>
  let container: HTMLDivElement
  let rafSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 0)

    getContextSpy = vi.fn().mockReturnValue({
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 0,
      globalAlpha: 1,
    })
    HTMLCanvasElement.prototype.getContext =
      getContextSpy as unknown as typeof HTMLCanvasElement.prototype.getContext

    container = document.createElement('div')
    container.style.width = '800px'
    container.style.height = '600px'
    Object.defineProperty(container, 'offsetWidth', { value: 800, configurable: true })
    Object.defineProperty(container, 'offsetHeight', { value: 600, configurable: true })
    document.body.appendChild(container)
  })

  afterEach(() => {
    cleanup()
    container.remove()
    const root = document.getElementById('sekai-background-root')
    if (root) root.remove()
    rafSpy.mockRestore()
    vi.restoreAllMocks()
  })

  describe('正常系', () => {
    it('containerComponent 経由で canvas 要素がレンダリングされる', () => {
      render(<SekaiBackground containerComponent={container} />)
      const canvas = container.querySelector('canvas')
      expect(canvas).toBeInTheDocument()
    })

    it('containerComponent 未指定時にデフォルトの Portal ルートが作成される', () => {
      render(<SekaiBackground />)
      const root = document.getElementById('sekai-background-root')
      expect(root).toBeInTheDocument()
      const canvas = root?.querySelector('canvas')
      expect(canvas).toBeInTheDocument()
    })

    it('className プロパティがラップ要素に適用される', () => {
      render(<SekaiBackground containerComponent={container} className="custom-bg" />)
      const wrap = container.querySelector('.custom-bg')
      expect(wrap).toBeInTheDocument()
      expect(wrap?.querySelector('canvas')).toBeInTheDocument()
    })

    it('data-testid プロパティが転送される', () => {
      render(<SekaiBackground containerComponent={container} data-testid="sekai-bg" />)
      const el = container.querySelector('[data-testid="sekai-bg"]')
      expect(el).toBeInTheDocument()
    })

    it('bgOpacity が CSS 変数として設定される', () => {
      render(<SekaiBackground containerComponent={container} bgOpacity={0.5} />)
      const wrap = container.querySelector('div')
      expect(wrap).toHaveStyle({ '--bg-opacity': '0.5' })
    })
  })
})
