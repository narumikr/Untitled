import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface DialogButton {
  /** ボタンのテキスト - Text on the button */
  text: string
  /** ボタンのクリックハンドラー - Click handler for the button */
  onClick: () => void
  /**
   * ボタンのタイプ - Type of the button (normal or strong)
   * @default 'normal'
   */
  type?: 'normal' | 'strong'
  /** ボタンの無効化するかどうか - Whether to disable the button */
  disabled?: boolean
  /** アクセシビリティ用のラベル - ARIA label for accessibility */
  ariaLabel?: string
  /** ボタンのクラス名 - Custom class name for the button */
  buttonClassName?: string
}

export interface DialogProps {
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
  /** ダイアログ要素への参照 - Reference to the dialog element */
  ref?: React.Ref<HTMLDivElement>
  /** ダイアログの開閉状態 - Open state of the dialog */
  open: boolean
  /** ダイアログの内容 - Content of the dialog */
  children: React.ReactNode
  /**
   * ダイアログのポータルコンテナ - Portal container for the dialog
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
  /** ダイアログのタイトル - Title of the dialog */
  title?: string
  /**
   * 閉じるアイコンを表示するか - Whether to show the close icon
   * @default false
   */
  showCloseIcon?: boolean
  /**
   * ダイアログのフッターボタン - Footer buttons for the dialog
   * @see {@link DialogButton}
   */
  buttons?: DialogButton[]
  /** ダイアログのフッターボタン（カスタム） - Custom footer buttons for the dialog */
  dialogButtons?: React.ReactNode
}
