import type React from 'react'

export interface SharedValueProviderProps<T> {
  /** Providerの子要素 - Children elements of the provider */
  children: React.ReactNode
  /** session storageのキー - Key for session storage */
  sessionStorageKey: string
  /** デフォルト値 - Default value */
  defaultValue: T
}

export interface SharedValueContextProps<T> {
  /** 共有する値 - Shared value */
  sharedValue: T
  /** 共有する値を更新する関数 - Function to update the shared value */
  setSharedValue: React.Dispatch<React.SetStateAction<T>>
  /** 共有する値を削除する関数 - Function to delete the shared value */
  deleteSharedValue: () => void
}
