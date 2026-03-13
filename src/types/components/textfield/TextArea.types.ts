import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface TextAreaProps {
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
  /** テキストエリアの値 - Value of the text area */
  value?: string
  /** テキストエリアの値が変更されたときのハンドラー - Handler for when the value of the text area changes */
  onChange?: (value: string) => void
  /** プレースホルダー - Placeholder text */
  placeholder?: string
  /**
   * テキストエリアを無効化するかどうか - Whether to disable the text area
   * @default false
   */
  disabled?: boolean
  /** 入力可能な最大文字数 - Maximum number of characters allowed */
  maxLength?: number
  /**
   * テキストエリアのリサイズスタイル - Resize style for the text area
   * @default 'none'
   */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
}
