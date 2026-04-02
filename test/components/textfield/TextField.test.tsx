import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { TextField } from '@/components/textfield/TextField'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('TextField', () => {
  describe('正常系', () => {
    it('デフォルトプロパティでレンダリングされる', () => {
      render(<TextField />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('className プロパティが適用される', () => {
      const { container } = render(<TextField className="custom-class" />)
      expect(container.firstChild).toHaveClass('custom-class')
    })

    it('id プロパティが設定される', () => {
      const { container } = render(<TextField id="my-field" />)
      expect(container.firstChild).toHaveAttribute('id', 'my-field')
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-field-input')
    })

    it('placeholder が設定される', () => {
      render(<TextField placeholder="入力してください" />)
      expect(screen.getByPlaceholderText('入力してください')).toBeInTheDocument()
    })

    it('sekai プロパティで CSS 変数が設定される', () => {
      const { container } = render(<TextField sekai="Miku" />)
      const root = container.firstChild as HTMLElement
      expect(root.style.getPropertyValue('--sekai-color')).toBe('#00CCBB')
    })
  })

  describe('テキスト入力', () => {
    it('テキスト入力時に onChangeInput コールバックが入力値で呼び出される', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<TextField onChangeInput={handleChange} />)

      await user.type(screen.getByRole('textbox'), 'hello')
      expect(handleChange).toHaveBeenCalledWith('h')
      expect(handleChange).toHaveBeenCalledWith('he')
      expect(handleChange).toHaveBeenCalledWith('hel')
      expect(handleChange).toHaveBeenCalledWith('hell')
      expect(handleChange).toHaveBeenCalledWith('hello')
      expect(handleChange).toHaveBeenCalledTimes(5)
    })

    it('入力値が input 要素に反映される', async () => {
      const user = userEvent.setup()
      render(<TextField />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'テスト')
      expect(input).toHaveValue('テスト')
    })
  })

  describe('クリアボタン', () => {
    it('入力値がある場合にクリアボタンが表示される', async () => {
      const user = userEvent.setup()
      render(<TextField />)

      await user.type(screen.getByRole('textbox'), 'text')
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('入力値が空の場合にクリアボタンが非表示になる', () => {
      render(<TextField />)
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('クリアボタンクリック時に入力値が空になり onChangeInput が空文字列で呼び出される', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<TextField onChangeInput={handleChange} />)

      await user.type(screen.getByRole('textbox'), 'hello')
      handleChange.mockClear()

      await user.click(screen.getByRole('button'))
      expect(screen.getByRole('textbox')).toHaveValue('')
      expect(handleChange).toHaveBeenCalledWith('')
    })

    it('showClearButton=false でクリアボタンが非表示になる', async () => {
      const user = userEvent.setup()
      render(<TextField showClearButton={false} />)

      await user.type(screen.getByRole('textbox'), 'text')
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })

  describe('エラー状態', () => {
    it('isError=true でエラーメッセージが表示される', () => {
      render(<TextField isError errorMessage="入力エラーです" />)
      expect(screen.getByText('入力エラーです')).toBeInTheDocument()
    })

    it('isError=false でエラーメッセージが表示されない', () => {
      render(<TextField isError={false} errorMessage="入力エラーです" />)
      expect(screen.queryByText('入力エラーです')).not.toBeInTheDocument()
    })
  })
})
