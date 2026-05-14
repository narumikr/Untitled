import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

export interface DropdownProps {
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
  /**
   * ドロップダウンのオプションのラベル - Label for the dropdown option
   * @see {@link DropdownOption}
   */
  options: DropdownOption[]
  /** ドロップダウンのデフォルト値 - Default value for the dropdown */
  defaultValue?: string
  /** ドロップダウンの選択したときのハンドラー - Handler for when an option is selected */
  onSelect: (value: string) => void
  /** ドロップダウンのプレースホルダー - Placeholder for the dropdown */
  placeholder?: string
}

export interface DropdownOption {
  label: string
  value: string
}
