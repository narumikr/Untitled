import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { ToggleButton } from '@/components/button/ToggleButton'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#33ccba',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('ToggleButton', () => {
  describe('アクセシビリティ', () => {
    it('role="switch" が設定される', () => {
      render(<ToggleButton checked={false} onChange={vi.fn()} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
    })

    it('checked=false のとき aria-checked="false" が設定される', () => {
      render(<ToggleButton checked={false} onChange={vi.fn()} />)
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
    })

    it('checked=true のとき aria-checked="true" が設定される', () => {
      render(<ToggleButton checked={true} onChange={vi.fn()} />)
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
    })
  })

  describe('onChange', () => {
    it('checked=false の状態でクリックすると onChange(true) が呼ばれる', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<ToggleButton checked={false} onChange={handleChange} />)

      await user.click(screen.getByRole('switch'))
      expect(handleChange).toHaveBeenCalledWith(true)
      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it('checked=true の状態でクリックすると onChange(false) が呼ばれる', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<ToggleButton checked={true} onChange={handleChange} />)

      await user.click(screen.getByRole('switch'))
      expect(handleChange).toHaveBeenCalledWith(false)
      expect(handleChange).toHaveBeenCalledTimes(1)
    })
  })

  describe('disabled 状態', () => {
    it('disabled=true でボタンが無効になる', () => {
      render(<ToggleButton checked={false} onChange={vi.fn()} disabled />)
      expect(screen.getByRole('switch')).toBeDisabled()
    })

    it('disabled=true でクリックしても onChange が呼ばれない', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<ToggleButton checked={false} onChange={handleChange} disabled />)

      await user.click(screen.getByRole('switch'))
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('labelText', () => {
    it('labelText が指定されると表示される', () => {
      render(<ToggleButton checked={false} onChange={vi.fn()} labelText="通知設定" />)
      expect(screen.getByText('通知設定')).toBeInTheDocument()
    })

    it('labelText が未指定の場合はラベル要素が存在しない', () => {
      render(<ToggleButton checked={false} onChange={vi.fn()} />)
      expect(screen.queryByTestId('toggle-label')).not.toBeInTheDocument()
    })
  })

  describe('sekai カラー', () => {
    it('--sekai-color CSS 変数が設定される', () => {
      render(<ToggleButton checked={false} onChange={vi.fn()} sekai="Miku" />)
      const button = screen.getByRole('switch')
      expect(button.style.getPropertyValue('--sekai-color')).toBe('#33ccba')
    })
  })

  describe('direction', () => {
    it('direction="vertical" でクラスが適用される', () => {
      render(<ToggleButton checked={false} onChange={vi.fn()} direction="vertical" />)
      expect(screen.getByRole('switch')).toHaveClass('sekai-toggle-button--vertical')
    })

    it('direction 未指定（horizontal）ではverticalクラスが付かない', () => {
      render(<ToggleButton checked={false} onChange={vi.fn()} />)
      expect(screen.getByRole('switch')).not.toHaveClass('sekai-toggle-button--vertical')
    })
  })

  describe('className / id', () => {
    it('className が適用される', () => {
      render(<ToggleButton checked={false} onChange={vi.fn()} className="custom" />)
      expect(screen.getByRole('switch')).toHaveClass('custom')
    })

    it('id が適用される', () => {
      render(<ToggleButton checked={false} onChange={vi.fn()} id="my-toggle" />)
      expect(screen.getByRole('switch')).toHaveAttribute('id', 'my-toggle')
    })
  })
})
