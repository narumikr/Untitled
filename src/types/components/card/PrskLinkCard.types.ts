import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface PrskLinkCardProps {
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
   * カードの高さ - Height of the card
   * @default 72
   */
  height?: number
  /**
   * カードの幅 - Width of the card
   * @default 160
   */
  width?: number
  /** カードクリック時のハンドラー - Click event handler for the card */
  onClick?: () => void
  /** カードのタイトル - Title of the card */
  title: string
  /** カードのサブテキスト - Subtext of the card */
  subText: string
  /** カード内配置のアイコン - Icon inside the card (can be a URL string or a React node) */
  icon: string | React.ReactNode
}
