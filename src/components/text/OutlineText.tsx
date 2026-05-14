import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'

import styles from './OutlineText.module.scss'

import type { OutlineTextProps } from '@/types/components/text/OutlineText.types'

export const OutlineText = ({ sekai, themeMode, text, ...rest }: OutlineTextProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })

  const optionStyle = {
    '--sekai-color': sekaiColor,
  }

  return (
    <span
      {...rest}
      className={clsx(styles[`sekai-outline-text-${modeTheme}`], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}
      data-text={text}
      aria-label={text}>
      {text}
    </span>
  )
}
