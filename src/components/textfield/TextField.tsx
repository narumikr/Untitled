import React, { useState } from 'react'

import clsx from 'clsx'

import { AnnotationText } from '@/components/text/UtilText'

import { ClearSvg } from '@/img/clear'
import { useOptionalSekai } from '@/internal/useOptionalSekai'

import styles from './TextField.module.scss'

import type { TextFieldProps } from '@/types/components/textfield/TextField.types'

export const TextField = ({
  id,
  className,
  style,
  sekai,
  themeMode,
  showClearButton = true,
  onChangeInput,
  isError = false,
  errorMessage,
  ...inputProps
}: TextFieldProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })

  const [inputValue, setInputValue] = useState('')

  const optionStyle = {
    '--sekai-color': sekaiColor,
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    onChangeInput?.(value)
  }

  const handleClearInput = () => {
    setInputValue('')
    onChangeInput?.('')
  }

  return (
    <div
      id={id}
      className={clsx(styles['sekai-textfield'], className)}
      style={{ ...(optionStyle as React.CSSProperties), ...style }}>
      <div className={clsx(styles['sekai-textfield-wrapper'])}>
        <input
          id={`${id}-input`}
          type="text"
          {...inputProps}
          className={clsx(styles[`sekai-textfield-input-${modeTheme}`], {
            [styles['sekai-textfield-clear']]: showClearButton,
          })}
          value={inputValue}
          onChange={handleInputChange}
        />
        {/* clear button */}
        {showClearButton && inputValue.length ? (
          <button
            className={clsx(styles['sekai-textfield-clear-button'])}
            onClick={handleClearInput}>
            <ClearSvg
              className={clsx(styles['sekai-textfield-clear-icon'])}
              sekai={sekai}
              themeMode={themeMode}
            />
          </button>
        ) : null}
      </div>
      {isError ? (
        <AnnotationText className={clsx(styles['sekai-textfield-input-error'])}>
          {errorMessage}
        </AnnotationText>
      ) : null}
    </div>
  )
}
