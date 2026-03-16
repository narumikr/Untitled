import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type { SekaiTheme } from '@/utils/createSekai'
import type React from 'react'

export interface YourSekaiProviderProps {
  /** Providerの子要素 - Children elements of the provider */
  children: React.ReactNode
  /**
   * セカイテーマ - Sekai theme
   * @see {@link SekaiTheme}
   * @remark YourSekaiProviderはsekaiThemeを必須とし、YourSekaiContextを通じて子コンポーネントに提供します。sekaiThemeはセカイカラーとテーマモードの両方を含む必要があります。
   */
  sekaiTheme: SekaiTheme
  /** YourSekaiProviderのオプション - Options for YourSekaiProvider */
  options?: YourSekaiOptions
}

export interface YourSekaiOptions {
  /**
   * セカイカラーを保存するかどうか - Whether to store the Sekai color
   * @default false
   * @remark trueに設定すると、ストレージに保存されず、描画ごとに初期値にリセットされます
   */
  disableStoreSekai?: boolean
  /**
   * テーマモードを保存するかどうか - Whether to store the theme mode
   * @default false
   * @remark trueに設定すると、ストレージに保存されず、描画ごとに初期値にリセットされます
   */
  disableStoreTheme?: boolean
}

export interface YourSekaiContextProps {
  /**
   * セカイテーマ - Sekai theme
   * @see {@link SekaiTheme}
   * @remark YourSekaiProviderはsekaiThemeを必須とし、YourSekaiContextを通じて子コンポーネントに提供します。sekaiThemeはセカイカラーとテーマモードの両方を含む必要があります。
   */
  sekaiTheme: SekaiTheme
  /**
   * セカイカラーを変更する関数 - Function to change Sekai color
   * @see {@link ColorsSekaiKey}
   * @remark YourSekaiProviderで提供するカラーを変更する関数です
   */
  switchSekaiColor?: (sekai: ColorsSekaiKey) => void
  /**
   * テーマモードを変更する関数 - Function to change theme mode
   * @see {@link PaletteMode}
   * @remark YourSekaiProviderで提供するテーマモードを変更する関数です
   */
  switchColorTheme?: (color: PaletteMode) => void
}
