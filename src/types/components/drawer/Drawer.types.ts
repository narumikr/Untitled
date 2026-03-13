import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface DrawerProps {
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
  /** Drawer要素への参照 - Reference to the Drawer element */
  ref?: React.Ref<HTMLDivElement>
  /** Drawerの開閉状態 - Open state of the drawer */
  open: boolean
  /** Drawerを閉じるためのハンドラー - Handler to close the drawer */
  onClose: () => void
  /** Drawerの子要素 - Children of the drawer */
  children: React.ReactNode
  /**
   * Drawerのポータルコンテナ - Portal container for the drawer
   * @default document.body
   */
  containerComponent?: HTMLElement
  /**
   * Drawerの表示位置 - Position of the drawer
   * @default 'right'
   */
  pos?: 'top' | 'right' | 'bottom' | 'left'
}
