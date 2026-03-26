import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { StylishButton } from '@/components/button/StylishButton'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('StylishButton', () => {
  describe('正常系', () => {
    it('デフォルトプロパティでレンダリングされる', () => {
      render(<StylishButton>テスト</StylishButton>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(screen.getByText('テスト')).toBeInTheDocument()
    })

    it('type="button" が設定される', () => {
      render(<StylishButton>テスト</StylishButton>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })

    it('クリックイベントが発火する', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<StylishButton onClick={handleClick}>テスト</StylishButton>)

      await user.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('className プロパティが適用される', () => {
      render(<StylishButton className="custom-class">テスト</StylishButton>)
      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })

    it('data-testid が転送される', () => {
      render(<StylishButton data-testid="my-button">テスト</StylishButton>)
      expect(screen.getByTestId('my-button')).toBeInTheDocument()
    })

    it('sekai プロパティで CSS 変数が設定される', () => {
      render(<StylishButton sekai="Miku">テスト</StylishButton>)
      const button = screen.getByRole('button')
      expect(button.style.getPropertyValue('--sekai-color')).toBe('#00CCBB')
    })

    it('modeTheme に応じたクラス名が適用される', () => {
      render(<StylishButton>テスト</StylishButton>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('sekai-stylish-button-light')
    })
  })

  describe('arrowIcon プロパティ', () => {
    it('arrowIcon=true（デフォルト）で矢印アイコンが表示される', () => {
      render(<StylishButton>テスト</StylishButton>)
      const button = screen.getByRole('button')
      const svgElement = button.querySelector('.sekai-stylish-arrow-icon')
      expect(svgElement).toBeInTheDocument()
    })

    it('arrowIcon=false で矢印アイコンが表示されない', () => {
      render(<StylishButton arrowIcon={false}>テスト</StylishButton>)
      const button = screen.getByRole('button')
      const svgElement = button.querySelector('.sekai-stylish-arrow-icon')
      expect(svgElement).not.toBeInTheDocument()
    })
  })

  describe('disabled 状態', () => {
    it('disabled=true で無効状態になる', () => {
      render(<StylishButton disabled>テスト</StylishButton>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('disabled=true でクリックイベントが発火しない', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(
        <StylishButton disabled onClick={handleClick}>
          テスト
        </StylishButton>,
      )

      await user.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })
})
