import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgba } from '@/utils/converter'

import styles from './HamburgerButton.module.scss'

import type { HamburgerButtonProps } from '@/types/components/button/HamburgerButton.types'

export const HamburgerButton = ({ sekai, themeMode, open, ...rest }: HamburgerButtonProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })
  const sekaiColorBg = convertHexToRgba(sekaiColor, 0.8)

  const optionStyle = {
    '--sekai-color-bg': sekaiColorBg,
  }

  return (
    <button
      {...rest}
      ref={rest.ref}
      type="button"
      className={clsx(styles[`sekai-hamburger-button-${modeTheme}`], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}
      aria-expanded={open}
      aria-label={open ? 'Close menu' : 'Open menu'}>
      {Array.from({ length: 3 }).map((_, index) => (
        <span
          key={`hamburger-line-${index}`}
          className={clsx(styles['sekai-hamburger-line'], open && styles['sekai-open'])}
        />
      ))}
    </button>
  )
}
