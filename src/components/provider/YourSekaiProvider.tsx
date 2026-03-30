import React, { createContext, memo, useCallback, useEffect, useMemo, useState } from 'react'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { DARK_MODE } from '@/hooks/useThemeMode'
import {
  BACKGROUND_DARK_MODE,
  BACKGROUND_LIGHT_MODE,
  COLOR_DARK_MODE,
  COLOR_LIGHT_MODE,
} from '@/internal/color.constant'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type {
  YourSekaiProviderProps,
  YourSekaiContextProps,
} from '@/types/components/provider/YourSekaiProvider.types'
import type { SekaiTheme } from '@/utils/createSekai'

export const YOUR_SEKAI_COLOR = 'your_sekai_color'
export const YOUR_COLOR_THEME = 'your_color_theme'

export const YourSekaiContext = createContext<YourSekaiContextProps | null>(null)

export const YourSekaiProvider = ({
  children,
  sekaiTheme,
  options,
}: YourSekaiProviderProps) => {
  const { value: sekaiColor, setValue: setSekaiColor } = useStorageOrState(
    YOUR_SEKAI_COLOR,
    sekaiTheme.palette.sekai,
    options?.disableStoreSekai,
  )

  const { value: colorTheme, setValue: setColorTheme } = useStorageOrState(
    YOUR_COLOR_THEME,
    sekaiTheme.palette.mode,
    options?.disableStoreTheme,
  )

  const switchSekaiColor = useCallback(
    (sekai: ColorsSekaiKey) => {
      setSekaiColor(sekai)
    },
    [setSekaiColor],
  )

  const switchColorTheme = useCallback(
    (color: PaletteMode) => {
      setColorTheme(color)
    },
    [setColorTheme],
  )

  const currentSekaiTheme = useMemo(
    () => ({
      ...sekaiTheme,
      palette: {
        ...sekaiTheme.palette,
        sekai: sekaiColor,
        mode: colorTheme,
      },
    }),
    [colorTheme, sekaiColor, sekaiTheme],
  )

  const contextValue = useMemo(
    () => ({
      sekaiTheme: currentSekaiTheme,
      switchSekaiColor,
      switchColorTheme,
    }),
    [currentSekaiTheme, switchColorTheme, switchSekaiColor],
  )

  return (
    <YourSekaiContext.Provider value={contextValue}>
      <GlobalStyle theme={currentSekaiTheme} />
      {children}
    </YourSekaiContext.Provider>
  )
}

const GlobalStyle = memo(({ theme }: { theme: SekaiTheme }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const style = useMemo(
    () => `
    * {
      font-family: ${theme.typography.fontFamily};
    }
    body {
      color: ${theme.palette.mode === DARK_MODE ? COLOR_DARK_MODE : COLOR_LIGHT_MODE};
      background: ${theme.palette.mode === DARK_MODE ? BACKGROUND_DARK_MODE : BACKGROUND_LIGHT_MODE};
    }
  `,
    [theme.palette.mode, theme.typography.fontFamily],
  )

  if (!isClient) return null

  return <style>{style}</style>
})

GlobalStyle.displayName = 'GlobalStyle'

/**
 * Helper hook to use either session storage or state based on a disabled flag.
 */
const useStorageOrState = <T,>(
  storageKey: string,
  initialValue: T,
  disabled: boolean = false,
) => {
  const localStorage = useLocalStorage<T>(storageKey, initialValue)
  const [state, setState] = useState<T>(initialValue)

  useEffect(() => {
    if (disabled) {
      localStorage.deleteLocalStorage()
    }
  }, [disabled, localStorage])

  if (disabled) {
    return { value: state, setValue: setState }
  }

  return { value: localStorage.storedValue, setValue: localStorage.setStoredValue }
}
