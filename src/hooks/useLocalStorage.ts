import { useCallback, useEffect, useRef, useState } from 'react'

import { ConsoleError } from '@/internal/logging'
import { deserializeData, serializeData } from '@/utils/serialization'

export const useLocalStorage = <T>(localStorageKey: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current) return
    isInitialized.current = true

    try {
      const items = localStorage.getItem(localStorageKey)
      if (items) {
        setStoredValue(deserializeData(JSON.parse(items)) as T)
      }
    } catch (err) {
      ConsoleError('Failed to get local storage value : ', err)
    }
  }, [initialValue, localStorageKey])

  useEffect(() => {
    if (!isInitialized.current) return

    try {
      localStorage.setItem(localStorageKey, JSON.stringify(serializeData(storedValue)))
    } catch (err) {
      ConsoleError('Failed to set local storage : ', err)
    }
  }, [localStorageKey, storedValue])

  useEffect(() => {
    const updateLocalStorage = (e: StorageEvent) => {
      try {
        if (e.key !== localStorageKey) return

        if (e.newValue === null) {
          setStoredValue(initialValue)
        } else {
          setStoredValue(deserializeData(JSON.parse(e.newValue)) as T)
        }
      } catch (err) {
        ConsoleError('Failed to set local storage : ', err)
      }
    }

    window.addEventListener('storage', updateLocalStorage)

    return () => window.removeEventListener('storage', updateLocalStorage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteLocalStorage = useCallback(() => {
    setStoredValue(initialValue)
    localStorage.removeItem(localStorageKey)
  }, [initialValue, localStorageKey])

  return {
    storedValue,
    setStoredValue,
    deleteLocalStorage,
  }
}
