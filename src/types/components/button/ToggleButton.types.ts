import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface ToggleButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'onClick'> {
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
  /** トグルボタン要素への参照 - Ref for the toggle button element */
  ref?: React.Ref<HTMLButtonElement>
  /** チェック状態 - Checked state */
  checked: boolean
  /** チェック状態の変更ハンドラー - Handler for changing the checked state */
  onChange: (checked: boolean) => void
  /** サイドラベルテキスト - Label text */
  labelText?: string
  /**
   * トグルボタンの向き - Toggle button direction
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * ラベルの位置 - Label position
   * @default 'right' for horizontal, 'bottom' for vertical
   * @remark
   * - horizontal 時: 'left' | 'right' (default: 'right') — top/bottom は 'right' にフォールバック
   * - vertical 時: 'top' | 'bottom' (default: 'bottom') — left/right は 'bottom' にフォールバック
   */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom'
  /**
   * トグルボタンを無効化するかどうか - Whether to disable the ToggleButton
   * @default false
   */
  disabled?: boolean
}
