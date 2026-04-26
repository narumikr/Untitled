# プロジェクトガイドライン

このプロジェクトはプロジェクトセカイをイメージしたReactのUIコンポーネント開発です

## 基本ルール

### 使用言語

- ユーザーとのやり取りは**日本語**を使用すること。
- 技術用語は不用意に日本語にせず原則として英語のまま記述すること
- 日本語の文末には必ず`。`を使用すること
- コード中のコメントに`。`や`.`は不要
- 英語の文章では`.`を使用すること

## ディレクトリ構成

```text
untitled/                         プロジェクトルート
├── src/                          ライブラリ本体のソースコード
│   ├── components/               公開UIコンポーネント群（※各コンポーネントは省略）
│   ├── hooks/                    カスタムフック群
│   ├── utils/                    汎用ユーティリティ関数群
│   ├── internal/                 外部公開しない内部実装
│   ├── styles/                   グローバルスタイル・テーマカラー定義
│   ├── img/                      アイコン/画像コンポーネント
│   ├── types/                    型定義の集約
│   └── index.ts                  公開APIのエントリポイント
├── stories/                      Storybook用のドキュメント・デモ
│   ├── assets/                   Storybook表示用アセット
│   └── （各カテゴリ）/             コンポーネント別ストーリー
├── test/                         テストコードとテスト設定
│   ├── __mocks__/                モック実装
│   ├── components/               コンポーネントテスト
│   ├── hooks/                    フックテスト
│   ├── utils/                    ユーティリティテスト
│   ├── setupTests.ts             テスト共通セットアップ
│   └── test-design.md            テスト方針メモ
├── scripts/                      ビルド補助・生成スクリプト
├── plop-templates/               コンポーネント自動生成テンプレート
├── local_publish/                ローカル配布物（tgz等）の出力先
├── .github/                      CI/CDやCopilot向け設定
├── package.json                  npmスクリプト/依存関係/配布設定
├── tsconfig.json                 TypeScript開発用設定
├── tsconfig.build.json           TypeScriptビルド用設定
├── rollup.config.js              ライブラリバンドル設定
├── eslint.config.mjs             ESLint設定
├── vitest.config.ts              テストランナー設定
├── babel.config.json             Babel変換設定
├── plopfile.js                   コード生成ルール定義
├── README.md                     利用方法ドキュメント
├── CLAUDE.md                     プロジェクトガイドライン
└── LICENSE                       ライセンス情報
```

## レビューガイドライン

以下の観点を意識してコードレビューを行うこと。

- ライブラリとして提供している`/components`と`/hooks`,`/utils`,`/types`フォルダにあるものと`styles/sekai-colors.ts`に差分がある際にビルドを実行しているか(ビルドしている場合はdistが更新されます)
- コードスタイルがプロジェクトのルールに従っているか
- コードないで扱っている変数名やコメントに誤字脱字、スペルミスがないか