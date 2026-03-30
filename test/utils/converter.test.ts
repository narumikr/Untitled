import fc from 'fast-check'
import { describe, it, expect } from 'vitest'

import {
  convertHexToRgb,
  convertHexToRgba,
  convertHexToRgbaMixWithBlackOrWhite,
} from '@/utils/converter'

describe('convertHexToRgb', () => {
  it('有効なHEXカラーをRGBに変換する', () => {
    expect(convertHexToRgb('#FF0000')).toBe('rgb(255, 0, 0)')
    expect(convertHexToRgb('#00FF00')).toBe('rgb(0, 255, 0)')
    expect(convertHexToRgb('#0000FF')).toBe('rgb(0, 0, 255)')
  })

  it('黒と白のHEXカラーを正しく変換する', () => {
    expect(convertHexToRgb('#000000')).toBe('rgb(0, 0, 0)')
    expect(convertHexToRgb('#FFFFFF')).toBe('rgb(255, 255, 255)')
  })

  it('小文字のHEXカラーを正しく変換する', () => {
    expect(convertHexToRgb('#ff8800')).toBe('rgb(255, 136, 0)')
  })

  it('無効なHEXカラーでエラーをスローする', () => {
    expect(() => convertHexToRgb('invalid')).toThrow('Invalid hex color format. Use #RRGGBB')
    expect(() => convertHexToRgb('#GGG000')).toThrow('Invalid hex color format. Use #RRGGBB')
    expect(() => convertHexToRgb('#FFF')).toThrow('Invalid hex color format. Use #RRGGBB')
    expect(() => convertHexToRgb('')).toThrow('Invalid hex color format. Use #RRGGBB')
  })
})

describe('convertHexToRgba', () => {
  it('有効なHEXカラーとアルファ値をRGBAに変換する', () => {
    expect(convertHexToRgba('#FF0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)')
    expect(convertHexToRgba('#00FF00', 0)).toBe('rgba(0, 255, 0, 0)')
    expect(convertHexToRgba('#0000FF', 1)).toBe('rgba(0, 0, 255, 1)')
  })

  it('アルファ値を省略した場合デフォルト値1が使用される', () => {
    expect(convertHexToRgba('#FF0000')).toBe('rgba(255, 0, 0, 1)')
  })

  it('無効なHEXカラーでエラーをスローする', () => {
    expect(() => convertHexToRgba('invalid', 0.5)).toThrow(
      'Invalid hex color format. Use #RRGGBB',
    )
  })

  it('範囲外のアルファ値でエラーをスローする', () => {
    expect(() => convertHexToRgba('#FF0000', -0.1)).toThrow('Alpha must be between 0 and 1')
    expect(() => convertHexToRgba('#FF0000', 1.1)).toThrow('Alpha must be between 0 and 1')
  })
})

describe('convertHexToRgbaMixWithBlackOrWhite', () => {
  it('白との混合色を正しく計算する', () => {
    // #000000 を mixRatio=0.5 で白と混合 → 各成分: round(0*0.5 + 255*0.5) = 128
    expect(convertHexToRgbaMixWithBlackOrWhite('#000000', 0.5, true)).toBe(
      'rgba(128, 128, 128, 1)',
    )
  })

  it('黒との混合色を正しく計算する', () => {
    // #FFFFFF を mixRatio=0.5 で黒と混合 → 各成分: round(255*0.5 + 0*0.5) = 128
    expect(convertHexToRgbaMixWithBlackOrWhite('#FFFFFF', 0.5, false)).toBe(
      'rgba(128, 128, 128, 1)',
    )
  })

  it('mixRatio=1で元の色が維持される', () => {
    expect(convertHexToRgbaMixWithBlackOrWhite('#FF0000', 1, true)).toBe('rgba(255, 0, 0, 1)')
    expect(convertHexToRgbaMixWithBlackOrWhite('#FF0000', 1, false)).toBe('rgba(255, 0, 0, 1)')
  })

  it('mixRatio=0で白または黒になる', () => {
    expect(convertHexToRgbaMixWithBlackOrWhite('#FF0000', 0, true)).toBe(
      'rgba(255, 255, 255, 1)',
    )
    expect(convertHexToRgbaMixWithBlackOrWhite('#FF0000', 0, false)).toBe('rgba(0, 0, 0, 1)')
  })

  it('アルファ値を指定できる', () => {
    expect(convertHexToRgbaMixWithBlackOrWhite('#FF0000', 1, true, 0.5)).toBe(
      'rgba(255, 0, 0, 0.5)',
    )
  })

  it('無効なHEXカラーでエラーをスローする', () => {
    expect(() => convertHexToRgbaMixWithBlackOrWhite('invalid', 0.5, true)).toThrow(
      'Invalid hex color format. Use #RRGGBB',
    )
  })

  it('範囲外のmixRatioでエラーをスローする', () => {
    expect(() => convertHexToRgbaMixWithBlackOrWhite('#FF0000', -0.1, true)).toThrow(
      'mixRatio must be between 0 and 1',
    )
    expect(() => convertHexToRgbaMixWithBlackOrWhite('#FF0000', 1.1, true)).toThrow(
      'mixRatio must be between 0 and 1',
    )
  })

  it('範囲外のアルファ値でエラーをスローする', () => {
    expect(() => convertHexToRgbaMixWithBlackOrWhite('#FF0000', 0.5, true, -0.1)).toThrow(
      'alpha must be between 0 and 1',
    )
    expect(() => convertHexToRgbaMixWithBlackOrWhite('#FF0000', 0.5, true, 1.1)).toThrow(
      'alpha must be between 0 and 1',
    )
  })
})

// --- プロパティベーステスト ---

// 有効な6桁HEXカラー文字列を生成するカスタム Arbitrary
const hexColorArb = fc
  .tuple(
    fc.integer({ min: 0, max: 255 }),
    fc.integer({ min: 0, max: 255 }),
    fc.integer({ min: 0, max: 255 }),
  )
  .map(([r, g, b]) => ({
    hex: `#${r.toString(16).padStart(2, '0').toUpperCase()}${g.toString(16).padStart(2, '0').toUpperCase()}${b.toString(16).padStart(2, '0').toUpperCase()}`,
    r,
    g,
    b,
  }))

const alphaArb = fc.double({ min: 0, max: 1, noNaN: true })
const mixRatioArb = fc.double({ min: 0, max: 1, noNaN: true })

// Feature: unit-test-strategy, Property 1: HEX→RGB 変換の正当性
describe('Property 1: HEX→RGB 変換の正当性', () => {
  it('任意の有効なHEXカラーに対して、rgb(R, G, B) 形式で正しい値を返す', () => {
    fc.assert(
      fc.property(hexColorArb, ({ hex, r, g, b }) => {
        const result = convertHexToRgb(hex)
        expect(result).toBe(`rgb(${r}, ${g}, ${b})`)
      }),
      { numRuns: 100 },
    )
  })
})

// Feature: unit-test-strategy, Property 2: HEX→RGBA 変換と混合色計算の正当性
describe('Property 2: HEX→RGBA 変換と混合色計算の正当性', () => {
  it('任意の有効なHEXカラーとアルファ値に対して、rgba(R, G, B, A) 形式で正しい値を返す', () => {
    fc.assert(
      fc.property(hexColorArb, alphaArb, ({ hex, r, g, b }, alpha) => {
        const result = convertHexToRgba(hex, alpha)
        expect(result).toBe(`rgba(${r}, ${g}, ${b}, ${alpha})`)
      }),
      { numRuns: 100 },
    )
  })

  it('任意の有効なHEXカラー、混合比率、アルファ値に対して、混合色が数学的に正しい', () => {
    fc.assert(
      fc.property(
        hexColorArb,
        mixRatioArb,
        fc.boolean(),
        alphaArb,
        ({ hex, r, g, b }, mixRatio, mixWhite, alpha) => {
          const result = convertHexToRgbaMixWithBlackOrWhite(hex, mixRatio, mixWhite, alpha)
          const mixColor = mixWhite ? 255 : 0
          const expectedR = Math.round(r * mixRatio + mixColor * (1 - mixRatio))
          const expectedG = Math.round(g * mixRatio + mixColor * (1 - mixRatio))
          const expectedB = Math.round(b * mixRatio + mixColor * (1 - mixRatio))
          expect(result).toBe(`rgba(${expectedR}, ${expectedG}, ${expectedB}, ${alpha})`)
        },
      ),
      { numRuns: 100 },
    )
  })
})

// Feature: unit-test-strategy, Property 3: 無効入力に対するエラー発生
describe('Property 3: 無効入力に対するエラー発生', () => {
  it('任意の非HEX文字列に対して、convertHexToRgb がエラーをスローする', () => {
    const invalidHexArb = fc.string().filter((s) => !/^#([0-9A-Fa-f]{6})$/.test(s))
    fc.assert(
      fc.property(invalidHexArb, (invalidHex) => {
        expect(() => convertHexToRgb(invalidHex)).toThrow()
      }),
      { numRuns: 100 },
    )
  })

  it('任意の非HEX文字列に対して、convertHexToRgba がエラーをスローする', () => {
    const invalidHexArb = fc.string().filter((s) => !/^#([0-9A-Fa-f]{6})$/.test(s))
    fc.assert(
      fc.property(invalidHexArb, (invalidHex) => {
        expect(() => convertHexToRgba(invalidHex, 0.5)).toThrow()
      }),
      { numRuns: 100 },
    )
  })

  it('範囲外のアルファ値に対して、convertHexToRgba がエラーをスローする', () => {
    const outOfRangeAlphaArb = fc.oneof(
      fc.double({ min: -1e10, max: -Number.MIN_VALUE, noNaN: true }),
      fc.double({ min: 1 + Number.EPSILON, max: 1e10, noNaN: true }),
    )
    fc.assert(
      fc.property(hexColorArb, outOfRangeAlphaArb, ({ hex }, alpha) => {
        expect(() => convertHexToRgba(hex, alpha)).toThrow()
      }),
      { numRuns: 100 },
    )
  })

  it('範囲外のmixRatioに対して、convertHexToRgbaMixWithBlackOrWhite がエラーをスローする', () => {
    const outOfRangeRatioArb = fc.oneof(
      fc.double({ min: -1e10, max: -Number.MIN_VALUE, noNaN: true }),
      fc.double({ min: 1 + Number.EPSILON, max: 1e10, noNaN: true }),
    )
    fc.assert(
      fc.property(hexColorArb, outOfRangeRatioArb, ({ hex }, ratio) => {
        expect(() => convertHexToRgbaMixWithBlackOrWhite(hex, ratio, true)).toThrow()
      }),
      { numRuns: 100 },
    )
  })
})
