import { render, screen, act, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { DoReMeetEffect } from '@/components/effect/DoReMeetEffect'

import { colorsSekai } from '@/styles/sekai-colors'

import type { ColorsSekaiKey } from '@/styles/sekai-colors'

// DoReMeetEffect は useOptionalSekai から modeTheme のみ使用する
// (sekaiColor は使わず colorsSekai[sekaiKeys[index]] を直接参照する)
vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    modeTheme: 'light',
  }),
}))

const sekaiKeys: ColorsSekaiKey[] = ['Miku', 'Rin', 'Len']

describe('DoReMeetEffect', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('正常系', () => {
    it('text プロパティのテキストが表示される', () => {
      render(<DoReMeetEffect text="ドレミート" sekaiKeys={sekaiKeys} />)
      expect(screen.getByText('ドレミート')).toBeInTheDocument()
    })

    it('role="button" が設定される', () => {
      render(<DoReMeetEffect text="テスト" sekaiKeys={sekaiKeys} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('className プロパティが適用される', () => {
      render(<DoReMeetEffect text="テスト" sekaiKeys={sekaiKeys} className="custom-class" />)
      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })

    it('modeTheme に応じたクラス名が適用される', () => {
      render(<DoReMeetEffect text="テスト" sekaiKeys={sekaiKeys} />)
      expect(screen.getByRole('button')).toHaveClass('sekai-doremeet-effect-light')
    })
  })

  describe('クリック時のアニメーション', () => {
    it('クリック時に sekai カラーが順番に --sekai-color に設定される', () => {
      render(<DoReMeetEffect text="テスト" sekaiKeys={sekaiKeys} duration={100} />)

      const button = screen.getByRole('button')

      fireEvent.click(button)

      // 1回目のインターバル: sekaiKeys[0] = 'Miku'
      act(() => {
        vi.advanceTimersByTime(100)
      })
      expect(button.style.getPropertyValue('--sekai-color')).toBe(colorsSekai['Miku'])

      // 2回目のインターバル: sekaiKeys[1] = 'Rin'
      act(() => {
        vi.advanceTimersByTime(100)
      })
      expect(button.style.getPropertyValue('--sekai-color')).toBe(colorsSekai['Rin'])

      // 3回目のインターバル: sekaiKeys[2] = 'Len'
      act(() => {
        vi.advanceTimersByTime(100)
      })
      expect(button.style.getPropertyValue('--sekai-color')).toBe(colorsSekai['Len'])

      // 4回目のインターバル: prev+1 >= sekaiKeys.length でリセット
      act(() => {
        vi.advanceTimersByTime(100)
      })
      // アニメーション終了後、INIT_VALUE(-1) に戻るため --sekai-color はクリアされる
      expect(button.style.getPropertyValue('--sekai-color')).toBe('')
    })

    it('アニメーション再生中は再度クリックしても無視される', () => {
      render(<DoReMeetEffect text="テスト" sekaiKeys={sekaiKeys} duration={100} />)

      const button = screen.getByRole('button')

      fireEvent.click(button)

      act(() => {
        vi.advanceTimersByTime(100)
      })
      expect(button.style.getPropertyValue('--sekai-color')).toBe(colorsSekai['Miku'])

      // 再生中に再度クリック → 無視されるので色は変わらず進行
      fireEvent.click(button)

      act(() => {
        vi.advanceTimersByTime(100)
      })
      // 通常通り次の色に進む（リセットされない）
      expect(button.style.getPropertyValue('--sekai-color')).toBe(colorsSekai['Rin'])
    })
  })
})
