# テスト設計書: @naru/untitled-ui-library

## 1. 概要

本ドキュメントは `@naru/untitled-ui-library` の単体テスト設計方針を定義する。
新規テスト作成時にこのドキュメントを参照することで、一貫したテスト品質と構造を維持する。

### テストフレームワーク構成

| ツール | バージョン | 用途 |
|--------|-----------|------|
| `vitest` | ^3.2.4 | テストランナー・アサーション |
| `@testing-library/react` | ^16.3.2 | コンポーネントレンダリング・クエリ |
| `@testing-library/user-event` | ^14.6.1 | ユーザー操作シミュレーション |
| `@testing-library/jest-dom` | ^6.9.1 | DOM マッチャー拡張（vitest 統合） |
| `@vitest/coverage-v8` | ^3.2.4 | カバレッジ収集 |
| `fast-check` | ^3.23.2 | プロパティベーステスト |

### テスト環境

- テスト環境: `jsdom`
- グローバル API: 有効（`globals: true`）
- セットアップファイル: `test/setupTests.ts`
- パスエイリアス: `@/` → `src/`
- SVG モック: `test/__mocks__/svgMock.tsx`
- CSS Modules: `classNameStrategy: 'non-scoped'`（クラス名がそのまま適用される）

---

## 2. ディレクトリ構造とファイル命名規約

```
test/
├── setupTests.ts                          # テスト環境初期化
├── __mocks__/
│   └── svgMock.tsx                        # SVG インポートモック
├── utils/
│   ├── {utilName}.test.ts                 # ユーティリティ関数テスト
│   └── {utilName}.property.test.ts        # プロパティベーステスト（オプション）
├── hooks/
│   ├── {hookName}.test.ts                 # カスタムフックテスト
│   └── {hookName}.property.test.ts        # プロパティベーステスト（オプション）
└── components/
    └── {componentFolder}/
        ├── {ComponentName}.test.tsx        # コンポーネントテスト
        └── {ComponentName}.property.test.tsx  # プロパティベーステスト（オプション）
```

### 命名ルール

#### テスト種別とファイル拡張子

| 種別 | 拡張子 | 実行コマンド | 用途 |
|------|--------|------------|------|
| ユニットテスト | `*.test.ts` / `*.test.tsx` | `npm run test:unit` | 純粋関数・フック・コンポーネントの単体検証 |
| 結合テスト | `*.spec.ts` / `*.spec.tsx` | （今後追加予定） | 複数モジュールをまたぐ統合的な検証 |

`npm run test:unit` は `.test.ts` を部分文字列フィルターとして使用するため、`*.test.ts` / `*.test.tsx` のみが対象となり、`*.spec.ts` は除外される。

#### 配置パスとファイル名

| 対象 | ファイルパス | 拡張子 |
|------|-------------|--------|
| ユニットテスト（ユーティリティ） | `test/utils/{utilName}.test.ts` | `.test.ts` |
| ユニットテスト（カスタムフック） | `test/hooks/{hookName}.test.ts` | `.test.ts` |
| ユニットテスト（コンポーネント） | `test/components/{folder}/{Name}.test.tsx` | `.test.tsx` |
| プロパティベーステスト | 上記に `.property` を追加 | 同上 |
| 結合テスト | `test/integration/{name}.spec.ts` | `.spec.ts` |

---

## 3. テスト記述規約

### 3.1 言語

- テストケースの説明（`describe`, `it` の文字列）は日本語で記述する
- コード内のコメントは日本語または英語（既存コードに合わせる）

### 3.2 構造テンプレート

```typescript
import { describe, it, expect } from 'vitest'

describe('{テスト対象の関数名/フック名/コンポーネント名}', () => {
  describe('正常系', () => {
    it('期待される動作の説明', () => {
      // Arrange
      // Act
      // Assert
    })
  })

  describe('異常系', () => {
    it('エラー条件の説明', () => {
      expect(() => /* エラーを起こす呼び出し */).toThrow()
    })
  })
})
```

### 3.3 Arrange-Act-Assert パターン

全てのテストケースは AAA パターンに従う：

```typescript
it('有効なHEXカラーをRGBに変換する', () => {
  // Arrange: テストデータの準備
  const hex = '#FF0000'

  // Act: テスト対象の実行
  const result = convertHexToRgb(hex)

  // Assert: 結果の検証
  expect(result).toBe('rgb(255, 0, 0)')
})
```

### 3.4 describe のネスト規約

```
describe('{対象名}')
  ├── describe('正常系') or describe('{サブ機能名}')
  │   ├── it('具体的なケース')
  │   └── it('具体的なケース')
  └── describe('異常系') or describe('エラーハンドリング')
      └── it('エラー条件')
```

---

## 4. テスト対象別パターン

### 4.1 ユーティリティ関数（純粋関数）

純粋関数は入力と出力の検証に集中する。副作用がないため、モックは不要。

```typescript
// test/utils/converter.test.ts
import { describe, it, expect } from 'vitest'
import { convertHexToRgb, convertHexToRgba } from '@/utils/converter'

describe('convertHexToRgb', () => {
  it('有効なHEXカラーをRGBに変換する', () => {
    expect(convertHexToRgb('#FF0000')).toBe('rgb(255, 0, 0)')
    expect(convertHexToRgb('#00FF00')).toBe('rgb(0, 255, 0)')
    expect(convertHexToRgb('#0000FF')).toBe('rgb(0, 0, 255)')
  })

  it('無効なHEXカラーでエラーをスローする', () => {
    expect(() => convertHexToRgb('invalid')).toThrow('Invalid hex color format')
    expect(() => convertHexToRgb('#GGG')).toThrow()
  })
})
```

#### チェックリスト

- [ ] 各関数に対して正常系テストがある
- [ ] 境界値テストがある（0, 最大値, 最小値）
- [ ] 無効入力に対するエラーハンドリングテストがある
- [ ] 戻り値の型・形式が検証されている

### 4.2 カスタムフック

`renderHook` を使用してフックの状態変化を検証する。ブラウザ API のモックが必要な場合は `vi.fn()` を使用。

```typescript
// test/hooks/useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('初期値が正しく設定される', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'))
    expect(result.current.storedValue).toBe('default')
  })

  it('setStoredValue で値が更新される', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'))

    act(() => {
      result.current.setStoredValue('updated')
    })

    expect(result.current.storedValue).toBe('updated')
  })

  it('deleteLocalStorage で初期値にリセットされる', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'))

    act(() => {
      result.current.setStoredValue('updated')
    })
    act(() => {
      result.current.deleteLocalStorage()
    })

    expect(result.current.storedValue).toBe('default')
    expect(localStorage.getItem('key')).toBeNull()
  })
})
```

#### ブラウザ API モックパターン

```typescript
// matchMedia モック（setupTests.ts で設定済み、テスト内で上書き可能）
vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
  matches: query === '(prefers-color-scheme: dark)',
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}))

// resize イベントのシミュレーション
act(() => {
  Object.defineProperty(window, 'innerWidth', { value: 500, writable: true })
  Object.defineProperty(document.documentElement, 'clientWidth', { value: 500, writable: true })
  window.dispatchEvent(new Event('resize'))
})

// storage イベントのシミュレーション（クロスタブ同期）
act(() => {
  window.dispatchEvent(
    new StorageEvent('storage', {
      key: 'testKey',
      newValue: JSON.stringify('newValue'),
    })
  )
})
```

#### チェックリスト

- [ ] 初期状態の検証がある
- [ ] 状態更新後の値が検証されている
- [ ] クリーンアップ（イベントリスナー解除等）が考慮されている
- [ ] `beforeEach` で状態がリセットされている
- [ ] ブラウザ API のモックが適切に設定されている

### 4.3 UI コンポーネント

`render` + `screen` でレンダリングとインタラクションを検証する。

#### 基本テンプレート

```typescript
// test/components/button/BasicButton.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BasicButton } from '@/components/button/BasicButton'

describe('BasicButton', () => {
  it('デフォルトプロパティでレンダリングされる', () => {
    render(<BasicButton>テスト</BasicButton>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('テスト')).toBeInTheDocument()
  })

  it('className プロパティが適用される', () => {
    render(<BasicButton className="custom-class">テスト</BasicButton>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('rest プロパティが転送される', () => {
    render(<BasicButton data-testid="my-button">テスト</BasicButton>)
    expect(screen.getByTestId('my-button')).toBeInTheDocument()
  })

  it('disabled プロパティで無効状態になる', () => {
    render(<BasicButton disabled>テスト</BasicButton>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

#### sekai プロパティのテスト

```typescript
it('sekai プロパティで CSS 変数が設定される', () => {
  render(<BasicButton sekai="Miku">テスト</BasicButton>)
  const button = screen.getByRole('button')
  expect(button.style.getPropertyValue('--sekai-color')).toBeTruthy()
})
```

#### Dialog コンポーネント（Portal + アクセシビリティ）

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dialog } from '@/components/dialog/Dialog'

describe('Dialog', () => {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    title: 'テストダイアログ',
  }

  it('open=true で Portal 経由でレンダリングされる', () => {
    render(<Dialog {...defaultProps}>コンテンツ</Dialog>)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('open=false で DOM に存在しない', () => {
    render(<Dialog {...defaultProps} open={false}>コンテンツ</Dialog>)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('role="dialog" と aria-label が設定される', () => {
    render(<Dialog {...defaultProps}>コンテンツ</Dialog>)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-label', 'テストダイアログ')
  })

  it('Escape キーで onClose が呼び出される', async () => {
    const user = userEvent.setup()
    render(<Dialog {...defaultProps}>コンテンツ</Dialog>)
    await user.keyboard('{Escape}')
    expect(defaultProps.onClose).toHaveBeenCalled()
  })
})
```

#### コンポーネント共通チェックリスト

- [ ] デフォルトプロパティでのレンダリング検証
- [ ] `className` の適用検証
- [ ] `...rest` プロパティの転送検証（`data-testid` 等）
- [ ] `children` の表示検証
- [ ] `sekai` プロパティによる CSS 変数設定の検証
- [ ] `disabled` 状態の検証（該当する場合）
- [ ] アクセシビリティ属性の検証（`role`, `aria-*`）
- [ ] キーボードインタラクションの検証（該当する場合）

#### 内部依存のモック

コンポーネントが `useOptionalSekai` に依存する場合、以下のいずれかで対応：

```typescript
// 方法1: 内部モジュールをモック
vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

// 方法2: YourSekaiProvider でラップ（統合テスト寄り）
import { YourSekaiProvider } from '@/components/provider/YourSekaiProvider'
render(
  <YourSekaiProvider sekai="Miku">
    <BasicButton>テスト</BasicButton>
  </YourSekaiProvider>
)
```

---

## 5. プロパティベーステスト（PBT）

### 5.1 概要

プロパティベーステストは `fast-check` を使用し、ランダム生成された多数の入力に対して普遍的なプロパティ（不変量）を検証する。
ユニットテストが「具体的な例」を検証するのに対し、PBT は「全ての有効な入力に対して成り立つ性質」を検証する。

### 5.2 基本テンプレート

```typescript
import { describe, it, expect } from 'vitest'
import fc from 'fast-check'

describe('{テスト対象}', () => {
  // Feature: unit-test-strategy, Property {N}: {プロパティ名}
  it('{プロパティの説明}', () => {
    fc.assert(
      fc.property(
        // Arbitrary（入力生成器）
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        // プロパティ（検証ロジック）
        (hexStr) => {
          const hex = `#${hexStr}`
          const result = convertHexToRgb(hex)
          // 結果が rgb(...) 形式であること
          expect(result).toMatch(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/)
        }
      ),
      { numRuns: 100 }  // 最低100回実行
    )
  })
})
```

### 5.3 タグ形式

PBT のテストケースには以下のコメントを付与する：

```typescript
// Feature: unit-test-strategy, Property {N}: {プロパティテキスト}
```

### 5.4 よく使う Arbitrary（入力生成器）

| 用途 | Arbitrary | 例 |
|------|-----------|-----|
| HEX カラー文字列 | `fc.hexaString({ minLength: 6, maxLength: 6 }).map(s => '#' + s)` | `#a3f2b1` |
| アルファ値 [0,1] | `fc.double({ min: 0, max: 1, noNaN: true })` | `0.75` |
| 任意の配列 | `fc.array(fc.integer())` | `[3, -1, 42]` |
| キー名文字列 | `fc.string({ minLength: 1 })` | `"abc"` |
| 正の整数（ウィンドウ幅） | `fc.integer({ min: 1, max: 4096 })` | `768` |
| Date オブジェクト | `fc.date()` | `new Date(...)` |
| プリミティブ値 | `fc.oneof(fc.string(), fc.integer(), fc.boolean(), fc.constant(null))` | 混合 |
| ネストオブジェクト | `fc.dictionary(fc.string(), fc.jsonValue())` | `{ a: 1, b: "x" }` |

### 5.5 プロパティ設計ガイドライン

| プロパティ種別 | 説明 | 例 |
|---------------|------|-----|
| ラウンドトリップ | `decode(encode(x)) === x` | serialize → deserialize |
| 不変量 | 操作後も保存される性質 | shuffle 後の要素保存 |
| 冪等性 | `f(f(x)) === f(x)` | フォーマット関数 |
| 選択性 | 特定条件でのみ発火 | Enter キーのみハンドラー呼び出し |
| 形式検証 | 出力が特定の形式に従う | `rgb(R, G, B)` 形式 |
| 範囲検証 | 出力値が有効範囲内 | RGB 各成分が 0-255 |

---

## 6. 正当性プロパティ一覧

以下は本プロジェクトで定義された正当性プロパティの一覧。新規テスト追加時は、対象機能に対応するプロパティを参照する。

| # | プロパティ名 | 対象 | 検証内容 |
|---|-------------|------|---------|
| 1 | HEX→RGB 変換の正当性 | `convertHexToRgb` | 出力が `rgb(R,G,B)` 形式で値が正しい |
| 2 | HEX→RGBA 変換と混合色計算の正当性 | `convertHexToRgba`, `convertHexToRgbaMixWithBlackOrWhite` | 出力が `rgba(R,G,B,A)` 形式で数学的に正しい |
| 3 | 無効入力に対するエラー発生 | converter 全般 | 不正入力でエラーがスローされる |
| 4 | シリアライゼーション ラウンドトリップ | `serializeData`, `deserializeData` | `deserialize(parse(stringify(serialize(x)))) ≡ x` |
| 5 | 時刻フォーマットの正当性 | `getFormattedTime`, `getCustomCurrentTime` | フォーマット結果が正しい形式 |
| 6 | キーボードイベントハンドラーの選択性 | `fireOnEnterKey`, `fireOnEscapeKey` | 指定キーのみコールバック発火 |
| 7 | shuffleArray の不変量 | `shuffleArray` | 要素と長さが保存される |
| 8 | useLocalStorage の値保存ラウンドトリップ | `useLocalStorage` | set → get で値が一致 |
| 9 | useLocalStorage の削除によるリセット | `useLocalStorage` | delete 後に初期値に戻る |
| 10 | useLocalStorage のクロスタブ同期 | `useLocalStorage` | storage イベントで値が更新される |
| 11 | useInnerSize のウィンドウ幅追従 | `useInnerSize` | resize 後に正しい値を返す |
| 12 | useOrientation のブレークポイント判定 | `useOrientation` | 768px 以下で PORTRAIT |
| 13 | createSekai のデフォルト値フォールバック | `createSekai` | 省略フィールドにデフォルト値適用 |
| 14 | コンポーネントのプロパティ転送 | 全コンポーネント | className, data-*, children が転送される |
| 15 | sekai プロパティによる CSS 変数設定 | 全コンポーネント | `--sekai-color` が設定される |

---

## 7. モック戦略

### 7.1 グローバルモック（setupTests.ts で設定済み）

以下のモックは全テストで自動的に利用可能：

| モック対象 | 設定場所 | 備考 |
|-----------|---------|------|
| `@testing-library/jest-dom/vitest` | setupTests.ts | `toBeInTheDocument()` 等のマッチャー |
| `requestAnimationFrame` / `cancelAnimationFrame` | setupTests.ts | `setTimeout` ベースのモック |
| `window.matchMedia` | setupTests.ts | `matches: false` がデフォルト |
| `window.scrollTo` | setupTests.ts | `vi.fn()` |

### 7.2 SVG モック

SVG ファイルのインポートは `vitest.config.ts` の `alias` 設定で `test/__mocks__/svgMock.tsx` に解決される。

```typescript
// test/__mocks__/svgMock.tsx
const SvgMock = (props: Record<string, unknown>) => <svg {...props} />
export default SvgMock
export { SvgMock }
```

### 7.3 テスト固有のモック

テスト内で特定のモジュールをモックする場合：

```typescript
// モジュール全体をモック
vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

// Portal コンテナのモック
vi.mock('@/internal/usePortalContainer', () => ({
  usePortalContainer: () => document.body,
}))
```

---

## 8. カバレッジ基準

| 対象ディレクトリ | ステートメント | ブランチ |
|-----------------|--------------|---------|
| `src/utils/` | 80% 以上 | - |
| `src/hooks/` | - | 70% 以上 |
| `src/components/` | 60% 以上 | - |

### 除外対象

- `src/**/*.d.ts` — 型定義ファイル
- `src/**/index.ts` — 自動生成バレルファイル

### カバレッジ実行

```bash
# カバレッジ付きテスト実行
npx vitest --run --coverage

# レポート出力先: coverage/
# 形式: HTML, LCOV, テキスト
```

---

## 9. テスト実行コマンド

```bash
# ユニットテストのみ実行（*.test.ts / *.test.tsx）
npm run test:unit

# ユニットテストを一括実行（*.test.ts / *.test.tsx、CI 等で使用）
npm test

# 特定ファイルのみ実行
npx vitest --run test/utils/converter.test.ts

# パターンマッチで実行
npx vitest --run -t "convertHexToRgb"

# カバレッジ付き
npx vitest --run --coverage
```

### CI との対応

| ワークフロー | スクリプト | 対象 |
|------------|-----------|------|
| `.github/workflows/ci-unit-test.yml` | `npm run test:unit` | `*.test.ts` / `*.test.tsx` のみ |

---

## 10. 新規テスト追加手順

### ユーティリティ関数の場合

1. `test/utils/{utilName}.test.ts` を作成
2. テスト対象の関数を `@/utils/{utilName}` からインポート
3. `describe` ブロックで関数名ごとにグループ化
4. 正常系 → 境界値 → 異常系の順でテストケースを記述
5. （オプション）`test/utils/{utilName}.property.test.ts` で PBT を追加

### カスタムフックの場合

1. `test/hooks/{hookName}.test.ts` を作成
2. `renderHook` を `@testing-library/react` からインポート
3. `beforeEach` で状態リセット（localStorage.clear() 等）
4. 初期状態 → 状態更新 → クリーンアップの順で検証
5. ブラウザ API モックが必要な場合は `vi.fn()` で設定

### コンポーネントの場合

1. `test/components/{folder}/{Name}.test.tsx` を作成
2. `render`, `screen` を `@testing-library/react` からインポート
3. `useOptionalSekai` のモックを設定（必要に応じて）
4. 共通チェックリスト（セクション 4.3）に従ってテストケースを記述
5. Portal を使うコンポーネントは `usePortalContainer` もモック

---

## 11. エラーハンドリングテストパターン

### 関数のエラースロー検証

```typescript
it('無効な入力でエラーをスローする', () => {
  expect(() => convertHexToRgb('invalid')).toThrow('Invalid hex color format. Use #RRGGBB')
})

it('範囲外のアルファ値でエラーをスローする', () => {
  expect(() => convertHexToRgba('#FF0000', 1.5)).toThrow('Alpha must be between 0 and 1')
})

it('循環参照でエラーをスローする', () => {
  const obj: Record<string, unknown> = { a: 1 }
  obj.self = obj
  expect(() => serializeData(obj)).toThrow('Circular reference detected')
})
```

### コンソールエラーの検証

```typescript
it('localStorage アクセス失敗時にエラーログを出力する', () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  // localStorage を壊す
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('Access denied')
  })

  renderHook(() => useLocalStorage('key', 'default'))

  expect(consoleSpy).toHaveBeenCalled()
  consoleSpy.mockRestore()
})
```
