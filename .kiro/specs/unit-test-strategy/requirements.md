# 要件ドキュメント: UIライブラリ単体テスト戦略

## はじめに

本ドキュメントは、`@naru/untitled-ui-library` の単体テスト実装方針を定義する。プロジェクトは Vitest + React Testing Library 環境を使用し、テストファイルが未作成の状態にある。ユーティリティ関数（converter, serialization, timer, operation）、カスタムフック（useLocalStorage, useWindowSize, useThemeMode）、UIコンポーネント（23カテゴリ）を対象に、テスト戦略・カバレッジ基準・テストパターンを体系的に整備する。テストランナーとして Vitest を採用し、Vite ベースの高速なテスト実行環境を構築する。

## 用語集

- **Test_Runner**: Vitest テストランナー（jsdom 環境、`vitest.config.ts` で設定）
- **Testing_Library**: React Testing Library（コンポーネントのレンダリングとインタラクションテスト用）
- **User_Event**: @testing-library/user-event（ユーザー操作のシミュレーション用）
- **Unit_Test**: 単一の関数・フック・コンポーネントを対象とした単体テスト
- **Coverage_Reporter**: Vitest のカバレッジ収集機能（v8 プロバイダーを使用）
- **Utility_Module**: `src/utils/` 配下の純粋関数群（converter, serialization, timer, operation）
- **Hook_Module**: `src/hooks/` 配下のカスタム React フック群
- **Component_Module**: `src/components/` 配下の UI コンポーネント群
- **Setup_File**: `test/setupTests.ts` テスト環境の初期化ファイル（`vitest.config.ts` の `setupFiles` で指定）
- **Mock_Module**: テスト用のモックファイル群（SVG、CSS Modules、Vitest の `vi.mock` を使用）

## 要件

### 要件 1: テスト環境の整備

**ユーザーストーリー:** 開発者として、テスト実行に必要な環境設定が整備されていることで、すぐにテストを書き始められるようにしたい。

#### 受け入れ基準

1. THE Setup_File SHALL `@testing-library/jest-dom/vitest` のカスタムマッチャーをインポートし、全テストファイルで利用可能にする
2. THE Setup_File SHALL `requestAnimationFrame`、`matchMedia`、`scrollTo` のモックを提供する
3. THE Mock_Module SHALL `vitest.config.ts` の `resolve.alias` または `vi.mock` を使用して SVG ファイルのインポートに対して React コンポーネントのモックを返す
4. THE Mock_Module SHALL `vitest.config.ts` の `css.modules` 設定を使用して CSS Modules のクラス名を処理する
5. WHEN `npm test` コマンドが実行された場合、THE Test_Runner SHALL `vitest` を実行し、`test/` ディレクトリ配下の全テストファイルを検出して実行する
6. THE Test_Runner SHALL `vitest.config.ts` にテスト環境（jsdom）、セットアップファイル、パスエイリアス（`@/` → `src/`）、カバレッジ設定を定義する
7. THE Test_Runner SHALL Jest 固有の設定ファイル（`jest.config.js`）および Jest 固有の依存パッケージ（`ts-jest`、`@types/jest`）を不要にする

### 要件 2: ユーティリティ関数のテスト

**ユーザーストーリー:** 開発者として、ユーティリティ関数が正しく動作することを検証するテストがあることで、リファクタリング時の回帰を防止したい。

#### 受け入れ基準

1. THE Unit_Test SHALL `convertHexToRgb` 関数に対して、有効な HEX カラー値を RGB 文字列に正しく変換することを検証する
2. THE Unit_Test SHALL `convertHexToRgba` 関数に対して、有効な HEX カラー値とアルファ値を RGBA 文字列に正しく変換することを検証する
3. THE Unit_Test SHALL `convertHexToRgbaMixWithBlackOrWhite` 関数に対して、白または黒との混合色を正しく計算することを検証する
4. IF 無効な HEX カラー値が `convertHexToRgb` に渡された場合、THEN THE Unit_Test SHALL エラーがスローされることを検証する
5. IF アルファ値が 0 未満または 1 を超える値で `convertHexToRgba` に渡された場合、THEN THE Unit_Test SHALL エラーがスローされることを検証する
6. THE Unit_Test SHALL `serializeData` 関数に対して、Date オブジェクトを ISO 文字列に変換することを検証する
7. THE Unit_Test SHALL `deserializeData` 関数に対して、ISO 文字列を Date オブジェクトに復元することを検証する
8. FOR ALL 有効な入力データに対して、`deserializeData(JSON.parse(JSON.stringify(serializeData(data))))` が元のデータと等価なオブジェクトを生成することを検証する（ラウンドトリッププロパティ）
9. IF 循環参照を含むオブジェクトが `serializeData` に渡された場合、THEN THE Unit_Test SHALL エラーがスローされることを検証する
10. THE Unit_Test SHALL `getFormattedTime` 関数に対して、各フォーマットタイプ（datetime, date, time, timestamp, iso）で正しい文字列を返すことを検証する
11. THE Unit_Test SHALL `getCustomCurrentTime` 関数に対して、カスタムパターンに従ったフォーマット文字列を返すことを検証する
12. THE Unit_Test SHALL `fireOnEnterKey` 関数に対して、Enter キーイベントでのみハンドラーが呼び出されることを検証する
13. THE Unit_Test SHALL `fireOnEscapeKey` 関数に対して、Escape キーイベントでのみハンドラーが呼び出されることを検証する
14. THE Unit_Test SHALL `shuffleArray` 関数に対して、シャッフル後の配列が元の配列と同じ要素を含み、同じ長さであることを検証する（不変量プロパティ）

### 要件 3: カスタムフックのテスト

**ユーザーストーリー:** 開発者として、カスタムフックが期待通りに状態管理やブラウザ API との連携を行うことを検証するテストがあることで、フックの信頼性を確保したい。

#### 受け入れ基準

1. THE Unit_Test SHALL `useLocalStorage` フックに対して、初期値が正しく設定されることを検証する
2. WHEN `setStoredValue` が呼び出された場合、THE Unit_Test SHALL `localStorage` に値が保存されることを検証する
3. WHEN `deleteLocalStorage` が呼び出された場合、THE Unit_Test SHALL `localStorage` から値が削除され、初期値にリセットされることを検証する
4. WHEN `storage` イベントが発火した場合、THE Unit_Test SHALL 他タブからの変更が反映されることを検証する
5. THE Unit_Test SHALL `useThemeMode` フックに対して、`matchMedia` の結果に基づいてライトモードまたはダークモードを返すことを検証する
6. THE Unit_Test SHALL `useInnerSize` フックに対して、ウィンドウサイズの変更に応じて値が更新されることを検証する
7. THE Unit_Test SHALL `useOrientation` フックに対して、768px 以下で PORTRAIT、それ以外で LANDSCAPE を返すことを検証する
8. THE Unit_Test SHALL `createSekai` 関数に対して、デフォルト値のフォールバックが正しく動作することを検証する

### 要件 4: UIコンポーネントのテスト

**ユーザーストーリー:** 開発者として、UIコンポーネントが正しくレンダリングされ、ユーザーインタラクションに適切に応答することを検証するテストがあることで、UIの品質を保証したい。

#### 受け入れ基準

1. THE Unit_Test SHALL 各コンポーネントに対して、デフォルトプロパティでエラーなくレンダリングされることを検証する
2. THE Unit_Test SHALL 各コンポーネントに対して、`className` プロパティが正しく適用されることを検証する
3. THE Unit_Test SHALL 各コンポーネントに対して、`...rest` プロパティが基礎要素に転送されることを検証する
4. WHEN `sekai` プロパティが指定された場合、THE Unit_Test SHALL コンポーネントに対応する CSS 変数（`--sekai-color`）が設定されることを検証する
5. WHEN `disabled` プロパティが `true` に設定された場合、THE Unit_Test SHALL ボタンコンポーネントが無効状態になることを検証する
6. WHEN `open` プロパティが `true` に設定された場合、THE Unit_Test SHALL Dialog コンポーネントが Portal 経由でレンダリングされることを検証する
7. WHEN `open` プロパティが `false` に設定された場合、THE Unit_Test SHALL Dialog コンポーネントが DOM に存在しないことを検証する
8. THE Unit_Test SHALL Dialog コンポーネントに対して、`role="dialog"` と適切な `aria-label` が設定されることを検証する
9. WHEN Escape キーが押された場合、THE Unit_Test SHALL Dialog コンポーネントの `onClose` コールバックが呼び出されることを検証する
10. THE Unit_Test SHALL 各コンポーネントに対して、`children` プロパティの内容が正しくレンダリングされることを検証する

### 要件 5: テストカバレッジ基準

**ユーザーストーリー:** 開発者として、テストカバレッジの基準が明確に定義されていることで、テストの充実度を客観的に評価したい。

#### 受け入れ基準

1. THE Coverage_Reporter SHALL `@vitest/coverage-v8` プロバイダーを使用して `src/utils/` 配下のファイルに対して、ステートメントカバレッジ 80% 以上を達成する
2. THE Coverage_Reporter SHALL `src/hooks/` 配下のファイルに対して、ブランチカバレッジ 70% 以上を達成する
3. THE Coverage_Reporter SHALL `src/components/` 配下のファイルに対して、ステートメントカバレッジ 60% 以上を達成する
4. THE Coverage_Reporter SHALL 自動生成ファイル（`src/**/index.ts`）と型定義ファイル（`src/**/*.d.ts`）をカバレッジ計測から除外する
5. THE Coverage_Reporter SHALL カバレッジレポートを `coverage/` ディレクトリに HTML 形式と LCOV 形式で出力する

### 要件 6: テストファイルの構成規約

**ユーザーストーリー:** 開発者として、テストファイルの配置と命名が統一されていることで、テストの発見と保守が容易になるようにしたい。

#### 受け入れ基準

1. THE Unit_Test SHALL ユーティリティ関数のテストを `test/utils/{utilName}.test.ts` に配置する
2. THE Unit_Test SHALL カスタムフックのテストを `test/hooks/{hookName}.test.ts` に配置する
3. THE Unit_Test SHALL コンポーネントのテストを `test/components/{componentFolder}/{ComponentName}.test.tsx` に配置する
4. THE Unit_Test SHALL 各テストファイルで `describe` ブロックを使用してテスト対象の関数またはコンポーネント名でグループ化する
5. THE Unit_Test SHALL 各テストケースの説明を日本語で記述する
