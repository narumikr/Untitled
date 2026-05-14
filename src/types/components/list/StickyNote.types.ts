import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface StickyNoteProps {
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
  /** StickyNoteの内容 - Content of the sticky note */
  children: React.ReactNode
  /**
   * StickyNoteの要素タイプ - Element type of the sticky note
   * @default 'button'
   */
  as?: 'button' | 'text'
  /** ボタンの無効化するかどうか - Whether to disable the button */
  disabled?: boolean
  /** StickyNoteがクリックされたときのイベントハンドラー - Event handler for when the sticky note is clicked */
  onClick?: () => void
}
