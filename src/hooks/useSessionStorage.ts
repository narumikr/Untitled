import { useCallback, useEffect, useRef, useState } from 'react'

import { ConsoleError } from '@/internal/logging'
import { deserializeData, serializeData } from '@/utils/serialization'

export const useSessionStorage = <T>(sessionStorageKey: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current) return
    isInitialized.current = true

    try {
      const items = sessionStorage.getItem(sessionStorageKey)
      if (items) {
        setStoredValue(deserializeData(JSON.parse(items)) as T)
      }
    } catch (err) {
      ConsoleError('Failed to get session storage value : ', err)
    }
  }, [initialValue, sessionStorageKey])

  useEffect(() => {
    if (!isInitialized.current) return

    try {
      sessionStorage.setItem(sessionStorageKey, JSON.stringify(serializeData(storedValue)))
    } catch (err) {
      ConsoleError('Failed to set session storage : ', err)
    }
  }, [sessionStorageKey, storedValue])

  const deleteSessionStorage = useCallback(() => {
    setStoredValue(initialValue)
    sessionStorage.removeItem(sessionStorageKey)
  }, [initialValue, sessionStorageKey])

  return {
    storedValue,
    setStoredValue,
    deleteSessionStorage,
  }
}
