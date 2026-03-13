import type { DialogButton } from './Dialog.types'
import type { PaletteMode } from '@/hooks/useThemeMode'
import type React from 'react'

export interface XoMikuDialogProps {
  /** ユニークID - Unique identifier */
  id?: string
  /** クラス名 - Class name */
  className?: string
  /** スタイル - Inline styles */
  style?: React.CSSProperties
  /**
   * テーマモード - Theme Mode
   * @see {@link PaletteMode}
   * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
   */
  themeMode?: PaletteMode
  /** ダイアログ要素への参照 - Reference to the dialog element */
  ref?: React.Ref<HTMLDivElement>
  /** ダイアログの開閉状態 - Open state of the dialog */
  open: boolean
  /** ダイアログの内容 - Content of the dialog */
  children: React.ReactNode
  /**
   * ダイアログのサイズ - Size of the dialog
   * @default 'medium'
   */
  size?: 'narrow' | 'medium' | 'wide'
  /**
   * XoMikuDialogのポータルコンテナ - Portal container for the XoMikuDialog
   * @default document.body
   */
  containerComponent?: HTMLElement
  /** ダイアログを閉じるためのハンドラー - Handler to close the dialog */
  onClose: () => void
  /** ダイアログのタイトル - Title of the dialog */
  title?: string
  /**
   * ダイアログのボタン - Buttons for the dialog
   * @see {@link DialogButton}
   */
  buttons?: DialogButton[]
}
