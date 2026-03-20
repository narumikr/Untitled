# 実装計画: UIライブラリ単体テスト戦略

## 概要

Jest から Vitest への移行を行い、ユーティリティ関数・カスタムフック・UIコンポーネントの単体テストを体系的に実装する。テスト環境の構築から始め、優先度の高いユーティリティ関数、カスタムフック、UIコンポーネントの順にテストを作成する。プロパティベーステスト（fast-check）も各テスト対象に組み込む。

## タスク

- [ ] 1. テスト環境の移行と構築
  - [x] 1.1 依存パッケージの更新
    - `package.json` から `ts-jest`、`@types/jest`、`jest`、`jest-environment-jsdom` を devDependencies から削除
    - `vitest`、`@vitest/coverage-v8`、`fast-check` を devDependencies に追加
    - `package.json` の `scripts.test` を `"vitest --run"` に変更
    - _要件: 1.5, 1.7_

  - [x] 1.2 vitest.config.ts の作成
    - プロジェクトルートに `vitest.config.ts` を作成
    - テスト環境（jsdom）、globals、setupFiles、include/exclude パターンを設定
    - `resolve.alias` で `@/` → `src/` のパスエイリアスを設定
    - `@vitest/coverage-v8` プロバイダーでカバレッジ設定を定義（reporter: html, lcov, text）
    - CSS Modules の `classNameStrategy` を設定
    - _要件: 1.6, 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 1.3 test/setupTests.ts の作成
    - `@testing-library/jest-dom/vitest` のカスタムマッチャーをインポート
    - `requestAnimationFrame`、`cancelAnimationFrame` のモックを設定
    - `matchMedia` のモックを設定
    - `scrollTo` のモックを設定
    - _要件: 1.1, 1.2_

  - [x] 1.4 SVG モックファイルの更新
    - `test/__mocks__/svgMock.tsx` を Vitest 互換に更新（既存の `test/__mocks__/svgMock.js` がある場合は置換）
    - `vitest.config.ts` の `resolve.alias` または `vi.mock` で SVG インポートをモックに解決
    - _要件: 1.3_

  - [x] 1.5 Jest 固有ファイルの削除
    - `jest.config.js` を削除
    - _要件: 1.7_

- [x] 2. チェックポイント - テスト環境の動作確認
  - テスト環境が正しく構築されていることを確認し、`npm test` で空のテストスイートが実行できることを検証する。問題があればユーザーに確認する。

- [ ] 3. ユーティリティ関数のテスト実装
  - [ ] 3.1 converter.test.ts の作成
    - `test/utils/converter.test.ts` を作成
    - `convertHexToRgb`: 有効な HEX → RGB 変換の検証
    - `convertHexToRgba`: 有効な HEX + alpha → RGBA 変換の検証
    - `convertHexToRgbaMixWithBlackOrWhite`: 白/黒混合色の計算検証
    - 無効な HEX 値でのエラースロー検証
    - 範囲外アルファ値でのエラースロー検証
    - `describe` ブロックで関数名ごとにグループ化、テスト説明は日本語
    - _要件: 2.1, 2.2, 2.3, 2.4, 2.5, 6.1, 6.4, 6.5_

  - [ ] 3.2 converter のプロパティベーステスト
    - **Property 1: HEX→RGB 変換の正当性**
    - **Property 2: HEX→RGBA 変換と混合色計算の正当性**
    - **Property 3: 無効入力に対するエラー発生**
    - `fast-check` で有効な HEX 文字列を生成し、変換結果の形式と値を検証
    - 無効な文字列に対するエラースローを検証
    - **検証対象: 要件 2.1, 2.2, 2.3, 2.4, 2.5**

  - [ ] 3.3 serialization.test.ts の作成
    - `test/utils/serialization.test.ts` を作成
    - `serializeData`: Date → ISO 文字列変換の検証
    - `deserializeData`: ISO 文字列 → Date 復元の検証
    - 循環参照オブジェクトでのエラースロー検証
    - `describe` ブロックで関数名ごとにグループ化、テスト説明は日本語
    - _要件: 2.6, 2.7, 2.9, 6.1, 6.4, 6.5_

  - [ ] 3.4 serialization のプロパティベーステスト
    - **Property 4: シリアライゼーション ラウンドトリップ**
    - `fast-check` でプリミティブ値・Date・ネストオブジェクトを生成し、ラウンドトリップの等価性を検証
    - **検証対象: 要件 2.6, 2.7, 2.8**

  - [ ] 3.5 timer.test.ts の作成
    - `test/utils/timer.test.ts` を作成
    - `getFormattedTime`: 各フォーマットタイプ（datetime, date, time, timestamp, iso）の出力検証
    - `getCustomCurrentTime`: カスタムパターンの置換検証
    - `describe` ブロックで関数名ごとにグループ化、テスト説明は日本語
    - _要件: 2.10, 2.11, 6.1, 6.4, 6.5_

  - [ ] 3.6 timer のプロパティベーステスト
    - **Property 5: 時刻フォーマットの正当性**
    - `fast-check` で有効な Date オブジェクトを生成し、フォーマット結果の形式を検証
    - **検証対象: 要件 2.10, 2.11**

  - [ ] 3.7 operation.test.ts の作成
    - `test/utils/operation.test.ts` を作成
    - `fireOnEnterKey`: Enter キーでのみハンドラー呼び出しを検証
    - `fireOnEscapeKey`: Escape キーでのみハンドラー呼び出しを検証
    - `shuffleArray`: シャッフル後の要素保存と長さ一致を検証
    - `describe` ブロックで関数名ごとにグループ化、テスト説明は日本語
    - _要件: 2.12, 2.13, 2.14, 6.1, 6.4, 6.5_

  - [ ] 3.8 operation のプロパティベーステスト
    - **Property 6: キーボードイベントハンドラーの選択性**
    - **Property 7: shuffleArray の不変量**
    - `fast-check` でキー名を生成し、Enter/Escape 以外ではコールバック非呼び出しを検証
    - `fast-check` で配列を生成し、シャッフル後の要素保存を検証
    - **検証対象: 要件 2.12, 2.13, 2.14**

- [ ] 4. チェックポイント - ユーティリティ関数テストの確認
  - 全てのユーティリティ関数テストが通ることを確認する。問題があればユーザーに確認する。

- [ ] 5. カスタムフックのテスト実装
  - [ ] 5.1 useLocalStorage.test.ts の作成
    - `test/hooks/useLocalStorage.test.ts` を作成
    - `renderHook` を使用してフックの状態変化を検証
    - 初期値の設定、`setStoredValue` による保存、`deleteLocalStorage` による削除とリセットを検証
    - `storage` イベントによるクロスタブ同期を検証
    - `describe` ブロックでフック名ごとにグループ化、テスト説明は日本語
    - _要件: 3.1, 3.2, 3.3, 3.4, 6.2, 6.4, 6.5_

  - [ ] 5.2 useLocalStorage のプロパティベーステスト
    - **Property 8: useLocalStorage の値保存ラウンドトリップ**
    - **Property 9: useLocalStorage の削除によるリセット**
    - **Property 10: useLocalStorage のクロスタブ同期**
    - `fast-check` でキーと値を生成し、保存・取得・削除のラウンドトリップを検証
    - **検証対象: 要件 3.1, 3.2, 3.3, 3.4**

  - [ ] 5.3 useThemeMode.test.ts の作成
    - `test/hooks/useThemeMode.test.ts` を作成
    - `matchMedia` のモック結果に基づく light/dark モード判定を検証
    - `describe` ブロックでフック名ごとにグループ化、テスト説明は日本語
    - _要件: 3.5, 6.2, 6.4, 6.5_

  - [ ] 5.4 useWindowSize.test.ts の作成
    - `test/hooks/useWindowSize.test.ts` を作成
    - `useInnerSize`: ウィンドウサイズ変更に応じた値更新を検証
    - `useOrientation`: 768px 以下で PORTRAIT、それ以外で LANDSCAPE を検証
    - `describe` ブロックでフック名ごとにグループ化、テスト説明は日本語
    - _要件: 3.6, 3.7, 6.2, 6.4, 6.5_

  - [ ] 5.5 useWindowSize のプロパティベーステスト
    - **Property 11: useInnerSize のウィンドウ幅追従**
    - **Property 12: useOrientation のブレークポイント判定**
    - `fast-check` で正の整数のウィンドウ幅を生成し、ブレークポイント判定を検証
    - **検証対象: 要件 3.6, 3.7**

  - [ ] 5.6 createSekai.test.ts の作成
    - `test/hooks/createSekai.test.ts` を作成（`src/utils/createSekai.ts` のテスト）
    - デフォルト値のフォールバック動作を検証
    - `describe` ブロックで関数名ごとにグループ化、テスト説明は日本語
    - _要件: 3.8, 6.2, 6.4, 6.5_

  - [ ] 5.7 createSekai のプロパティベーステスト
    - **Property 13: createSekai のデフォルト値フォールバック**
    - `fast-check` で部分的な入力を生成し、省略フィールドへのデフォルト値適用を検証
    - **検証対象: 要件 3.8**

- [ ] 6. チェックポイント - カスタムフックテストの確認
  - 全てのカスタムフックテストが通ることを確認する。問題があればユーザーに確認する。

- [ ] 7. UIコンポーネントのテスト実装
  - [ ] 7.1 BasicButton.test.tsx の作成
    - `test/components/button/BasicButton.test.tsx` を作成
    - デフォルトプロパティでのレンダリング検証
    - `className` プロパティの適用検証
    - `...rest` プロパティの転送検証（`data-testid` 等）
    - `sekai` プロパティによる CSS 変数設定の検証
    - `disabled` プロパティによる無効状態の検証
    - `children` の内容表示検証
    - `describe` ブロックでコンポーネント名ごとにグループ化、テスト説明は日本語
    - _要件: 4.1, 4.2, 4.3, 4.4, 4.5, 4.10, 6.3, 6.4, 6.5_

  - [ ] 7.2 Dialog.test.tsx の作成
    - `test/components/dialog/Dialog.test.tsx` を作成
    - `open=true` で Portal 経由のレンダリング検証
    - `open=false` で DOM 非存在の検証
    - `role="dialog"` と `aria-label` の設定検証
    - Escape キーによる `onClose` コールバック呼び出し検証
    - `children` の内容表示検証
    - `describe` ブロックでコンポーネント名ごとにグループ化、テスト説明は日本語
    - _要件: 4.1, 4.6, 4.7, 4.8, 4.9, 4.10, 6.3, 6.4, 6.5_

  - [ ]* 7.3 コンポーネント共通プロパティのプロパティベーステスト
    - **Property 14: コンポーネントのプロパティ転送**
    - **Property 15: sekai プロパティによる CSS 変数設定**
    - `fast-check` で className 文字列と data-* 属性を生成し、転送を検証
    - 代表コンポーネント（BasicButton）で sekai プロパティの CSS 変数設定を検証
    - **検証対象: 要件 4.2, 4.3, 4.4, 4.10**

- [ ] 8. 最終チェックポイント - 全テスト通過確認
  - 全てのテストが通ることを確認する。問題があればユーザーに確認する。

## 備考

- `*` 付きのタスクはオプションであり、MVP では省略可能
- 各タスクは具体的な要件番号を参照しており、トレーサビリティを確保
- チェックポイントで段階的に動作を検証
- プロパティベーステストは設計ドキュメントの正当性プロパティ（Property 1〜15）に対応
- ユニットテストとプロパティベーステストは補完的に使用
