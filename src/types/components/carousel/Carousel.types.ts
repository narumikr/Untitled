import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type React from 'react'
import type { SwiperRef } from 'swiper/react'

export interface CarouselProps {
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
  /** カルーセル要素への参照 - Ref for the carousel element */
  ref?: React.Ref<SwiperRef>
  /** カルーセルの子要素 - Children elements of the carousel */
  children: React.ReactNode
  /**
   * カルーセルのサイズ - Size of the carousel
   * @default 'normal'
   */
  size?: 'wide' | 'normal' | 'single'
  /**
   * 自動再生のOff/On - Whether to enable autoplay
   * @default true
   */
  autoPlay?: boolean
  /**
   * ループ再生のOff/On - Whether to enable infinite loop
   * @default false
   */
  loopInfinite?: boolean
  /**
   * ページネーションのOff/On - Whether to show pagination
   * @default false
   */
  pagination?: boolean
}
