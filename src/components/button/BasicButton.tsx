import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgba } from '@/utils/converter'

import globalStyles from '@/styles/global.module.scss'

import styles from './BasicButton.module.scss'

import type { BasicButtonProps } from '@/types/components/button/BasicButton.types'

export const BasicButton = ({
  sekai,
  themeMode,
  withTextSekaiColor = false,
  children,
  disabled = false,
  ...rest
}: BasicButtonProps) => {
  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({ sekai, mode: themeMode })

  const sekaiColorHover = convertHexToRgba(sekaiColor, isLight ? 0.1 : 0.3)

  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': sekaiColorHover,
    ...(withTextSekaiColor && { color: sekaiColor }),
  }

  return (
    <button
      {...rest}
      ref={rest.ref}
      type="button"
      className={clsx(
        styles[`sekai-basic-button-${modeTheme}`],
        globalStyles[`sekai-color-${modeTheme}`],
        rest.className,
      )}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}
      disabled={disabled}>
      {children}
    </button>
  )
}
