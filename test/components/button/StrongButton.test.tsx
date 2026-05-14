import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { StrongButton } from '@/components/button/StrongButton'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('StrongButton', () => {
  describe('正常系', () => {
    it('デフォルトプロパティでレンダリングされる', () => {
      render(<StrongButton>テスト</StrongButton>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(screen.getByText('テスト')).toBeInTheDocument()
    })

    it('type="button" が設定される', () => {
      render(<StrongButton>テスト</StrongButton>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })

    it('クリックイベントが発火する', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<StrongButton onClick={handleClick}>テスト</StrongButton>)

      await user.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('className プロパティが適用される', () => {
      render(<StrongButton className="custom-class">テスト</StrongButton>)
      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })

    it('data-testid が転送される', () => {
      render(<StrongButton data-testid="my-button">テスト</StrongButton>)
      expect(screen.getByTestId('my-button')).toBeInTheDocument()
    })

    it('sekai プロパティで CSS 変数が設定される', () => {
      render(<StrongButton sekai="Miku">テスト</StrongButton>)
      const button = screen.getByRole('button')
      expect(button.style.getPropertyValue('--sekai-color')).toBe('#00CCBB')
    })

    it('modeTheme に応じたクラス名が適用される', () => {
      render(<StrongButton>テスト</StrongButton>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('sekai-strong-button-light')
    })
  })

  describe('disabled 状態', () => {
    it('disabled=true で無効状態になる', () => {
      render(<StrongButton disabled>テスト</StrongButton>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('disabled=true でクリックイベントが発火しない', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(
        <StrongButton disabled onClick={handleClick}>
          テスト
        </StrongButton>,
      )

      await user.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })
})
