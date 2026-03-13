import React from 'react'

import clsx from 'clsx'
import { createPortal } from 'react-dom'

import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { usePortalContainer } from '@/internal/usePortalContainer'
import { convertHexToRgbaMixWithBlackOrWhite } from '@/utils/converter'

import globalStyles from '@/styles/global.module.scss'

import styles from './Backdrop.module.scss'

import type { BackdropProps } from '@/types/components/backdrop/Backdrop.types'

export const Backdrop = ({
  sekai,
  themeMode,
  open,
  children,
  containerComponent,
  centered = true,
  ...rest
}: BackdropProps) => {
  const displayBackdrop = open ? 'sekai-backdrop-visible' : 'sekai-backdrop-hidden'
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })
  const sekaiColorBg = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, false, 0.8)
  const portalContainer = usePortalContainer(containerComponent)

  const optionStyle = {
    '--sekai-color-bg': sekaiColorBg,
    ...(containerComponent && { position: 'absolute' }),
  }

  if (!portalContainer) return null

  return createPortal(
    <div className={clsx(styles[displayBackdrop])}>
      <div
        {...rest}
        className={clsx(
          globalStyles[`sekai-overlay-${modeTheme}`],
          {
            [styles['sekai-backdrop-bg']]: sekai,
            [styles['sekai-backdrop-centered']]: centered,
          },
          rest.className,
        )}
        style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
        {children}
      </div>
    </div>,
    portalContainer,
  )
}
