import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgba } from '@/utils/converter'

import globalStyles from '@/styles/global.module.scss'

import styles from './Card.module.scss'

import type {
  CardProps,
  CardContentProps,
  CardTitleProps,
} from '@/types/components/card/Card.types'

export const Card = ({
  id,
  className,
  style,
  sekai,
  themeMode,
  ref,
  children,
  ...divProps
}: CardProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })

  const sekaiColoShadow = convertHexToRgba(sekaiColor, 0.75)

  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-shadow': sekaiColoShadow,
  }

  return (
    <div
      {...divProps}
      ref={ref}
      id={id}
      className={clsx(
        styles['sekai-card'],
        globalStyles[`sekai-color-${modeTheme}`],
        className,
      )}
      style={{ ...(optionStyle as React.CSSProperties), ...style }}>
      {children}
    </div>
  )
}

export const CardContent = ({
  id,
  className,
  style,
  themeMode,
  children,
}: CardContentProps) => {
  const { modeTheme } = useOptionalSekai({ mode: themeMode })

  return (
    <div
      id={id}
      style={style}
      className={clsx(
        styles['sekai-card-content'],
        globalStyles[`sekai-color-${modeTheme}`],
        className,
      )}>
      {children}
    </div>
  )
}

export const CardTitle = ({
  sekai,
  themeMode,
  title,
  underline = true,
  ...rest
}: CardTitleProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })

  const optionStyle = {
    '--sekai-color': sekaiColor,
  }

  return (
    <h3
      {...rest}
      className={clsx(
        styles['sekai-card-title'],
        globalStyles[`sekai-color-${modeTheme}`],
        underline && styles['sekai-underline'],
        rest.className,
      )}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      {title}
    </h3>
  )
}
