import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { TextArea } from '@/components/textfield/TextArea'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('TextArea', () => {
  describe('正常系', () => {
    it('デフォルトプロパティでレンダリングされる', () => {
      render(<TextArea />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('className プロパティが適用される', () => {
      const { container } = render(<TextArea className="custom-class" />)
      expect(container.firstChild).toHaveClass('custom-class')
    })

    it('data-testid プロパティが転送される', () => {
      const { container } = render(<TextArea data-testid="my-textarea" />)
      expect(container.firstChild).toHaveAttribute('data-testid', 'my-textarea')
    })

    it('id プロパティが設定される', () => {
      render(<TextArea id="my-area" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-area-textarea')
    })

    it('placeholder が設定される', () => {
      render(<TextArea placeholder="入力してください" />)
      expect(screen.getByPlaceholderText('入力してください')).toBeInTheDocument()
    })

    it('sekai プロパティで CSS 変数が設定される', () => {
      const { container } = render(<TextArea sekai="Miku" />)
      const root = container.firstChild as HTMLElement
      expect(root.style.getPropertyValue('--sekai-color')).toBe('#00CCBB')
    })
  })

  describe('テキスト入力', () => {
    it('テキスト入力時に onChange コールバックが呼び出される', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<TextArea onChange={handleChange} />)

      await user.type(screen.getByRole('textbox'), 'abc')
      expect(handleChange).toHaveBeenCalledTimes(3)
      expect(handleChange).toHaveBeenNthCalledWith(1, 'a')
      expect(handleChange).toHaveBeenNthCalledWith(2, 'b')
      expect(handleChange).toHaveBeenNthCalledWith(3, 'c')
    })
  })

  describe('文字数カウンター', () => {
    it('maxLength 設定時に文字数カウンターが表示される', () => {
      render(<TextArea value="abc" maxLength={10} />)
      expect(screen.getByText('3/10')).toBeInTheDocument()
    })

    it('maxLength 未設定時に文字数カウンターが表示されない', () => {
      render(<TextArea value="abc" />)
      expect(screen.queryByText(/\/\d+/)).not.toBeInTheDocument()
    })

    it('value が空の場合に 0/maxLength が表示される', () => {
      render(<TextArea value="" maxLength={100} />)
      expect(screen.getByText('0/100')).toBeInTheDocument()
    })
  })

  describe('無効状態', () => {
    it('disabled=true で textarea が無効化される', () => {
      render(<TextArea disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('disabled=true で入力操作が不可になる', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<TextArea disabled onChange={handleChange} />)

      await user.type(screen.getByRole('textbox'), 'hello')
      expect(handleChange).not.toHaveBeenCalled()
    })
  })
})
