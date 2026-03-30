import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface BasicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
  /**
   * ボタン表示テキストもセカイカラーにするかどうか - Whether to apply Sekai color to the button text
   * @default false
   */
  withTextSekaiColor?: boolean
  /** ボタン要素への参照 - Ref for the button element */
  ref?: React.Ref<HTMLButtonElement>
  /** ボタンの子要素 - Children elements of the button */
  children?: React.ReactNode
  /**
   * ボタンの無効化するかどうか - Whether to disable the button
   * @default false
   */
  disabled?: boolean
  /** ボタンクリック時のハンドラー - Click event handler for the button */
  onClick?: () => void
}
