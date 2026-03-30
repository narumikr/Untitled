import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface SideMenuProps {
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
  /** サイドメニューの開閉状態 - Open state of the side menu */
  open?: boolean
  /** サイドメニューのハンバーガーボタンのクリックハンドラー - Click handler for the side menu hamburger button */
  onClick?: () => void
  /** サイドメニューのコンテンツ - Content of the side menu */
  children?: React.ReactNode
  /**
   * サイドメニューの表示位置 - Position of the side menu
   * @default 'left'
   */
  pos?: 'left' | 'right'
  /**
   * SideMenuのポータルコンテナ - Portal container for the SideMenu
   * @default document.body
   */
  containerComponent?: HTMLElement
}
