import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgba } from '@/utils/converter'

import styles from './StrongButton.module.scss'

import type { StrongButtonProps } from '@/types/components/button/StrongButton.types'

export const StrongButton = ({
  sekai,
  themeMode,
  children,
  disabled = false,
  ...rest
}: StrongButtonProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })

  const sekaiColorBg = convertHexToRgba(sekaiColor, 0.8)

  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-bg': sekaiColorBg,
  }

  return (
    <button
      {...rest}
      ref={rest.ref}
      type="button"
      className={clsx(styles[`sekai-strong-button-${modeTheme}`], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}
      disabled={disabled}>
      {children}
    </button>
  )
}
