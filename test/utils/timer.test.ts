import fc from 'fast-check'
import { describe, it, expect } from 'vitest'

import { getFormattedTime, getCustomCurrentTime } from '@/utils/timer'

describe('getFormattedTime', () => {
  // 固定日時: 2024-03-15T10:30:45.000Z
  const fixedDate = new Date('2024-03-15T10:30:45.000Z')

  it('datetime フォーマットでロケール文字列を返す', () => {
    const result = getFormattedTime(fixedDate, 'datetime', 'ja-JP')
    // toLocaleString の結果を検証（日付と時刻の両方を含む）
    expect(result).toBe(fixedDate.toLocaleString('ja-JP'))
  })

  it('date フォーマットで日付文字列を返す', () => {
    const result = getFormattedTime(fixedDate, 'date', 'ja-JP')
    expect(result).toBe(fixedDate.toLocaleDateString('ja-JP'))
  })

  it('time フォーマットで時刻文字列を返す', () => {
    const result = getFormattedTime(fixedDate, 'time', 'ja-JP')
    expect(result).toBe(fixedDate.toLocaleTimeString('ja-JP'))
  })

  it('timestamp フォーマットでUNIXタイムスタンプ文字列を返す', () => {
    const result = getFormattedTime(fixedDate, 'timestamp')
    expect(result).toBe(fixedDate.getTime().toString())
  })

  it('iso フォーマットでISO 8601文字列を返す', () => {
    const result = getFormattedTime(fixedDate, 'iso')
    expect(result).toBe('2024-03-15T10:30:45.000Z')
  })

  it('フォーマット未指定時はdatetimeと同じ結果を返す', () => {
    const result = getFormattedTime(fixedDate)
    expect(result).toBe(fixedDate.toLocaleString('ja-JP'))
  })

  it('不明なフォーマットタイプではdatetimeと同じ結果を返す', () => {
    const result = getFormattedTime(fixedDate, 'unknown')
    expect(result).toBe(fixedDate.toLocaleString('ja-JP'))
  })

  it('en-US ロケールで正しくフォーマットされる', () => {
    const result = getFormattedTime(fixedDate, 'datetime', 'en-US')
    expect(result).toBe(fixedDate.toLocaleString('en-US'))
  })
})

describe('getCustomCurrentTime', () => {
  // 固定日時: タイムゾーン非依存の値で構築
  const fixedDate = new Date(2024, 0, 5, 8, 3, 7) // 2024-01-05 08:03:07 ローカル時刻

  const year = String(fixedDate.getFullYear())
  const month = String(fixedDate.getMonth() + 1).padStart(2, '0')
  const day = String(fixedDate.getDate()).padStart(2, '0')
  const hours = String(fixedDate.getHours()).padStart(2, '0')
  const minutes = String(fixedDate.getMinutes()).padStart(2, '0')
  const seconds = String(fixedDate.getSeconds()).padStart(2, '0')

  it('デフォルトパターン YYYY-MM-DD HH:mm:ss で正しくフォーマットする', () => {
    const result = getCustomCurrentTime(fixedDate)
    expect(result).toBe(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
  })

  it('YYYY のみのパターンで年を返す', () => {
    const result = getCustomCurrentTime(fixedDate, 'YYYY')
    expect(result).toBe(year)
  })

  it('MM/DD パターンで月と日を返す', () => {
    const result = getCustomCurrentTime(fixedDate, 'MM/DD')
    expect(result).toBe(`${month}/${day}`)
  })

  it('HH:mm パターンで時と分を返す', () => {
    const result = getCustomCurrentTime(fixedDate, 'HH:mm')
    expect(result).toBe(`${hours}:${minutes}`)
  })

  it('プレースホルダーを含まないパターンはそのまま返す', () => {
    const result = getCustomCurrentTime(fixedDate, 'hello world')
    expect(result).toBe('hello world')
  })

  it('全プレースホルダーを含むカスタムパターンで正しく置換する', () => {
    const result = getCustomCurrentTime(fixedDate, 'YYYY年MM月DD日 HH時mm分ss秒')
    expect(result).toBe(`${year}年${month}月${day}日 ${hours}時${minutes}分${seconds}秒`)
  })

  it('月・日・時・分・秒が1桁の場合にゼロパディングされる', () => {
    const result = getCustomCurrentTime(fixedDate, 'MM-DD HH:mm:ss')
    expect(result).toBe(`${month}-${day} ${hours}:${minutes}:${seconds}`)
  })
})

// --- プロパティベーステスト ---

/**
 * 有効な Date を生成する arbitrary（1970〜2099年の範囲）
 */
const arbValidDate = fc.date({
  min: new Date('1970-01-01T00:00:00Z'),
  max: new Date('2099-12-31T23:59:59Z'),
})

describe('getFormattedTime - プロパティベーステスト', () => {
  // Feature: unit-test-strategy, Property 5: 時刻フォーマットの正当性
  it('datetime フォーマットは toLocaleString と一致する', () => {
    fc.assert(
      fc.property(arbValidDate, (date) => {
        expect(getFormattedTime(date, 'datetime', 'ja-JP')).toBe(date.toLocaleString('ja-JP'))
      }),
      { numRuns: 100 },
    )
  })

  // Feature: unit-test-strategy, Property 5: 時刻フォーマットの正当性
  it('date フォーマットは toLocaleDateString と一致する', () => {
    fc.assert(
      fc.property(arbValidDate, (date) => {
        expect(getFormattedTime(date, 'date', 'ja-JP')).toBe(date.toLocaleDateString('ja-JP'))
      }),
      { numRuns: 100 },
    )
  })

  // Feature: unit-test-strategy, Property 5: 時刻フォーマットの正当性
  it('time フォーマットは toLocaleTimeString と一致する', () => {
    fc.assert(
      fc.property(arbValidDate, (date) => {
        expect(getFormattedTime(date, 'time', 'ja-JP')).toBe(date.toLocaleTimeString('ja-JP'))
      }),
      { numRuns: 100 },
    )
  })

  // Feature: unit-test-strategy, Property 5: 時刻フォーマットの正当性
  it('timestamp フォーマットは getTime().toString() と一致する', () => {
    fc.assert(
      fc.property(arbValidDate, (date) => {
        expect(getFormattedTime(date, 'timestamp')).toBe(date.getTime().toString())
      }),
      { numRuns: 100 },
    )
  })

  // Feature: unit-test-strategy, Property 5: 時刻フォーマットの正当性
  it('iso フォーマットは toISOString() と一致する', () => {
    fc.assert(
      fc.property(arbValidDate, (date) => {
        expect(getFormattedTime(date, 'iso')).toBe(date.toISOString())
      }),
      { numRuns: 100 },
    )
  })
})

describe('getCustomCurrentTime - プロパティベーステスト', () => {
  // Feature: unit-test-strategy, Property 5: 時刻フォーマットの正当性
  it('YYYY-MM-DD HH:mm:ss パターンの各プレースホルダーが Date の値と一致する', () => {
    fc.assert(
      fc.property(arbValidDate, (date) => {
        const result = getCustomCurrentTime(date, 'YYYY-MM-DD HH:mm:ss')
        const [datePart, timePart] = result.split(' ')
        const [year, month, day] = datePart.split('-')
        const [hours, minutes, seconds] = timePart.split(':')

        expect(year).toBe(String(date.getFullYear()))
        expect(month).toBe(String(date.getMonth() + 1).padStart(2, '0'))
        expect(day).toBe(String(date.getDate()).padStart(2, '0'))
        expect(hours).toBe(String(date.getHours()).padStart(2, '0'))
        expect(minutes).toBe(String(date.getMinutes()).padStart(2, '0'))
        expect(seconds).toBe(String(date.getSeconds()).padStart(2, '0'))
      }),
      { numRuns: 100 },
    )
  })

  // Feature: unit-test-strategy, Property 5: 時刻フォーマットの正当性
  it('プレースホルダーを含まないパターンは入力文字列がそのまま返される', () => {
    fc.assert(
      fc.property(
        arbValidDate,
        fc.stringOf(fc.constantFrom('a', 'b', 'c', '1', '2', '-', '/', ' ')),
        (date, pattern) => {
          expect(getCustomCurrentTime(date, pattern)).toBe(pattern)
        },
      ),
      { numRuns: 100 },
    )
  })
})
