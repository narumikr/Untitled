import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface ToggleButtonProps {
  /** ON/OFF 状態（controlled 必須） */
  checked: boolean
  /** 状態変更ハンドラ */
  onChange: (checked: boolean) => void
  /** サイドラベルテキスト */
  labelText?: string
  /**
   * toggle の向き
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * ラベルの位置
   * - horizontal 時: 'left' | 'right' (default: 'right') — top/bottom は 'right' にフォールバック
   * - vertical 時: 'top' | 'bottom' (default: 'bottom') — left/right は 'bottom' にフォールバック
   */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom'
  /** 無効状態 */
  disabled?: boolean
  /** ユニークID */
  id?: string
  /** クラス名 */
  className?: string
  /** インラインスタイル */
  style?: React.CSSProperties
  /**
   * セカイカラー
   * @see {@link ColorsSekaiKey}
   * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
   */
  sekai?: ColorsSekaiKey
  /**
   * テーマモード
   * @see {@link PaletteMode}
   * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
   */
  themeMode?: PaletteMode
}