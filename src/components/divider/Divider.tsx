import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'

import { colorsSekai } from '@/styles/sekai-colors'

import styles from './Divider.module.scss'

import type { DividerProps } from '@/types/components/divider/Divider.types'

const DEFAULT_LINE_HEIGHT = '2px'

export const Divider = ({
  sekai,
  themeMode,
  children,
  pairSekaiColor,
  lineHeight,
  variant = 'fullWidth',
  textAlign = 'center',
  shadow,
  ...rest
}: DividerProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })
  const gradientColor = pairSekaiColor ? colorsSekai[pairSekaiColor] : 'transparent'
  const shadowStyle = Boolean(shadow) ? styles[`sekai-divider-shadow-${modeTheme}`] : ''

  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-pair-color': gradientColor,
    '--divider-line-height': getLineHeightStyle(lineHeight),
  }

  return (
    <div
      {...rest}
      className={clsx(styles[`sekai-divider-${variant}`], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      {children ? (
        <div
          role="separator"
          aria-orientation="horizontal"
          className={clsx(styles[`sekai-divider-with-item-${textAlign}`], shadowStyle)}>
          {children}
        </div>
      ) : (
        <hr
          role="separator"
          aria-orientation="horizontal"
          className={clsx(styles['sekai-divider-line'], shadowStyle)}
        />
      )}
    </div>
  )
}

const getLineHeightStyle = (lineHeight?: number | string): string => {
  if (typeof lineHeight === 'number' && lineHeight >= 0) return `${lineHeight}px`
  if (typeof lineHeight === 'string') return lineHeight
  return DEFAULT_LINE_HEIGHT
}
