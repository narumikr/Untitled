import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'checked' | 'disabled'
  > {
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
  /** Checkbox要素への参照 - Reference for the Checkbox element */
  ref?: React.Ref<HTMLInputElement>
  /** チェック状態 - Checked state */
  checked?: boolean
  /** Checkboxを無効化するかどうか - Whether to disable the Checkbox */
  disabled?: boolean
  /** チェック状態の変更ハンドラー - Handler for changing the checked state */
  onChange?: (checked: boolean) => void
  /**
   * Checkboxのスタイル - Style for the Checkbox
   * @remark fillingがtrueの場合、チェックボックスが塗りつぶされます
   */
  filling?: boolean
}
