import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// requestAnimationFrame / cancelAnimationFrame モック
global.requestAnimationFrame = (cb: FrameRequestCallback) => {
  return setTimeout(cb, 0) as unknown as number
}
global.cancelAnimationFrame = (id: number) => clearTimeout(id)

// matchMedia モック
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// scrollTo モック
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo
