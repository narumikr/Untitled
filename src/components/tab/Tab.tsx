import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'

import styles from './Tab.module.scss'

import type { TabProps } from '@/types/components/tab/Tab.types'

export const Tab = ({
  sekai,
  themeMode,
  ...rest
}: TabProps) => {
  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({ sekai, mode: themeMode })

  const optionStyle = {
    '--sekai-color': sekaiColor,
  }

  return (
    <div
      {...rest}
      className={clsx(styles['Tab'], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}></div>
  )

}