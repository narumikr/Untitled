import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
  /** テキストフィールドのプレースホルダー - Placeholder text for the text field */
  placeholder?: string
  /**
   * テキストクリアボタンの表示有無 - Whether to display the clear button
   * @default true
   */
  showClearButton?: boolean
  /** 入力値変更時のコールバック - Callback function when the input value changes */
  onChangeInput?: (value: string) => void
  /**
   * エラーステートの有無 - Whether the text field is in an error state
   * @default false
   */
  isError?: boolean
  /** エラーメッセージ - Error message */
  errorMessage?: string
  /** 最大入力文字数 - Maximum input length */
  maxLength?: number
}
