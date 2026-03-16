import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface WindowDialogProps {
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
  /** ダイアログの内容 - Content of the dialog */
  children: React.ReactNode
  /**
   * WindowDialogのポータルコンテナ - Portal container for the WindowDialog
   * @default document.body
   */
  containerComponent?: HTMLElement
  /**
   * ダイアログのサイズ - Size of the dialog
   * @default 'medium'
   */
  size?: 'narrow' | 'medium' | 'wide'
  /** ダイアログを閉じるためのハンドラー - Handler to close the dialog */
  onClose: () => void
}
