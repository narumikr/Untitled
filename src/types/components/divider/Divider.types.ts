import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface DividerProps {
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
  /** Dividerの子要素 - Children of the divider */
  children?: React.ReactNode
  /** ペアのセカイカラー - Pair Sekai Color */
  pairSekaiColor?: ColorsSekaiKey
  /** Dividerの線の太さ - Thickness of the divider line */
  lineHeight?: number | string
  /**
   * Dividerのバリアント - Variant of the divider
   * @default 'fullWidth'
   */
  variant?: 'fullWidth' | 'inset' | 'middle'
  /**
   * Divider内のテキストの位置 - Text alignment within the divider
   * @default 'center'
   */
  textAlign?: 'left' | 'center' | 'right'
  /** Dividerに影
   * をつけるか - Whether to apply shadow to the divider */
  shadow?: boolean
}
