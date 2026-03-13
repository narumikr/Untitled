import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'

interface BaseUtilTextProps {
  /** ユニークID - Unique identifier */
  id?: string
  /** クラス名 - Class name */
  className?: string
  /** スタイル - Inline styles */
  style?: React.CSSProperties
  /**
   * テーマモード - Theme Mode
   * @see {@link PaletteMode}
   * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
   */
  themeMode?: PaletteMode
  /** 本文テキストの内容 - Content of the body text */
  children?: React.ReactNode
}

interface BaseSekaiUtilTextProps extends BaseUtilTextProps {
  /**
   * セカイカラー - Sekai Color
   * @see {@link ColorsSekaiKey}
   * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
   */
  sekai?: ColorsSekaiKey
}

export interface BodyTextProps extends BaseUtilTextProps {}
export interface SekaiBodyTextProps extends BaseSekaiUtilTextProps {}

export interface DetailTextProps extends BaseUtilTextProps {}
export interface SekaiDetailTextProps extends BaseSekaiUtilTextProps {}

export interface AnnotationTextProps extends BaseUtilTextProps {}
export interface SekaiAnnotationTextProps extends BaseSekaiUtilTextProps {}
