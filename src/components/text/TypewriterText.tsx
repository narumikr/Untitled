import React, { useEffect, useMemo, useState } from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'

import styles from './TypewriterText.module.scss'

import type { TypewriterTextProps } from '@/types/components/text/TypewriterText.types'

const defaultOptions: TypewriterTextProps['options'] = {
  speed: 100,
  loop: false,
  showCursor: true,
}

export const TypewriterText = ({
  sekai,
  themeMode,
  text,
  options = defaultOptions,
  ...rest
}: TypewriterTextProps) => {
  const { sekaiColor } = useOptionalSekai({ sekai, mode: themeMode })
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const viewCursor = useMemo(() => {
    return options.showCursor && displayText.length < text.length
  }, [displayText, text, options.showCursor])

  useEffect(() => {
    setDisplayText('')
    const typewriteInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= text.length - 1) {
          if (options.loop) {
            setDisplayText('')
            return 0
          } else {
            clearInterval(typewriteInterval)
            return prevIndex
          }
        }
        return prevIndex + 1
      })
    }, options.speed)

    return () => clearInterval(typewriteInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setDisplayText((pre) => pre + text[currentIndex])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  const optionStyle = {
    '--sekai-color': sekaiColor,
  }

  return (
    <div
      {...rest}
      className={clsx(
        styles['sekai-typewrite-text'],
        {
          [styles['sekai-cursor']]: viewCursor,
        },
        rest.className,
      )}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      {displayText}
    </div>
  )
}
