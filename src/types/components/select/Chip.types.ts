import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface ChipProps {
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
  /** チップの内容 - Content of the Chip */
  label: string
  /** チップがクリックされたときのハンドラー - Click event handler for the Chip */
  onClick?: () => void
  /** チップの削除アイコンがクリックされたときのハンドラー - Click event handler for the delete icon of the Chip */
  onDelete?: () => void
  /**
   * チップのサイズ - Size of the Chip
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * チップのバリアント - Variant of the Chip
   * @default 'filled'
   */
  variant?: 'filled' | 'outlined'
}
