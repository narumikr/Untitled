import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface ListProps {
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
  /** リスト要素への参照 - Ref for the list element */
  ref?: React.Ref<HTMLUListElement | HTMLOListElement>
  /** リストの子要素 - Children elements of the list */
  children: React.ReactNode
  /**
   * リストの種類 - Type of the list
   * @default 'ul'
   */
  as?: 'ul' | 'ol'
  /**
   * 箇条書きの点を表示するか - Whether to display bullet points
   * @default true
   */
  noBullet?: boolean
}
