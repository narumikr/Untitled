import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgba } from '@/utils/converter'

import styles from './Tab.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type {
  TabItem,
  TabPanelProps,
  TabProps,
  TabVariant,
} from '@/types/components/tab/Tab.types'

const buildVariantStyle = (
  sekaiColor: string,
  isLight: boolean,
): React.CSSProperties => {
  const sekaiColorHover = convertHexToRgba(sekaiColor, isLight ? 0.2 : 0.4)

  return {
    '--sekai-color': sekaiColor,
    '--sekai-color-bg': sekaiColorHover,
  } as React.CSSProperties
}

export const Tab = ({
  sekai,
  themeMode,
  tabList,
  currentTab,
  onChange,
  variant = 'underline',
  ...rest
}: TabProps) => {
  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({ sekai, mode: themeMode })
  const tabButtonRefs = React.useRef<Array<HTMLButtonElement | null>>([])

  const optionStyle = buildVariantStyle(sekaiColor, isLight)

  const focusTab = (index: number) => {
    const target = tabButtonRefs.current[index]

    if (!target) {
      return
    }

    onChange(index)
    target.focus()
  }

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % tabList.length
        break
      case 'ArrowLeft':
        nextIndex = (index - 1 + tabList.length) % tabList.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = tabList.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    focusTab(nextIndex)
  }

  return (
    <div
      {...rest}
      role="tablist"
      className={clsx(
        styles['sekai-tab'],
        styles[`sekai-tab--${variant}`],
        styles[`sekai-tab--${modeTheme}`],
        rest.className,
      )}
      style={{ ...optionStyle, ...rest.style }}>
      {tabList.map((tab, index) => (
        <TabItemButton
          key={tab.label}
          variant={variant}
          modeTheme={modeTheme}
          tab={tab}
          selected={index === currentTab}
          buttonRef={node => {
            tabButtonRefs.current[index] = node
          }}
          onKeyDown={event => handleTabKeyDown(event, index)}
          onClick={() => onChange(index)}
          id={`sekai-tab-${index}`}
          ariaControls={`sekai-tabpanel-${index}`}
        />
      ))}
    </div>
  )
}

interface TabItemButtonProps {
  variant: TabVariant
  modeTheme: PaletteMode
  tab: TabItem
  selected: boolean
  buttonRef: React.RefCallback<HTMLButtonElement>
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>
  onClick: () => void
  id: string
  ariaControls: string
}

const TabItemButton = ({
  variant,
  modeTheme,
  tab,
  selected,
  buttonRef,
  onKeyDown,
  onClick,
  id,
  ariaControls,
}: TabItemButtonProps) => {
  return (
    <button
      ref={buttonRef}
      type="button"
      role="tab"
      id={id}
      aria-controls={ariaControls}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      onKeyDown={onKeyDown}
      onClick={onClick}
      className={clsx(
        styles['sekai-tab-item'],
        styles[`sekai-tab-item--${variant}`],
        styles[`sekai-tab-item--${modeTheme}`],
        selected && styles['sekai-tab-item--selected'],
      )}>
      {tab.icon}
      <span className={styles['sekai-tab-item-label']}>{tab.label}</span>
    </button>
  )
}

export const TabPanel = ({ children, tabIndex, currentTab, ...rest }: TabPanelProps) => {
  const isVisible = currentTab === tabIndex

  return (
    <div
      {...rest}
      role="tabpanel"
      hidden={!isVisible}
      id={`sekai-tabpanel-${tabIndex}`}
      aria-labelledby={`sekai-tab-${tabIndex}`}
      className={clsx(
        styles['sekai-tabpanel'],
        isVisible ? styles['sekai-tabpanel--visible'] : styles['sekai-tabpanel--hidden'],
        rest.className,
      )}
      style={rest.style}>
      {isVisible ? children : null}
    </div>
  )
}
