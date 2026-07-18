import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface SliderProps {
  /** ユニークID - Unique identifier */
  id?: string
  /** クラス名 - Class name */
  className?: string
  /** スタイル - Inline styles */
  style?: React.CSSProperties
  /**
   * セカイカラー - Sekai Color
   * @see {@link ColorsSekaiKey}
   * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
   */
  sekai?: ColorsSekaiKey
  /**
   * テーマモード - Theme Mode
   * @see {@link PaletteMode}
   * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
   */
  themeMode?: PaletteMode
  /** スライダーの値 - Slider value */
  value: number
  /** スライダー初期値 - Slider default value */
  defaultValue?: number
  /** 
   * スライダーの最小値 - Slider minimum value
   * @default 0
   */
  min?: number
  /** 
   * スライダーの最大値 - Slider maximum value
   * @default 100
   */
  max?: number
  /**
   * スライダーのステップ値 - Slider step value
   * @default 1
   */
  step?: number
  /** スライダーの変更時に呼ばれるコールバック関数 - Callback function called when the slider value changes */
  onChange?: (value: number) => void
  /** スライダーを無効かするかどうか - Whether to disable the slider */
  disabled?: boolean
  /**
   * スライダーの方向 - Slider orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * スライダーの値を表示するかどうか - Whether to display the slider value
   * @default false
   */
  showValue?: boolean
}