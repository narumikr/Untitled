import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface MusicBannerCardProps {
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
  /** 楽曲タイトル - Music title */
  musicTitle: string
  /** アーティスト名 - Artist name */
  artist: string
  /**
   * 選択状態 - Whether the card is selected
   * @default false
   */
  selected?: boolean
  /** 選択状態変更時のハンドラー - Handler for when the selection state changes */
  onSelect?: (select: boolean) => void
  /** カードクリック時のハンドラー - Handler for when the card is clicked */
  onClick?: () => void
  /** カードがフォーカスを失ったときのハンドラー - Handler for when the card loses focus */
  onBlur?: () => void
  /** カードからマウスが離れたときのハンドラー - Handler for when the mouse leaves the card */
  onMouseLeave?: () => void
  /**
   * カードのバリアント - Variant of the card
   * @default 'default'
   */
  variants?: 'default' | 'view-all'
}
