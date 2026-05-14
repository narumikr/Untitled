import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgbaMixWithBlackOrWhite } from '@/utils/converter'

import globalStyles from '@/styles/global.module.scss'

import styles from './UtilText.module.scss'

import type {
  BodyTextProps,
  SekaiBodyTextProps,
  DetailTextProps,
  SekaiDetailTextProps,
  AnnotationTextProps,
  SekaiAnnotationTextProps,
} from '@/types/components/text/UtilText.types'

export const BodyText = ({ themeMode, children, ...rest }: BodyTextProps) => {
  const { modeTheme } = useOptionalSekai({ mode: themeMode })

  return (
    <p
      {...rest}
      className={clsx(
        styles[`sekai-body-text-${modeTheme}`],
        globalStyles['text-responsible-body'],
        rest.className,
      )}>
      {children}
    </p>
  )
}

export const SekaiBodyText = ({ sekai, children, ...rest }: SekaiBodyTextProps) => {
  const { sekaiColor } = useOptionalSekai({ sekai })

  const colorStyle = {
    color: sekaiColor,
  }

  return (
    <BodyText {...rest} style={{ ...(colorStyle as React.CSSProperties), ...rest.style }}>
      {children}
    </BodyText>
  )
}

export const DetailText = ({ themeMode, children, ...rest }: DetailTextProps) => {
  const { modeTheme } = useOptionalSekai({ mode: themeMode })

  return (
    <p
      {...rest}
      className={clsx(
        styles[`sekai-detail-text-${modeTheme}`],
        globalStyles['text-xs'],
        rest.className,
      )}>
      {children}
    </p>
  )
}

export const SekaiDetailText = ({ sekai, children, ...rest }: SekaiDetailTextProps) => {
  const { sekaiColor } = useOptionalSekai({ sekai })

  const colorStyle = {
    color: sekaiColor,
  }

  return (
    <DetailText {...rest} style={{ ...(colorStyle as React.CSSProperties), ...rest.style }}>
      {children}
    </DetailText>
  )
}

export const AnnotationText = ({ themeMode, children, ...rest }: AnnotationTextProps) => {
  const { modeTheme } = useOptionalSekai({ mode: themeMode })

  return (
    <DetailText
      {...rest}
      className={clsx(styles[`sekai-annotation-text-${modeTheme}`], rest.className)}>
      {children}
    </DetailText>
  )
}

export const SekaiAnnotationText = ({ sekai, children, ...rest }: SekaiAnnotationTextProps) => {
  const { sekaiColor, isLight } = useOptionalSekai({ sekai })
  const annotationColor = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight)

  const colorStyle = {
    color: annotationColor,
  }

  return (
    <DetailText {...rest} style={{ ...(colorStyle as React.CSSProperties), ...rest.style }}>
      {children}
    </DetailText>
  )
}
