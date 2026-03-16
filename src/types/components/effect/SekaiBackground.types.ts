import type React from 'react'

export interface SekaiBackgroundProps {
  /** ユニークID - Unique identifier */
  id?: string
  /** クラス名 - Class name */
  className?: string
  /** スタイル - Inline styles */
  style?: React.CSSProperties
  /**
   * セカイバックグラウンドのポータルコンテナ - Portal container for the Sekai background
   * @default document.body
   */
  containerComponent?: HTMLElement
  /** エフェクトの透明度 - Opacity of the effect */
  bgOpacity?: number
}
