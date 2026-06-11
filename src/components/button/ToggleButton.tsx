import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgba } from '@/utils/converter'

import styles from './ToggleButton.module.scss'

import type { ToggleButtonProps } from '@/types/components/button/ToggleButton.types'

const isValidVerticalPosition = (position?: string): position is 'top' | 'bottom' =>
  position === 'top' || position === 'bottom'

const isValidHorizontalPosition = (position?: string): position is 'left' | 'right' =>
  position === 'left' || position === 'right'

const getResolvedLabelPosition = (
  direction: 'horizontal' | 'vertical',
  labelPosition?: 'left' | 'right' | 'top' | 'bottom',
): 'left' | 'right' | 'top' | 'bottom' => {
  const isVertical = direction === 'vertical'
  const isTopOrBottom = isValidVerticalPosition(labelPosition)
  const isLeftOrRight = isValidHorizontalPosition(labelPosition)

  if (isVertical) {
    return isTopOrBottom ? labelPosition : 'bottom'
  }
  return isLeftOrRight ? labelPosition : 'right'
}

const renderLabel = (
  labelText: string | undefined,
  shouldRender: boolean,
): React.ReactNode => {
  if (!labelText || !shouldRender) return null
  return (
    <span className={styles['sekai-toggle-label']} data-testid="toggle-label">
      {labelText}
    </span>
  )
}

export const ToggleButton = ({
  checked,
  onChange,
  labelText,
  direction = 'horizontal',
  labelPosition,
  disabled,
  sekai,
  themeMode,
  ...rest
}: ToggleButtonProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })

  const sekaiColorBg = convertHexToRgba(sekaiColor, 0.12)

  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-bg': sekaiColorBg,
  }

  const resolvedLabelPosition = getResolvedLabelPosition(direction, labelPosition)
  const isLabelBefore = resolvedLabelPosition === 'left' || resolvedLabelPosition === 'top'

  return (
    <button
      {...rest}
      role="switch"
      type="button"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={clsx(
        styles['sekai-toggle-button'],
        styles[`sekai-toggle-button--${modeTheme}`],
        direction === 'vertical' && styles['sekai-toggle-button--vertical'],
        rest.className,
      )}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}
    >
      {renderLabel(labelText, isLabelBefore)}
      <span
        className={clsx(
          styles['sekai-toggle-track'],
          checked && styles['sekai-toggle-track--on'],
        )}
      >
        <span
          className={clsx(
            styles['sekai-toggle-thumb'],
            checked && styles['sekai-toggle-thumb--on'],
          )}
        />
      </span>
      {renderLabel(labelText, !isLabelBefore)}
    </button>
  )
}
