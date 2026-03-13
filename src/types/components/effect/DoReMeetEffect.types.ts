import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface DoReMeetEffectProps {
  /** ユニークID - Unique identifier */
  id?: string
  /** クラス名 - Class name */
  className?: string
  /** スタイル - Inline styles */
  style?: React.CSSProperties
  /**
   * エフェクトで使用するセカイカラーの配列 - Array of Sekai Colors to be used in the effect
   * @see {@link ColorsSekaiKey}
   */
  sekaiKeys: ColorsSekaiKey[]
  /**
   * テーマモード - Theme Mode
   * @see {@link PaletteMode}
   * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
   */
  themeMode?: PaletteMode
  /** 表示テキスト - Display text */
  text: string
  /** エフェクトの持続時間 - Duration of the effect */
  duration?: number
}
