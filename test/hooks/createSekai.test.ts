import fc from 'fast-check'
import { describe, it, expect } from 'vitest'

import { LIGHT_MODE, DARK_MODE } from '@/hooks/useThemeMode'
import { createSekai } from '@/utils/createSekai'

import { COLORS_SEKAI_KEYS, colorSekaiKeyList } from '@/styles/sekai-colors'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type { SekaiThemeProps } from '@/utils/createSekai'

describe('createSekai', () => {
  describe('デフォルト値のフォールバック', () => {
    it('mode を省略した場合、デフォルトで light が設定される', () => {
      const input: SekaiThemeProps = {
        palette: { sekai: COLORS_SEKAI_KEYS.Miku },
      }
      const result = createSekai(input)
      expect(result.palette.mode).toBe(LIGHT_MODE)
    })

    it('typography を省略した場合、デフォルトの fontFamily が設定される', () => {
      const input: SekaiThemeProps = {
        palette: { sekai: COLORS_SEKAI_KEYS.Miku },
      }
      const result = createSekai(input)
      expect(result.typography.fontFamily).toBe('Montserrat, sans-serif')
    })

    it('fontFamily を省略した場合、デフォルトの fontFamily が設定される', () => {
      const input: SekaiThemeProps = {
        palette: { sekai: COLORS_SEKAI_KEYS.Rin },
        typography: {},
      }
      const result = createSekai(input)
      expect(result.typography.fontFamily).toBe('Montserrat, sans-serif')
    })
  })

  describe('明示的な値の適用', () => {
    it('mode を指定した場合、指定値が使用される', () => {
      const input: SekaiThemeProps = {
        palette: { sekai: COLORS_SEKAI_KEYS.Luka, mode: DARK_MODE },
      }
      const result = createSekai(input)
      expect(result.palette.mode).toBe(DARK_MODE)
    })

    it('fontFamily を指定した場合、指定値が使用される', () => {
      const input: SekaiThemeProps = {
        palette: { sekai: COLORS_SEKAI_KEYS.Kaito },
        typography: { fontFamily: 'Noto Sans JP, sans-serif' },
      }
      const result = createSekai(input)
      expect(result.typography.fontFamily).toBe('Noto Sans JP, sans-serif')
    })

    it('sekai キーが正しく設定される', () => {
      const input: SekaiThemeProps = {
        palette: { sekai: COLORS_SEKAI_KEYS.Len },
      }
      const result = createSekai(input)
      expect(result.palette.sekai).toBe('Len')
    })
  })

  describe('完全な SekaiTheme オブジェクトの生成', () => {
    it('全プロパティを指定した場合、完全なテーマオブジェクトが返される', () => {
      const input: SekaiThemeProps = {
        palette: { sekai: COLORS_SEKAI_KEYS.Kohane, mode: DARK_MODE },
        typography: { fontFamily: 'Arial, sans-serif' },
      }
      const result = createSekai(input)
      expect(result).toEqual({
        palette: { sekai: 'Kohane', mode: 'dark' },
        typography: { fontFamily: 'Arial, sans-serif' },
      })
    })

    it('最小限のプロパティでも完全なテーマオブジェクトが返される', () => {
      const input: SekaiThemeProps = {
        palette: { sekai: COLORS_SEKAI_KEYS.Miku },
      }
      const result = createSekai(input)
      expect(result).toEqual({
        palette: { sekai: 'Miku', mode: 'light' },
        typography: { fontFamily: 'Montserrat, sans-serif' },
      })
    })
  })

  describe('プロパティベーステスト', () => {
    const sekaiKeyArb = fc.constantFrom(...colorSekaiKeyList) as fc.Arbitrary<ColorsSekaiKey>
    const modeArb = fc.constantFrom<PaletteMode>(LIGHT_MODE, DARK_MODE)
    const fontFamilyArb = fc.stringOf(
      fc.char().filter((c) => c !== '\0'),
      { minLength: 1 },
    )

    // Feature: unit-test-strategy, Property 13: createSekai のデフォルト値フォールバック
    it('部分的な入力に対して、省略フィールドにデフォルト値が適用される', () => {
      fc.assert(
        fc.property(
          sekaiKeyArb,
          fc.option(modeArb, { nil: undefined }),
          fc.option(fontFamilyArb, { nil: undefined }),
          (sekai, mode, fontFamily) => {
            const input: SekaiThemeProps = {
              palette: { sekai, mode },
              ...(fontFamily !== undefined ? { typography: { fontFamily } } : {}),
            }
            const result = createSekai(input)

            // sekai は常にそのまま渡される
            expect(result.palette.sekai).toBe(sekai)

            // mode 省略時は LIGHT_MODE にフォールバック
            expect(result.palette.mode).toBe(mode || LIGHT_MODE)

            // fontFamily 省略時はデフォルト値にフォールバック
            expect(result.typography.fontFamily).toBe(fontFamily ?? 'Montserrat, sans-serif')

            // 返却値は常に完全な SekaiTheme 構造を持つ
            expect(result).toHaveProperty('palette.sekai')
            expect(result).toHaveProperty('palette.mode')
            expect(result).toHaveProperty('typography.fontFamily')
          },
        ),
        { numRuns: 100 },
      )
    })
  })
})
