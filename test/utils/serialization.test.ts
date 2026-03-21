import fc from 'fast-check'
import { describe, it, expect } from 'vitest'

import { serializeData, deserializeData } from '@/utils/serialization'

describe('serializeData', () => {
  it('DateオブジェクトをISO文字列に変換する', () => {
    const date = new Date('2024-01-15T10:30:00.000Z')
    expect(serializeData(date)).toBe('2024-01-15T10:30:00.000Z')
  })

  it('ネストされたオブジェクト内のDateをISO文字列に変換する', () => {
    const data = {
      name: 'test',
      createdAt: new Date('2024-06-01T00:00:00.000Z'),
    }
    const result = serializeData(data) as Record<string, unknown>
    expect(result.name).toBe('test')
    expect(result.createdAt).toBe('2024-06-01T00:00:00.000Z')
  })

  it('配列内のDateをISO文字列に変換する', () => {
    const data = [new Date('2024-01-01T00:00:00.000Z'), 'hello', 42]
    const result = serializeData(data) as unknown[]
    expect(result[0]).toBe('2024-01-01T00:00:00.000Z')
    expect(result[1]).toBe('hello')
    expect(result[2]).toBe(42)
  })

  it('プリミティブ値はそのまま返す', () => {
    expect(serializeData('hello')).toBe('hello')
    expect(serializeData(42)).toBe(42)
    expect(serializeData(true)).toBe(true)
    expect(serializeData(null)).toBe(null)
  })

  it('循環参照オブジェクトでエラーをスローする', () => {
    const obj: Record<string, unknown> = { a: 1 }
    obj.self = obj
    expect(() => serializeData(obj)).toThrow('Circular reference detected')
  })

  it('循環参照配列でエラーをスローする', () => {
    const arr: unknown[] = [1, 2]
    arr.push(arr)
    expect(() => serializeData(arr)).toThrow('Circular reference detected')
  })
})

describe('deserializeData', () => {
  it('ISO文字列をDateオブジェクトに復元する', () => {
    const result = deserializeData('2024-01-15T10:30:00.000Z')
    expect(result).toBeInstanceOf(Date)
    expect((result as Date).toISOString()).toBe('2024-01-15T10:30:00.000Z')
  })

  it('ネストされたオブジェクト内のISO文字列をDateに復元する', () => {
    const data = {
      name: 'test',
      createdAt: '2024-06-01T00:00:00.000Z',
    }
    const result = deserializeData(data) as Record<string, unknown>
    expect(result.name).toBe('test')
    expect(result.createdAt).toBeInstanceOf(Date)
    expect((result.createdAt as Date).toISOString()).toBe('2024-06-01T00:00:00.000Z')
  })

  it('配列内のISO文字列をDateに復元する', () => {
    const data = ['2024-01-01T00:00:00.000Z', 'hello', 42]
    const result = deserializeData(data) as unknown[]
    expect(result[0]).toBeInstanceOf(Date)
    expect(result[1]).toBe('hello')
    expect(result[2]).toBe(42)
  })

  it('プリミティブ値はそのまま返す', () => {
    expect(deserializeData(42)).toBe(42)
    expect(deserializeData(true)).toBe(true)
    expect(deserializeData(null)).toBe(null)
  })

  it('日付形式でない文字列はそのまま返す', () => {
    expect(deserializeData('hello')).toBe('hello')
    expect(deserializeData('not-a-date')).toBe('not-a-date')
  })

  it('循環参照オブジェクトでエラーをスローする', () => {
    const obj: Record<string, unknown> = { a: 1 }
    obj.self = obj
    expect(() => deserializeData(obj)).toThrow(
      'Circular reference detected during deserialization',
    )
  })
})

// ラウンドトリップ後のデータを深い等価性で比較するヘルパー群
// Date は toISOString() で比較する

function deepEqualArrays(a: unknown[], b: unknown[]): boolean {
  if (a.length !== b.length) return false
  return a.every((val, i) => deepEqualWithDates(val, b[i]))
}

function deepEqualObjects(
  a: Record<string, unknown>,
  b: Record<string, unknown>,
): boolean {
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false
  return keysA.every((key) => deepEqualWithDates(a[key], b[key]))
}

function compareByType(a: unknown, b: unknown): boolean {
  if (Array.isArray(a) && Array.isArray(b)) return deepEqualArrays(a, b)
  if (typeof a === 'object' && typeof b === 'object') {
    return deepEqualObjects(a as Record<string, unknown>, b as Record<string, unknown>)
  }
  return Object.is(a, b)
}

function deepEqualWithDates(a: unknown, b: unknown): boolean {
  if (a instanceof Date && b instanceof Date) return a.toISOString() === b.toISOString()
  if (a instanceof Date || b instanceof Date) return false
  if (a === null || b === null) return a === b
  if (typeof a !== typeof b) return false
  return compareByType(a, b)
}

// 日付文字列に見える文字列を生成しないための安全な文字列 arbitrary
// isValidDateString が true を返す文字列を除外する
const safeString = fc.string().filter((s) => {
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/
  return !isoRegex.test(s.trim()) && isNaN(Date.parse(s))
})

// 有効な Date arbitrary（NaN にならない範囲）
const validDate = fc.date({
  min: new Date('1970-01-01T00:00:00.000Z'),
  max: new Date('2099-12-31T23:59:59.999Z'),
})

// プリミティブ値の arbitrary（日付文字列を除外）
const primitiveArb = fc.oneof(
  safeString,
  fc.integer(),
  fc.double({ noNaN: true, noDefaultInfinity: true }),
  fc.boolean(),
  fc.constant(null),
)

// Date を含むリーフ値の arbitrary
const leafArb = fc.oneof(primitiveArb, validDate)

// ネストされたデータ構造の arbitrary（再帰的）
const serializableData: fc.Arbitrary<unknown> = fc.letrec((tie) => ({
  tree: fc.oneof(
    { depthSize: 'small', withCrossShrink: true },
    leafArb,
    fc.array(tie('tree'), { maxLength: 5 }),
    fc.dictionary(
      safeString.filter((s) => s.length > 0 && s.length <= 20),
      tie('tree'),
      { maxKeys: 5 },
    ),
  ),
})).tree

// Feature: unit-test-strategy, Property 4: シリアライゼーション ラウンドトリップ
describe('serialization プロパティベーステスト', () => {
  it('任意のプリミティブ値に対して、ラウンドトリップで等価なデータが復元される', () => {
    fc.assert(
      fc.property(primitiveArb, (data) => {
        const roundTripped = deserializeData(JSON.parse(JSON.stringify(serializeData(data))))
        return deepEqualWithDates(data, roundTripped)
      }),
      { numRuns: 100 },
    )
  })

  it('任意の Date オブジェクトに対して、ラウンドトリップで等価な Date が復元される', () => {
    fc.assert(
      fc.property(validDate, (data) => {
        const roundTripped = deserializeData(JSON.parse(JSON.stringify(serializeData(data))))
        return deepEqualWithDates(data, roundTripped)
      }),
      { numRuns: 100 },
    )
  })

  it('任意のネストされたオブジェクト・配列に対して、ラウンドトリップで等価なデータが復元される', () => {
    fc.assert(
      fc.property(serializableData, (data) => {
        const roundTripped = deserializeData(JSON.parse(JSON.stringify(serializeData(data))))
        return deepEqualWithDates(data, roundTripped)
      }),
      { numRuns: 100 },
    )
  })
})
