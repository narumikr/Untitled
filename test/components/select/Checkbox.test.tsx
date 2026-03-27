import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Checkbox } from '@/components/select/Checkbox'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('Checkbox', () => {
  describe('正常系', () => {
    it('デフォルトプロパティでレンダリングされる', () => {
      render(<Checkbox />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
    })

    it('className がルート要素に適用される', () => {
      const { container } = render(<Checkbox className="custom-class" />)
      const label = container.querySelector('label')
      expect(label).toHaveClass('custom-class')
    })

    it('data-testid が input 要素に転送される', () => {
      render(<Checkbox data-testid="my-checkbox" />)
      const input = screen.getByTestId('my-checkbox')
      expect(input.tagName).toBe('INPUT')
    })

    it('sekai プロパティで CSS 変数が設定される', () => {
      const { container } = render(<Checkbox sekai="Miku" />)
      const label = container.querySelector('label')!
      expect(label.style.getPropertyValue('--sekai-color')).toBe('#00CCBB')
    })

    it('aria-checked が checked=true に応じて true に設定される', () => {
      render(<Checkbox checked={true} />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
    })

    it('aria-checked が checked=false に応じて false に設定される', () => {
      render(<Checkbox checked={false} />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false')
    })

    it('checked 未指定時に aria-checked が false に設定される', () => {
      render(<Checkbox />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false')
    })

    it('クリック時に onChange コールバックがチェック状態で呼び出される', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Checkbox checked={false} onChange={handleChange} />)

      await user.click(screen.getByRole('checkbox'))
      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it('tabIndex がデフォルトで 0 に設定される', () => {
      render(<Checkbox />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('tabindex', '0')
    })

    it('filling=true で sekai-checkbox-filling クラスが付与される', () => {
      render(<Checkbox filling />)
      expect(screen.getByRole('checkbox')).toHaveClass('sekai-checkbox-filling')
    })

    it('filling 未指定時に sekai-checkbox-filling クラスが付与されない', () => {
      render(<Checkbox />)
      expect(screen.getByRole('checkbox')).not.toHaveClass('sekai-checkbox-filling')
    })
  })

  describe('disabled 状態', () => {
    it('disabled=true で tabIndex=-1 が設定される', () => {
      render(<Checkbox disabled />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('tabindex', '-1')
    })

    it('disabled=true で無効状態になる', () => {
      render(<Checkbox disabled />)
      expect(screen.getByRole('checkbox')).toBeDisabled()
    })

    it('disabled=true でクリックしても onChange が呼び出されない', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Checkbox disabled checked={false} onChange={handleChange} />)

      await user.click(screen.getByRole('checkbox'))
      expect(handleChange).not.toHaveBeenCalled()
    })
  })
})
