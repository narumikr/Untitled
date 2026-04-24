import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, beforeEach, describe, it, expect, vi } from 'vitest'

import { Dropdown } from '@/components/dropdown/Dropdown'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

vi.mock('@/img/chevron', () => ({
  ChevronSvg: (props: Record<string, unknown>) => (
    <svg data-testid="chevron-svg" className={props.className as string} />
  ),
}))

vi.mock('@/utils/converter', () => ({
  convertHexToRgba: () => 'rgba(0,204,187,0.1)',
  convertHexToRgbaMixWithBlackOrWhite: () => 'rgba(0,0,0,0.2)',
}))

const mockObserve = vi.fn()

const OPEN_DELAY_MS = 10
const CLOSE_DELAY_MS = 200

describe('Dropdown', () => {
  const originalResizeObserver = globalThis.ResizeObserver

  beforeAll(() => {
    globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: mockObserve,
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
  })

  afterAll(() => {
    globalThis.ResizeObserver = originalResizeObserver
  })

  const onSelect = vi.fn()
  const defaultProps = {
    options: [
      { label: 'オプション1', value: 'option1' },
      { label: 'オプション2', value: 'option2' },
      { label: 'オプション3', value: 'option3' },
    ],
    onSelect,
    placeholder: '選択してください',
  }

  beforeEach(() => {
    vi.useFakeTimers()
    onSelect.mockClear()
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  describe('正常系', () => {
    it('placeholder テキストが表示される', () => {
      render(<Dropdown {...defaultProps} />)
      expect(screen.getByText('選択してください')).toBeInTheDocument()
    })

    it('className プロパティが適用される', () => {
      const { container } = render(<Dropdown {...defaultProps} className="custom-class" />)
      expect(container.firstChild).toHaveClass('custom-class')
    })

    it('data-testid が転送される', () => {
      render(<Dropdown {...defaultProps} data-testid="my-dropdown" />)
      expect(screen.getByTestId('my-dropdown')).toBeInTheDocument()
    })
  })

  describe('インタラクション', () => {
    it('トリガーボタンクリック時にオプションリストが表示される', () => {
      render(<Dropdown {...defaultProps} />)

      const trigger = screen.getByRole('button')
      fireEvent.click(trigger)

      act(() => {
        vi.advanceTimersByTime(OPEN_DELAY_MS)
      })

      expect(screen.getByText('オプション1')).toBeInTheDocument()
      expect(screen.getByText('オプション2')).toBeInTheDocument()
      expect(screen.getByText('オプション3')).toBeInTheDocument()
    })

    it('オプション選択時に onSelect コールバックが選択値で呼び出される', () => {
      const onSelect = vi.fn()
      render(<Dropdown {...defaultProps} onSelect={onSelect} />)

      const trigger = screen.getByRole('button')
      fireEvent.click(trigger)

      act(() => {
        vi.advanceTimersByTime(OPEN_DELAY_MS)
      })

      fireEvent.click(screen.getByText('オプション2'))
      expect(onSelect).toHaveBeenCalledWith('option2')
    })

    it('オプション選択後にドロップダウンが閉じる', () => {
      render(<Dropdown {...defaultProps} />)

      const trigger = screen.getByRole('button')
      fireEvent.click(trigger)

      act(() => {
        vi.advanceTimersByTime(OPEN_DELAY_MS)
      })

      fireEvent.click(screen.getByText('オプション1'))

      act(() => {
        vi.advanceTimersByTime(CLOSE_DELAY_MS)
      })

      // 選択したオプションのラベルがトリガーに表示される
      expect(screen.getByText('オプション1')).toBeInTheDocument()
      // 他のオプションは非表示
      expect(screen.queryByText('オプション2')).not.toBeInTheDocument()
    })
  })
})
