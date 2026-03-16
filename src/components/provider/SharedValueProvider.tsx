import React, { createContext, useContext } from 'react'

import { useSessionStorage } from '@/hooks/useSessionStorage'

import type {
  SharedValueContextProps,
  SharedValueProviderProps,
} from '@/types/components/provider/SharedValueProvider.types'

export const createSharedValueProvider = <T,>() => {
  const SharedValueContext = createContext<SharedValueContextProps<T> | null>(null)

  const useSharedValueContext = () => {
    const context = useContext(SharedValueContext)
    if (!context) {
      throw new Error('useSharedValueContext must be used within a SharedValueProvider.')
    }
    return context
  }

  const SharedValueProvider = ({
    children,
    sessionStorageKey,
    defaultValue,
  }: SharedValueProviderProps<T>) => {
    const {
      storedValue: sharedValue,
      setStoredValue: setSharedValue,
      deleteSessionStorage: deleteSharedValue,
    } = useSessionStorage<T>(sessionStorageKey, defaultValue)

    return (
      <SharedValueContext.Provider value={{ sharedValue, setSharedValue, deleteSharedValue }}>
        {children}
      </SharedValueContext.Provider>
    )
  }

  return {
    useSharedValueContext,
    SharedValueProvider,
  }
}
