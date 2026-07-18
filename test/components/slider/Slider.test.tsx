import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Slider } from '@/components/slider/Slider'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#33ccba',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('Slider', () => {
  describe('アクセシビリティ', () => {
    it('role="slider" が設定される', () => {
      render(<Slider value={40} />)
      expect(screen.getByRole('slider')).toBeInTheDocument()
    })

    it('aria-valuemin / aria-valuemax / aria-valuenow が min/max/value と一致する', () => {
      render(<Slider value={40} min={0} max={100} />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuemin', '0')
      expect(slider).toHaveAttribute('aria-valuemax', '100')
      expect(slider).toHaveAttribute('aria-valuenow', '40')
    })

    it('aria-orientation="horizontal" が設定される (デフォルト)', () => {
      render(<Slider value={40} />)
      expect(screen.getByRole('slider')).toHaveAttribute('aria-orientation', 'horizontal')
    })

    it('aria-orientation="vertical" が設定される', () => {
      render(<Slider value={40} orientation="vertical" />)
      expect(screen.getByRole('slider')).toHaveAttribute('aria-orientation', 'vertical')
    })
  })

  describe('onChange', () => {
    it('値変更時に onChange が新しい値 (number) で呼ばれる', () => {
      const handleChange = vi.fn()
      render(<Slider value={40} onChange={handleChange} />)

      fireEvent.change(screen.getByRole('slider'), { target: { value: '60' } })
      expect(handleChange).toHaveBeenCalledWith(60)
      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it('onChange が未指定でも値変更でエラーにならない', () => {
      render(<Slider value={40} />)
      expect(() =>
        fireEvent.change(screen.getByRole('slider'), { target: { value: '60' } }),
      ).not.toThrow()
    })

    it('値変更後、aria-valuenow が新しい値に更新される', () => {
      render(<Slider value={40} />)
      const slider = screen.getByRole('slider')
      fireEvent.change(slider, { target: { value: '75' } })
      expect(slider).toHaveAttribute('aria-valuenow', '75')
    })
  })

  describe('defaultValue', () => {
    it('defaultValue が優先されて初期値として反映される', () => {
      render(<Slider value={10} defaultValue={70} />)
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '70')
    })

    it('defaultValue が未指定なら value が初期値として使われる', () => {
      render(<Slider value={25} />)
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '25')
    })
  })

  describe('disabled 状態', () => {
    it('disabled=true で slider が無効になる', () => {
      render(<Slider value={40} disabled />)
      expect(screen.getByRole('slider')).toBeDisabled()
    })

    it('disabled=true で disabled クラスが root に適用される', () => {
      const { container } = render(<Slider value={40} disabled />)
      expect(container.firstChild).toHaveClass('sekai-slider--disabled')
    })

    it('disabled=false (未指定) では disabled クラスが付かない', () => {
      const { container } = render(<Slider value={40} />)
      expect(container.firstChild).not.toHaveClass('sekai-slider--disabled')
    })
  })

  describe('min / max / step', () => {
    it('min / max / step 属性が input に伝搬される', () => {
      render(<Slider value={50} min={10} max={90} step={5} />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('min', '10')
      expect(slider).toHaveAttribute('max', '90')
      expect(slider).toHaveAttribute('step', '5')
    })

    it('min / max / step のデフォルト値 (0 / 100 / 1) が使用される', () => {
      render(<Slider value={40} />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('min', '0')
      expect(slider).toHaveAttribute('max', '100')
      expect(slider).toHaveAttribute('step', '1')
    })
  })

  describe('showValue', () => {
    it('showValue=true で現在の値がテキストとして表示される', () => {
      render(<Slider value={42} showValue />)
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('showValue=false (デフォルト) では値のテキストが表示されない', () => {
      render(<Slider value={42} />)
      expect(screen.queryByText('42')).not.toBeInTheDocument()
    })

    it('showValue=true で値変更後、表示テキストも更新される', () => {
      render(<Slider value={20} showValue />)
      expect(screen.getByText('20')).toBeInTheDocument()
      fireEvent.change(screen.getByRole('slider'), { target: { value: '75' } })
      expect(screen.getByText('75')).toBeInTheDocument()
    })
  })

  describe('orientation', () => {
    it('orientation="vertical" で vertical クラスが root に適用される', () => {
      const { container } = render(<Slider value={40} orientation="vertical" />)
      expect(container.firstChild).toHaveClass('sekai-slider--vertical')
    })

    it('orientation="horizontal" (デフォルト) では vertical クラスが付かない', () => {
      const { container } = render(<Slider value={40} />)
      expect(container.firstChild).not.toHaveClass('sekai-slider--vertical')
    })
  })

  describe('className / id', () => {
    it('className が root 要素に適用される', () => {
      const { container } = render(<Slider value={40} className="custom-slider" />)
      expect(container.firstChild).toHaveClass('custom-slider')
    })

    it('id が root 要素に設定される', () => {
      const { container } = render(<Slider value={40} id="my-slider" />)
      expect(container.firstChild).toHaveAttribute('id', 'my-slider')
    })
  })
})

describe('Slider - CSS 変数 / percent 計算', () => {
  describe('sekai カラー / CSS 変数', () => {
    it('--sekai-color が sekaiColor で設定される', () => {
      const { container } = render(<Slider value={40} sekai="Miku" />)
      const root = container.firstChild as HTMLElement
      expect(root.style.getPropertyValue('--sekai-color')).toBe('#33ccba')
    })

    it('--sekai-color-track が rgba 形式で設定される', () => {
      const { container } = render(<Slider value={40} sekai="Miku" />)
      const root = container.firstChild as HTMLElement
      expect(root.style.getPropertyValue('--sekai-color-track')).toMatch(/^rgba\(/)
    })

    it('--sekai-slider-percent が value に対応するパーセント文字列で設定される', () => {
      const { container } = render(<Slider value={30} min={0} max={100} />)
      const root = container.firstChild as HTMLElement
      expect(root.style.getPropertyValue('--sekai-slider-percent')).toBe('30%')
    })
  })

  describe('percent の範囲外 clamp', () => {
    it('value < min のとき --sekai-slider-percent が 0% にclampされる', () => {
      const { container } = render(<Slider value={-10} min={0} max={100} />)
      const root = container.firstChild as HTMLElement
      expect(root.style.getPropertyValue('--sekai-slider-percent')).toBe('0%')
    })

    it('value > max のとき --sekai-slider-percent が 100% にclampされる', () => {
      const { container } = render(<Slider value={150} min={0} max={100} />)
      const root = container.firstChild as HTMLElement
      expect(root.style.getPropertyValue('--sekai-slider-percent')).toBe('100%')
    })

    it('min === max のとき --sekai-slider-percent は 0% になる (0除算回避)', () => {
      const { container } = render(<Slider value={5} min={5} max={5} />)
      const root = container.firstChild as HTMLElement
      expect(root.style.getPropertyValue('--sekai-slider-percent')).toBe('0%')
    })

    it('カスタム範囲 (min=0, max=200) で正しくパーセント換算される', () => {
      const { container } = render(<Slider value={50} min={0} max={200} />)
      const root = container.firstChild as HTMLElement
      expect(root.style.getPropertyValue('--sekai-slider-percent')).toBe('25%')
    })
  })
})
