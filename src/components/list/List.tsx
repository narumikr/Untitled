import React, { createContext } from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'

import globalStyles from '@/styles/global.module.scss'

import styles from './List.module.scss'

export const ListContext = createContext<boolean>(false)

import type { ListProps } from '@/types/components/list/List.types'

export const List = ({
  sekai,
  themeMode,
  children,
  as = 'ul',
  noBullet = true,
  ...rest
}: ListProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })

  const Component = as
  const optionStyle = {
    '--sekai-color': sekaiColor,
  }
  const listStyleType = noBullet ? 'none' : undefined
  const paddingLeft = noBullet ? '0' : '36px'

  return (
    <ListContext.Provider value={true}>
      <Component
        {...rest}
        ref={rest.ref as React.Ref<HTMLUListElement & HTMLOListElement>}
        className={clsx(
          globalStyles[`sekai-text-${modeTheme}`],
          styles['sekai-list'],
          rest.className,
        )}
        style={{
          listStyleType: listStyleType,
          paddingLeft: paddingLeft,
          ...(optionStyle as React.CSSProperties),
          ...rest.style,
        }}>
        {children}
      </Component>
    </ListContext.Provider>
  )
}
