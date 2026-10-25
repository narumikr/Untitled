import React from 'react'

import clsx from 'clsx'
import { createPortal } from 'react-dom'

import { Backdrop } from '@/components/backdrop/Backdrop'

import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { usePortalContainer } from '@/internal/usePortalContainer'

import styles from './PrskLoadingDialog.module.scss'

import type { PrskLoadingDialogProps } from '@/types/components/dialog/PrskLoadingDialog.types'

export const PrskLoadingDialog = ({
  sekai,
  themeMode,
  open,
  title,
  imageSrc,
  imageAlt = '',
  withOverlay = false,
  containerComponent,
  ...rest
}: PrskLoadingDialogProps) => {
  const { sekaiColor } = useOptionalSekai({ sekai, mode: themeMode })
  const portalContainer = usePortalContainer(containerComponent)

  const optionStyle = {
    '--sekai-color': sekaiColor,
  }

  if (!portalContainer) return null

  const dialogContent = (
    <div
      {...rest}
      role="dialog"
      aria-modal={withOverlay}
      aria-busy
      aria-label={title}
      className={clsx(styles['sekai-container'], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      <h2 className={styles['sekai-loading-title']}>{title}</h2>
      <div className={styles['sekai-loading-image']}>
        <img src={imageSrc} alt={imageAlt} />
      </div>
    </div>
  )

  if (withOverlay) {
    return createPortal(
      <Backdrop
        open={open}
        themeMode={themeMode}
        containerComponent={containerComponent}
        centered>
        {dialogContent}
      </Backdrop>,
      portalContainer,
    )
  }

  return createPortal(
    open ? <div className={styles['sekai-loading-no-overlay']}>{dialogContent}</div> : null,
    portalContainer,
  )
}
