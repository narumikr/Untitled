import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface PictureViewerProps {
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
  /** 画像のソースURL - Image source URL */
  imgSrc: string
  /**
   * 画像の代替テキスト - Alternative text for the image
   * @default ''
   */
  alt?: string
  /**
   * サムネイルの幅 - Width of the thumbnail
   * @default 210
   */
  width?: number
  /**
   * 画像のオブジェクトフィット - Object fit for the image
   * @default 'contain'
   */
  objectFit?: 'contain' | 'cover'
  /**
   * PictureViewerのポータルコンテナ - Portal container for the PictureViewer
   * @default document.body
   */
  containerComponent?: HTMLElement
}
