import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'

import styles from './Loading.module.scss'

import type { LoadingProps } from '@/types/components/loading/Loading.types'

export const Loading = ({ id, className, style, sekai }: LoadingProps) => {
  const { sekaiColor } = useOptionalSekai({ sekai })
  const CIRCLE_COUNT = 8

  const optionStyle = {
    '--sekai-color': sekaiColor,
  }

  return (
    <div
      id={id}
      role="status"
      aria-live="polite"
      className={clsx(styles['sekai-loading'], className)}
      style={{ ...(optionStyle as React.CSSProperties), ...style }}>
      {Array.from({ length: CIRCLE_COUNT }, (_, index) => (
        <div
          key={`circle-${index}`}
          className={clsx(
            styles['sekai-loading-circle'],
            styles[`sekai-circle-animation-${index}`],
          )}
        />
      ))}
    </div>
  )
}
