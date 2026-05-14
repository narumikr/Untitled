import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface ToastProps {
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
  /** Toastの開閉状態 - Open state of the toast */
  open: boolean
  /** Toastを閉じるためのハンドラー - Handler to close the toast */
  onClose: () => void
  /**
   * Toastの表示位置 - Position of the toast
   * @default 'bottom'
   */
  pos?: 'top' | 'bottom'
  /** Toastに表示するメッセージ - Message to display in the toast */
  message: string | string[]
  /**
   * エラートーストかどうか - Whether it's an error toast
   * @default false
   */
  isError?: boolean
  /**
   * トーストが自動的に閉じるまでの時間（ミリ秒） - Time in milliseconds before the toast automatically closes
   * @default 3000
   */
  duration?: number
  /**
   * Toastのポータルコンテナ - Portal container for the toast
   * @default document.body
   */
  containerComponent?: HTMLElement
}
