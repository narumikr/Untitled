# 要件定義書: コンポーネントユニットテスト

## はじめに

`@naru/untitled-ui-library` の全UIコンポーネント（23フォルダ、40+コンポーネント）に対するユニットテストを作成する。既存のテスト設計書（`test/test-design.md`）に定義されたテスト方針・規約・パターンに準拠し、vitest + @testing-library/react + @testing-library/user-event + fast-check を使用する。utils関数とhookのテストは実装完了済みであり、本要件はコンポーネントテストのみを対象とする。

## 用語集

- **Component_Test**: `test/components/` 配下に配置されるコンポーネント単体テストファイル（`*.test.tsx`）
- **Test_Design**: `test/test-design.md` に定義されたテスト設計書。テスト方針・規約・パターンを規定する
- **AAA_Pattern**: Arrange-Act-Assert パターン。テストケースの構造化手法
- **sekai_Property**: コンポーネントに渡すテーマカラーキー。CSS変数 `--sekai-color` の設定に使用される
- **useOptionalSekai_Mock**: `@/internal/useOptionalSekai` のモック。コンポーネントテストでテーマ依存を分離するために使用
- **usePortalContainer_Mock**: `@/internal/usePortalContainer` のモック。Portal系コンポーネントのテストで `document.body` を返すために使用
- **Portal_Component**: `createPortal` を使用してDOMツリー外にレンダリングするコンポーネント（Backdrop, Dialog, Drawer, Toast, SideMenu, ScrollTopButton, WindowDialog, XoMikuDialog, XxMikuDialog, IntoTheSekai, SekaiBackground, PictureViewer）
- **PBT**: プロパティベーステスト。fast-check を使用してランダム入力に対する不変量を検証する
- **Common_Checklist**: テスト設計書セクション4.3に定義されたコンポーネント共通チェックリスト
- **Rest_Props**: `...rest` スプレッド構文で転送されるプロパティ（`data-testid`, `className`, `style` 等）

## 要件

### 要件 1: テストファイル構造とディレクトリ配置

**ユーザーストーリー:** 開発者として、テストファイルが一貫した構造で配置されていることで、テストの発見と保守が容易になる。

#### 受け入れ基準

1. THE Component_Test SHALL テスト設計書のディレクトリ構造規約に従い `test/components/{componentFolder}/{ComponentName}.test.tsx` のパスに配置される
2. THE Component_Test SHALL テスト設計書のファイル命名規約に従い `.test.tsx` 拡張子を使用する
3. THE Component_Test SHALL `describe` ブロックでコンポーネント名をグループ化し、日本語でテストケースの説明を記述する
4. THE Component_Test SHALL AAA_Pattern（Arrange-Act-Assert）に従ってテストケースを構造化する
5. THE Component_Test SHALL テスト設計書セクション3.4のネスト規約に従い `describe('正常系')` と `describe('異常系')` でグループ化する

### 要件 2: 共通チェックリストの網羅

**ユーザーストーリー:** 開発者として、全コンポーネントに対して共通の品質基準が検証されていることで、ライブラリ全体の一貫性が保証される。

#### 受け入れ基準

1. THE Component_Test SHALL 各コンポーネントがデフォルトプロパティでエラーなくレンダリングされることを検証する
2. WHEN `className` プロパティが渡された場合、THE Component_Test SHALL 該当コンポーネントのルート要素にそのクラス名が適用されることを検証する
3. WHEN `data-testid` 等の Rest_Props が渡された場合、THE Component_Test SHALL 該当プロパティがDOM要素に転送されることを検証する
4. WHEN コンポーネントが `children` プロパティを受け取る場合、THE Component_Test SHALL children の内容がDOMに表示されることを検証する
5. WHEN `sekai` プロパティが渡された場合、THE Component_Test SHALL CSS変数 `--sekai-color` が設定されることを検証する
6. WHEN コンポーネントが `disabled` プロパティを受け取る場合、THE Component_Test SHALL disabled 状態で操作が無効化されることを検証する

### 要件 3: ボタンコンポーネントのテスト（button/）

**ユーザーストーリー:** 開発者として、全ボタンバリアント（BasicButton, HamburgerButton, ScrollTopButton, StrongButton, StylishButton）が正しく動作することを検証したい。

#### 受け入れ基準

1. THE Component_Test SHALL BasicButton が `type="button"` でレンダリングされ、クリックイベントが発火することを検証する
2. WHEN `withTextSekaiColor` が true の場合、THE Component_Test SHALL BasicButton のテキストカラーに sekai カラーが適用されることを検証する
3. THE Component_Test SHALL HamburgerButton が `aria-expanded` 属性を `open` プロパティに応じて設定することを検証する
4. THE Component_Test SHALL HamburgerButton が `aria-label` を open 状態に応じて "Close menu" または "Open menu" に設定することを検証する
5. THE Component_Test SHALL StrongButton が disabled 状態でクリックイベントを発火しないことを検証する
6. THE Component_Test SHALL StylishButton が `arrowIcon` プロパティに応じて矢印アイコンの表示・非表示を切り替えることを検証する
7. WHEN スクロール位置が300pxを超えた場合、THE Component_Test SHALL ScrollTopButton が表示されることを検証する
8. WHEN ScrollTopButton がクリックされた場合、THE Component_Test SHALL `window.scrollTo` が呼び出されることを検証する

### 要件 4: ダイアログコンポーネントのテスト（dialog/）

**ユーザーストーリー:** 開発者として、全ダイアログバリアント（Dialog, WindowDialog, XoMikuDialog, XxMikuDialog）のオープン・クローズ動作とアクセシビリティが正しいことを検証したい。

#### 受け入れ基準

1. WHEN `open` が true の場合、THE Component_Test SHALL Dialog が `role="dialog"` でPortal経由でレンダリングされることを検証する
2. WHEN `open` が false の場合、THE Component_Test SHALL Dialog がDOMに存在しないことを検証する
3. WHEN Escape キーが押された場合、THE Component_Test SHALL Dialog の `onClose` コールバックが呼び出されることを検証する
4. THE Component_Test SHALL Dialog が `aria-label` 属性を `title` プロパティの値で設定することを検証する
5. WHEN `showCloseIcon` が true の場合、THE Component_Test SHALL Dialog に閉じるボタンが表示されることを検証する
6. WHEN `buttons` プロパティが渡された場合、THE Component_Test SHALL Dialog にボタンが最大2つまで表示されることを検証する
7. WHEN `open` が true の場合、THE Component_Test SHALL WindowDialog が `role="dialog"` でPortal経由でレンダリングされることを検証する
8. WHEN Escape キーが押された場合、THE Component_Test SHALL XoMikuDialog の `onClose` コールバックが呼び出されることを検証する
9. WHEN Escape キーが押された場合、THE Component_Test SHALL XxMikuDialog の `onClose` コールバックが呼び出されることを検証する

### 要件 5: テキスト入力コンポーネントのテスト（textfield/）

**ユーザーストーリー:** 開発者として、TextField と TextArea の入力・クリア・エラー表示が正しく動作することを検証したい。

#### 受け入れ基準

1. WHEN ユーザーがテキストを入力した場合、THE Component_Test SHALL TextField の `onChangeInput` コールバックが入力値で呼び出されることを検証する
2. WHEN クリアボタンがクリックされた場合、THE Component_Test SHALL TextField の入力値が空になり `onChangeInput` が空文字列で呼び出されることを検証する
3. WHEN `showClearButton` が false の場合、THE Component_Test SHALL TextField にクリアボタンが表示されないことを検証する
4. WHEN `isError` が true の場合、THE Component_Test SHALL TextField にエラーメッセージが表示されることを検証する
5. WHEN ユーザーがテキストを入力した場合、THE Component_Test SHALL TextArea の `onChange` コールバックが入力値で呼び出されることを検証する
6. WHEN `maxLength` が設定された場合、THE Component_Test SHALL TextArea に文字数カウンターが表示されることを検証する
7. WHEN `disabled` が true の場合、THE Component_Test SHALL TextArea が入力不可状態であることを検証する

### 要件 6: カードコンポーネントのテスト（card/）

**ユーザーストーリー:** 開発者として、Card, MusicBannerCard, PrskLinkCard の表示とインタラクションが正しいことを検証したい。

#### 受け入れ基準

1. THE Component_Test SHALL Card が children を含めてレンダリングされることを検証する
2. THE Component_Test SHALL CardContent が children を含めてレンダリングされることを検証する
3. THE Component_Test SHALL CardTitle が `title` プロパティのテキストを表示することを検証する
4. WHEN `underline` が false の場合、THE Component_Test SHALL CardTitle にアンダーラインクラスが適用されないことを検証する
5. WHEN MusicBannerCard がフォーカスされた場合、THE Component_Test SHALL 選択状態のスタイルが適用されることを検証する
6. THE Component_Test SHALL PrskLinkCard が title と subText を表示することを検証する

### 要件 7: リストコンポーネントのテスト（list/）

**ユーザーストーリー:** 開発者として、List, ListItemButton, ListItemText, StickyNote のレンダリングとインタラクションが正しいことを検証したい。

#### 受け入れ基準

1. THE Component_Test SHALL List がデフォルトで `ul` 要素としてレンダリングされることを検証する
2. WHEN `as` プロパティが `ol` の場合、THE Component_Test SHALL List が `ol` 要素としてレンダリングされることを検証する
3. WHEN `noBullet` が false の場合、THE Component_Test SHALL List にリストスタイルが適用されることを検証する
4. THE Component_Test SHALL ListItemButton が List 内でクリックイベントを発火することを検証する
5. WHEN `disabled` が true の場合、THE Component_Test SHALL ListItemButton が無効状態であることを検証する
6. THE Component_Test SHALL ListItemText が children を表示することを検証する
7. WHEN `icon` プロパティが文字列の場合、THE Component_Test SHALL ListItemText に img 要素が表示されることを検証する
8. THE Component_Test SHALL StickyNote が List 内でレンダリングされることを検証する

### 要件 8: テキスト表示コンポーネントのテスト（text/）

**ユーザーストーリー:** 開発者として、MarqueeText, NamePlate, OutlineText, TypewriterText, UtilText の表示が正しいことを検証したい。

#### 受け入れ基準

1. THE Component_Test SHALL BodyText が children を `p` 要素で表示することを検証する
2. THE Component_Test SHALL SekaiBodyText が sekai カラーをテキストカラーとして適用することを検証する
3. THE Component_Test SHALL DetailText が children を `p` 要素で表示することを検証する
4. THE Component_Test SHALL AnnotationText が children を表示することを検証する
5. THE Component_Test SHALL OutlineText が `text` プロパティの値を表示し、`data-text` 属性と `aria-label` 属性を設定することを検証する
6. THE Component_Test SHALL NamePlate が `colorLength` に基づいてテキストを色付き部分と通常部分に分割して表示することを検証する
7. THE Component_Test SHALL TypewriterText がタイマーに基づいてテキストを1文字ずつ表示することを検証する
8. THE Component_Test SHALL MarqueeText が children を表示することを検証する

### 要件 9: オーバーレイ系コンポーネントのテスト（backdrop/, drawer/, toast/）

**ユーザーストーリー:** 開発者として、Backdrop, Drawer, Toast のオープン・クローズ動作がPortal経由で正しく動作することを検証したい。

#### 受け入れ基準

1. WHEN `open` が true の場合、THE Component_Test SHALL Backdrop がPortal経由でレンダリングされることを検証する
2. WHEN `open` が false の場合、THE Component_Test SHALL Backdrop が非表示クラスを持つことを検証する
3. WHEN `open` が true の場合、THE Component_Test SHALL Drawer がPortal経由でレンダリングされ children を表示することを検証する
4. WHEN Drawer のオーバーレイがクリックされた場合、THE Component_Test SHALL `onClose` コールバックが呼び出されることを検証する
5. WHEN `pos` プロパティが指定された場合、THE Component_Test SHALL Drawer が対応する位置クラスを持つことを検証する
6. WHEN `open` が true の場合、THE Component_Test SHALL Toast がPortal経由でメッセージを表示することを検証する
7. WHEN `duration` ミリ秒が経過した場合、THE Component_Test SHALL Toast の `onClose` コールバックが呼び出されることを検証する
8. WHEN Toast の閉じるボタンがクリックされた場合、THE Component_Test SHALL `onClose` コールバックが呼び出されることを検証する
9. WHEN `message` が配列の場合、THE Component_Test SHALL Toast が全メッセージを表示することを検証する

### 要件 10: フォーム選択コンポーネントのテスト（select/）

**ユーザーストーリー:** 開発者として、Checkbox と Chip の選択・操作が正しく動作することを検証したい。

#### 受け入れ基準

1. WHEN Checkbox がクリックされた場合、THE Component_Test SHALL `onChange` コールバックがチェック状態で呼び出されることを検証する
2. WHEN `disabled` が true の場合、THE Component_Test SHALL Checkbox が `tabIndex=-1` で操作不可であることを検証する
3. THE Component_Test SHALL Checkbox が `aria-checked` 属性を `checked` プロパティに応じて設定することを検証する
4. THE Component_Test SHALL Chip が `label` プロパティのテキストを表示することを検証する
5. WHEN `onDelete` が渡された場合、THE Component_Test SHALL Chip に削除ボタンが表示されることを検証する
6. WHEN `onDelete` が渡されていない場合、THE Component_Test SHALL Chip に削除ボタンが表示されないことを検証する
7. THE Component_Test SHALL Chip が `role="button"` を持つことを検証する

### 要件 11: ナビゲーションコンポーネントのテスト（breadcrumb/, pagination/, dropdown/, sidemenu/）

**ユーザーストーリー:** 開発者として、Breadcrumb, Pagination, Dropdown, SideMenu のナビゲーション動作が正しいことを検証したい。

#### 受け入れ基準

1. THE Component_Test SHALL Breadcrumb が `nav` 要素で `aria-label` 属性を設定してレンダリングされることを検証する
2. WHEN `separator` プロパティが指定された場合、THE Component_Test SHALL Breadcrumb が対応するセパレーター文字を表示することを検証する
3. THE Component_Test SHALL Pagination がページ番号ボタンを表示することを検証する
4. WHEN ページ番号ボタンがクリックされた場合、THE Component_Test SHALL Pagination の `onChangePage` コールバックが呼び出されることを検証する
5. WHEN Dropdown のトリガーボタンがクリックされた場合、THE Component_Test SHALL オプションリストが表示されることを検証する
6. WHEN Dropdown のオプションが選択された場合、THE Component_Test SHALL `onSelect` コールバックが選択値で呼び出されることを検証する
7. WHEN `open` が true の場合、THE Component_Test SHALL SideMenu がPortal経由でレンダリングされることを検証する
8. WHEN SideMenu のハンバーガーボタンがクリックされた場合、THE Component_Test SHALL メニューの開閉状態が切り替わることを検証する

### 要件 12: アコーディオン・ツールチップ・ディバイダーのテスト

**ユーザーストーリー:** 開発者として、Accordion, Tooltip, Divider の表示とインタラクションが正しいことを検証したい。

#### 受け入れ基準

1. THE Component_Test SHALL Accordion が `summary` テキストを表示することを検証する
2. WHEN Accordion のサマリーがクリックされた場合、THE Component_Test SHALL `aria-expanded` 属性が切り替わることを検証する
3. WHEN `defaultOpen` が true の場合、THE Component_Test SHALL Accordion の詳細コンテンツが初期表示されることを検証する
4. THE Component_Test SHALL Accordion の詳細領域が `role="region"` と `aria-labelledby` を持つことを検証する
5. WHEN マウスがホバーした場合、THE Component_Test SHALL Tooltip がツールチップテキストを表示することを検証する
6. WHEN マウスが離れた場合、THE Component_Test SHALL Tooltip がツールチップテキストを非表示にすることを検証する
7. THE Component_Test SHALL Divider が `role="separator"` と `aria-orientation="horizontal"` を持つことを検証する
8. WHEN `children` が渡された場合、THE Component_Test SHALL Divider がテキスト付きディバイダーとしてレンダリングされることを検証する

### 要件 13: リンク・ローディング・カルーセル・ビューアーのテスト

**ユーザーストーリー:** 開発者として、TextLink, Loading, Carousel, PictureViewer の表示が正しいことを検証したい。

#### 受け入れ基準

1. THE Component_Test SHALL TextLink が `a` 要素で `href` 属性を設定してレンダリングされることを検証する
2. WHEN `isExternal` が true の場合、THE Component_Test SHALL TextLink が `target="_blank"` と `rel="noopener noreferrer"` を設定することを検証する
3. WHEN `disabled` が true の場合、THE Component_Test SHALL TextLink が `aria-disabled="true"` を設定することを検証する
4. THE Component_Test SHALL Loading が `role="status"` と `aria-live="polite"` を持つことを検証する
5. THE Component_Test SHALL Carousel が children を SwiperSlide でラップしてレンダリングされることを検証する
6. THE Component_Test SHALL PictureViewer がサムネイル画像を表示することを検証する

### 要件 14: プロバイダーコンポーネントのテスト（provider/）

**ユーザーストーリー:** 開発者として、YourSekaiProvider と SharedValueProvider がコンテキスト値を正しく提供することを検証したい。

#### 受け入れ基準

1. THE Component_Test SHALL YourSekaiProvider が children をレンダリングすることを検証する
2. THE Component_Test SHALL YourSekaiProvider が sekaiTheme のコンテキスト値を子コンポーネントに提供することを検証する
3. THE Component_Test SHALL createSharedValueProvider が SharedValueProvider と useSharedValueContext を返すことを検証する
4. THE Component_Test SHALL SharedValueProvider が defaultValue をコンテキスト経由で提供することを検証する
5. IF useSharedValueContext が SharedValueProvider の外で使用された場合、THEN THE Component_Test SHALL エラーがスローされることを検証する

### 要件 15: エフェクトコンポーネントのテスト（effect/）

**ユーザーストーリー:** 開発者として、DoReMeetEffect, IntoTheSekai, SekaiBackground のレンダリングが正しいことを検証したい。

#### 受け入れ基準

1. THE Component_Test SHALL DoReMeetEffect が `text` プロパティのテキストを表示することを検証する
2. THE Component_Test SHALL DoReMeetEffect が `role="button"` を持つことを検証する
3. WHEN DoReMeetEffect がクリックされた場合、THE Component_Test SHALL sekai カラーのアニメーションが開始されることを検証する
4. THE Component_Test SHALL IntoTheSekai が Portal 経由で canvas 要素をレンダリングすることを検証する
5. THE Component_Test SHALL SekaiBackground が Portal 経由で canvas 要素をレンダリングすることを検証する

### 要件 16: モック戦略の適用

**ユーザーストーリー:** 開発者として、テストが外部依存から分離されていることで、テストの安定性と実行速度が保証される。

#### 受け入れ基準

1. WHEN コンポーネントが `useOptionalSekai` に依存する場合、THE Component_Test SHALL `@/internal/useOptionalSekai` をモックして `sekaiColor`, `modeTheme`, `isLight` を返すよう設定する
2. WHEN コンポーネントが `usePortalContainer` に依存する場合、THE Component_Test SHALL `@/internal/usePortalContainer` をモックして `document.body` を返すよう設定する
3. THE Component_Test SHALL SVGインポートに対してテスト設計書で定義された `test/__mocks__/svgMock.tsx` を使用する
4. THE Component_Test SHALL `setupTests.ts` で設定済みのグローバルモック（requestAnimationFrame, matchMedia, scrollTo）を活用する

### 要件 17: プロパティベーステスト（PBT）

**ユーザーストーリー:** 開発者として、ランダム入力に対してコンポーネントの不変量が保証されていることで、エッジケースの検出が強化される。

#### 受け入れ基準

1. THE Component_Test SHALL 正当性プロパティ #14（プロパティ転送）に基づき、任意の className 文字列がコンポーネントのルート要素に適用されることを fast-check で検証する
2. THE Component_Test SHALL 正当性プロパティ #15（sekai CSS変数設定）に基づき、任意の sekai キーに対して `--sekai-color` が設定されることを fast-check で検証する
3. THE Component_Test SHALL PBT ファイルを `test/components/{folder}/{ComponentName}.property.test.tsx` に配置する
4. THE Component_Test SHALL PBT テストケースに `// Feature: unit-test-strategy, Property {N}: {プロパティテキスト}` のタグコメントを付与する

### 要件 18: カバレッジ基準の達成

**ユーザーストーリー:** 開発者として、コンポーネントテストが十分なカバレッジを達成していることで、コードの品質が保証される。

#### 受け入れ基準

1. THE Component_Test SHALL `src/components/` ディレクトリに対してステートメントカバレッジ60%以上を達成する
2. THE Component_Test SHALL `npx vitest --run --coverage` で実行してカバレッジレポートを生成できる
3. THE Component_Test SHALL `npm run test:unit` で全テストがパスする
