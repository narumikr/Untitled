import React from 'react'

import clsx from 'clsx'
import { createPortal } from 'react-dom'

import { Backdrop } from '@/components/backdrop/Backdrop'

import { LightBulbSvg } from '@/img/lightBulb'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { usePortalContainer } from '@/internal/usePortalContainer'

import globalStyles from '@/styles/global.module.scss'

import styles from './PrskTips.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type { PrskTipsProps } from '@/types/components/dialog/PrskTips.types'

export const PrskTips = ({
  sekai,
  themeMode,
  open,
  tipsText,
  containerComponent,
  ...rest
}: PrskTipsProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })
  const portalContainer = usePortalContainer(containerComponent)

  const optionStyle = {
    '--sekai-color': sekaiColor,
  }

  const overlayProps = { open, themeMode, containerComponent }

  if (!portalContainer) return null

  return createPortal(
    <Backdrop {...overlayProps} centered blur>
      <div
        {...rest}
        role="dialog"
        className={clsx(
          globalStyles[`sekai-color-${modeTheme}`],
          styles['sekai-container'],
          rest.className,
        )}
        style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
        <TipsHeader sekai={sekai} themeMode={modeTheme} />
        <p className={clsx(styles['sekai-tips-content'])}>{tipsText}</p>
      </div>
    </Backdrop>,
    portalContainer,
  )
}

interface TipsHeaderProps {
  sekai?: ColorsSekaiKey
  themeMode: PaletteMode
}
const TipsTitle = 'TIPS'
const TipsHeader = ({ sekai, themeMode }: TipsHeaderProps) => {
  return (
    <div className={clsx(styles['sekai-tips-header'])}>
      <LightBulbSvg sekai={sekai} themeMode={themeMode} className={styles['sekai-lightbulb']} />
      <h2>{TipsTitle}</h2>
    </div>
  )
}
