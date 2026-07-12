import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'

import styles from './Slider.module.scss'

import type { SliderProps } from '@/types/components/slider/Slider.types'

export const Slider = ({
  sekai,
  themeMode,
  ...rest
}: SliderProps) => {
  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({ sekai, mode: themeMode })

  const optionStyle = {
    '--sekai-color': sekaiColor,
  }

  return (
    <div
      {...rest}
      className={clsx(styles['Slider'], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}></div>
  )

}