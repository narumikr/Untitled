import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export type TabVariant = 'underline' | 'sticky-note'

export interface TabItem {
  /** タブのラベル - Tab label */
  label: string
  /** タブの左に表示するアイコン - Optional icon rendered before the label */
  icon?: React.ReactNode
}

export interface TabProps {
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
  /** タブのリスト - List of tabs to render */
  tabList: TabItem[]
  /** 現在選択されているタブのindex - Index of the currently selected tab */
  value: number
  /** タブが切り替わった際のハンドラー - Handler invoked when the active tab changes */
  onChange: (value: number) => void
  /**
   * タブの表示バリエーション - Visual variant of the tab
   * @default 'underline'
   */
  variant?: TabVariant
}

export interface TabPanelProps {
  /** クラス名 - Class name */
  className?: string
  /** スタイル - Inline styles */
  style?: React.CSSProperties
  /** パネルの内容 - Panel contents */
  children: React.ReactNode
  /** このパネルに対応するタブのindex - Index of the tab this panel belongs to */
  tabIndex: number
  /** 現在選択されているタブのindex - Index of the currently selected tab */
  value: number
}
