import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface TextLinkProps {
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
  /** テキストリンク要素への参照 - Ref to the text link element */
  ref?: React.Ref<HTMLAnchorElement>
  /** 表示テキスト - Display text */
  text: string
  /** リンク先URL - Destination URL */
  href: string
  /**
   * 外部リンクかどうか - Whether it's an external link
   * @default true
   */
  isExternal?: boolean
  /**
   * リンクの無効か状態 - Whether the link is disabled
   * @default false
   */
  disabled?: boolean
  /** アクセシビリティ用のラベル - Aria label for accessibility */
  ariaLabel?: string
}
