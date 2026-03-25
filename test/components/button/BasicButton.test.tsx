import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { BasicButton } from '@/components/button/BasicButton'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('BasicButton', () => {
  describe('正常系', () => {
    it('デフォルトプロパティでレンダリングされる', () => {
      render(<BasicButton>テスト</BasicButton>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(screen.getByText('テスト')).toBeInTheDocument()
    })

    it('type="button" が設定される', () => {
      render(<BasicButton>テスト</BasicButton>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })

    it('クリックイベントが発火する', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<BasicButton onClick={handleClick}>テスト</BasicButton>)

      await user.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('className プロパティが適用される', () => {
      render(<BasicButton className="custom-class">テスト</BasicButton>)
      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })

    it('data-testid が転送される', () => {
      render(<BasicButton data-testid="my-button">テスト</BasicButton>)
      expect(screen.getByTestId('my-button')).toBeInTheDocument()
    })

    it('sekai プロパティで CSS 変数が設定される', () => {
      render(<BasicButton sekai="Miku">テスト</BasicButton>)
      const button = screen.getByRole('button')
      expect(button.style.getPropertyValue('--sekai-color')).toBe('#00CCBB')
    })

    it('withTextSekaiColor=true でテキストカラーに sekai カラーが適用される', () => {
      render(<BasicButton withTextSekaiColor>テスト</BasicButton>)
      const button = screen.getByRole('button')
      // jsdom が hex (#00CCBB) を rgb 形式に正規化するため rgb() で検証
      expect(button.style.color).toBe('rgb(0, 204, 187)')
    })

    it('withTextSekaiColor=false でテキストカラーが設定されない', () => {
      render(<BasicButton>テスト</BasicButton>)
      const button = screen.getByRole('button')
      expect(button.style.color).toBe('')
    })

    it('modeTheme に応じたクラス名が適用される', () => {
      render(<BasicButton>テスト</BasicButton>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('sekai-basic-button-light')
    })
  })

  describe('disabled 状態', () => {
    it('disabled=true で無効状態になる', () => {
      render(<BasicButton disabled>テスト</BasicButton>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('disabled=true でクリックイベントが発火しない', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(
        <BasicButton disabled onClick={handleClick}>
          テスト
        </BasicButton>,
      )

      await user.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })
})
