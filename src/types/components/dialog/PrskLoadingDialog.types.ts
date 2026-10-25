import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface PrskLoadingDialogProps {
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
  /** ダイアログの開閉状態 - Open state of the dialog */
  open: boolean
  /** ダイアログのタイトル - Title of the dialog */
  title: string
  /** 画像のURL - Source URL of the image */
  imageSrc: string
  /**
   * 画像の代替テキスト - Alternative text of the image
   * @default ''
   */
  imageAlt?: string
  /**
   * オーバーレイを表示するか - Whether to show the overlay backdrop
   * @default false
   */
  withOverlay?: boolean
  /**
   * ローディングダイアログのポータルコンテナ - Portal container for the loading dialog
   * @default document.body
   */
  containerComponent?: HTMLElement
}
