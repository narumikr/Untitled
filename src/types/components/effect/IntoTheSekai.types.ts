import type React from 'react'

export interface IntoTheSekaiProps {
  /** ユニークID - Unique identifier */
  id?: string
  /** クラス名 - Class name */
  className?: string
  /** スタイル - Inline styles */
  style?: React.CSSProperties
  /** エフェクト終了時に発火するイベント - Event triggered when the effect ends */
  execEvent?: () => void
  /**
   * エフェクト終了後にexecEventが発火するまでの遅延時間(ms) - Delay in ms before execEvent fires after the effect ends
   * @default 390
   */
  execEventDelay?: number
  /**
   * エフェクトのポータルコンテナ - Portal container to display the effect
   * @default document.body
   */
  containerComponent?: HTMLElement
}
