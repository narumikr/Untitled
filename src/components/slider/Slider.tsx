import React, { useState } from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgba } from '@/utils/converter'

import styles from './Slider.module.scss'

import type { SliderProps } from '@/types/components/slider/Slider.types'

const getPercent = (value: number, min: number, max: number): number => {
  if (min >= max) return 0
  const ratio = (value - min) / (max - min)
  return Math.min(100, Math.max(0, ratio * 100))
}

export const Slider = ({
  id,
  className,
  style,
  sekai,
  themeMode,
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled,
  orientation = 'horizontal',
  showValue = false,
}: SliderProps) => {
  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({ sekai, mode: themeMode })

  const [internalValue, setInternalValue] = useState<number>(defaultValue ?? value)

  const sekaiColorTrack = convertHexToRgba(sekaiColor, isLight ? 0.2 : 0.3)
  const percent = getPercent(internalValue, min, max)

  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-track': sekaiColorTrack,
    '--sekai-slider-percent': `${percent}%`,
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(e.target.value)
    setInternalValue(nextValue)
    onChange?.(nextValue)
  }

  const isVertical = orientation === 'vertical'

  return (
    <div
      id={id}
      className={clsx(
        styles['sekai-slider'],
        styles[`sekai-slider--${modeTheme}`],
        isVertical && styles['sekai-slider--vertical'],
        disabled && styles['sekai-slider--disabled'],
        className,
      )}
      style={{ ...(optionStyle as React.CSSProperties), ...style }}>
      <div className={styles['sekai-slider-track']}>
        <div className={styles['sekai-slider-fill']} />
        {showValue ? (
          <div className={styles['sekai-slider-value']} aria-hidden="true">
            {internalValue}
          </div>
        ) : null}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={internalValue}
          disabled={disabled}
          aria-orientation={orientation}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={internalValue}
          onChange={handleChange}
          className={styles[`sekai-slider-input--${modeTheme}`]}
        />
      </div>
    </div>
  )
}
