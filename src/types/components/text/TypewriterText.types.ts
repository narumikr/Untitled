import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface TypewriterTextProps {
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
  /** 表示するテキスト - Text to display */
  text: string
  /** タイプライターのオプション - Options for the typewriter effect */
  options?: TypewriterTextOptions
}

export interface TypewriterTextOptions {
  /**
   * タイプライターエフェクトの速度（ミリ秒） - Speed of the typewriter effect in milliseconds
   * @default 100
   */
  speed?: number
  /**
   * ループするかどうか - Whether to loop the typewriter effect
   * @default false
   */
  loop?: boolean
  /**
   * タイプ時にカーソルを表示するかどうか - Whether to show a cursor while typing
   * @default true
   */
  showCursor?: boolean
}
