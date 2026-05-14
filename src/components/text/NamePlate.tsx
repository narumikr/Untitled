import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'

import styles from './NamePlate.module.scss'

import type { NamePlateProps } from '@/types/components/text/NamePlate.types'

export const NamePlate = ({
  sekai,
  themeMode,
  text,
  colorLength = 1,
  ...rest
}: NamePlateProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })

  const optionStyle = {
    '--sekai-color': sekaiColor,
  }

  const colorText = text.slice(0, colorLength)
  const normalText = text.slice(colorLength)

  return (
    <div
      {...rest}
      className={clsx(styles[`sekai-name-plate-${modeTheme}`], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      <span className={styles['sekai-name-plate-color']}>{colorText}</span>
      <span>{normalText}</span>
    </div>
  )
}
