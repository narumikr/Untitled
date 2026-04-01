# 実装計画: コンポーネントユニットテスト

## 概要

`@naru/untitled-ui-library` の全UIコンポーネント（23フォルダ、約44ファイル）に対するユニットテストを、テスト設計書（`test/test-design.md`）の規約に準拠して実装する。カテゴリA（基本）→ C（インタラクティブ）→ B（Portal）→ D（プロバイダー）→ PBT の優先順位で進める。

## Tasks

- [x] 1. テスト基盤セットアップ
  - `test/components/` ディレクトリを作成する
  - 既存の `test/setupTests.ts` と `test/__mocks__/svgMock.tsx` が正しく動作することを確認する
  - _Requirements: 1.1, 1.2, 16.3, 16.4_

- [ ] 2. button/ フォルダのテスト作成（カテゴリA/B）
  - [x] 2.1 `test/components/button/BasicButton.test.tsx` を作成する
    - デフォルトレンダリング、`type="button"` の検証
    - クリックイベント発火、`className` / `data-testid` 転送
    - `sekai` プロパティによる CSS 変数設定
    - `withTextSekaiColor` による テキストカラー適用
    - `disabled` 状態の検証
    - `useOptionalSekai` をモックする
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 3.1, 3.2_
  - [x] 2.2 `test/components/button/StrongButton.test.tsx` を作成する
    - デフォルトレンダリング、共通チェックリスト
    - `disabled` 状態でクリックイベントが発火しないことの検証
    - _Requirements: 2.1, 2.2, 2.3, 2.6, 3.5_
  - [x] 2.3 `test/components/button/StylishButton.test.tsx` を作成する
    - デフォルトレンダリング、共通チェックリスト
    - `arrowIcon` プロパティによる矢印アイコンの表示・非表示
    - _Requirements: 2.1, 2.2, 2.3, 3.6_
  - [x] 2.4 `test/components/button/HamburgerButton.test.tsx` を作成する
    - `aria-expanded` 属性が `open` プロパティに応じて設定されることの検証
    - `aria-label` が open 状態に応じて "Close menu" / "Open menu" に設定されることの検証
    - _Requirements: 2.1, 2.3, 3.3, 3.4_
  - [x] 2.5 `test/components/button/ScrollTopButton.test.tsx` を作成する
    - `usePortalContainer` をモックする（Portal コンポーネント）
    - スクロール位置が300pxを超えた場合に表示されることの検証
    - クリック時に `window.scrollTo` が呼び出されることの検証
    - _Requirements: 2.1, 3.7, 3.8, 16.2_

- [ ] 3. text/ フォルダのテスト作成（カテゴリA）
  - [x] 3.1 `test/components/text/UtilText.test.tsx` を作成する
    - BodyText が children を `p` 要素で表示することの検証
    - SekaiBodyText が sekai カラーをテキストカラーとして適用することの検証
    - DetailText が children を `p` 要素で表示することの検証
    - AnnotationText / SekaiAnnotationText が children を表示することの検証
    - 各コンポーネントの `className` / `data-testid` 転送
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 8.1, 8.2, 8.3, 8.4_
  - [x] 3.2 `test/components/text/OutlineText.test.tsx` を作成する
    - `text` プロパティの値を表示し、`data-text` 属性と `aria-label` 属性を設定することの検証
    - _Requirements: 2.1, 2.2, 2.3, 8.5_
  - [x] 3.3 `test/components/text/NamePlate.test.tsx` を作成する
    - `colorLength` に基づいてテキストを色付き部分と通常部分に分割して表示することの検証
    - _Requirements: 2.1, 8.6_
  - [x] 3.4 `test/components/text/TypewriterText.test.tsx` を作成する
    - タイマーに基づいてテキストを1文字ずつ表示することの検証
    - `vi.useFakeTimers()` を使用する
    - _Requirements: 2.1, 8.7_
  - [x] 3.5 `test/components/text/MarqueeText.test.tsx` を作成する
    - children を表示することの検証
    - `ResizeObserver` モックを設定する
    - _Requirements: 2.1, 2.2, 8.8_

- [ ] 4. divider/, breadcrumb/, loading/, link/ フォルダのテスト作成（カテゴリA）
  - [x] 4.1 `test/components/divider/Divider.test.tsx` を作成する
    - `role="separator"` と `aria-orientation="horizontal"` の検証
    - `children` が渡された場合のテキスト付きディバイダーの検証
    - _Requirements: 2.1, 2.2, 2.3, 12.7, 12.8_
  - [x] 4.2 `test/components/breadcrumb/Breadcrumb.test.tsx` を作成する
    - `nav` 要素で `aria-label` 属性が設定されることの検証
    - `separator` プロパティによるセパレーター文字の表示検証
    - _Requirements: 2.1, 2.2, 2.3, 11.1, 11.2_
  - [x] 4.3 `test/components/loading/Loading.test.tsx` を作成する
    - `role="status"` と `aria-live="polite"` の検証
    - _Requirements: 2.1, 2.2, 2.3, 13.4_
  - [x] 4.4 `test/components/link/TextLink.test.tsx` を作成する
    - `a` 要素で `href` 属性が設定されることの検証
    - `isExternal=true` で `target="_blank"` と `rel="noopener noreferrer"` の検証
    - `disabled=true` で `aria-disabled="true"` の検証
    - _Requirements: 2.1, 2.2, 2.3, 13.1, 13.2, 13.3_

- [ ] 5. select/ フォルダのテスト作成（カテゴリA/C）
  - [x] 5.1 `test/components/select/Checkbox.test.tsx` を作成する
    - クリック時に `onChange` コールバックがチェック状態で呼び出されることの検証
    - `disabled=true` で `tabIndex=-1` かつ操作不可の検証
    - `aria-checked` 属性が `checked` プロパティに応じて設定されることの検証
    - _Requirements: 2.1, 2.2, 2.3, 2.6, 10.1, 10.2, 10.3_
  - [x] 5.2 `test/components/select/Chip.test.tsx` を作成する
    - `label` プロパティのテキスト表示の検証
    - `onDelete` の有無による削除ボタンの表示・非表示の検証
    - `role="button"` の検証
    - _Requirements: 2.1, 2.2, 2.3, 10.4, 10.5, 10.6, 10.7_

- [ ] 6. card/ フォルダのテスト作成（カテゴリA/C）
  - [x] 6.1 `test/components/card/Card.test.tsx` を作成する
    - Card が children を含めてレンダリングされることの検証
    - CardContent が children を含めてレンダリングされることの検証
    - CardTitle が `title` プロパティのテキストを表示し、`underline=false` でアンダーラインクラスが適用されないことの検証
    - _Requirements: 2.1, 2.2, 2.3, 6.1, 6.2, 6.3, 6.4_
  - [x] 6.2 `test/components/card/MusicBannerCard.test.tsx` を作成する
    - フォーカス時に選択状態のスタイルが適用されることの検証
    - _Requirements: 2.1, 6.5_
  - [x] 6.3 `test/components/card/PrskLinkCard.test.tsx` を作成する
    - title と subText の表示検証
    - _Requirements: 2.1, 2.2, 6.6_

- [ ] 7. list/ フォルダのテスト作成（カテゴリA/C）
  - [x] 7.1 `test/components/list/List.test.tsx` を作成する
    - デフォルトで `ul` 要素としてレンダリングされることの検証
    - `as="ol"` で `ol` 要素としてレンダリングされることの検証
    - `noBullet=false` でリストスタイルが適用されることの検証
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 7.1, 7.2, 7.3_
  - [x] 7.2 `test/components/list/ListItemButton.test.tsx` を作成する
    - List 内でクリックイベントが発火することの検証
    - `disabled=true` で無効状態の検証
    - _Requirements: 2.1, 7.4, 7.5_
  - [x] 7.3 `test/components/list/ListItemText.test.tsx` を作成する
    - children の表示検証
    - `icon` プロパティが文字列の場合に img 要素が表示されることの検証
    - _Requirements: 2.1, 2.4, 7.6, 7.7_
  - [x] 7.4 `test/components/list/StickyNote.test.tsx` を作成する
    - List 内でレンダリングされることの検証
    - _Requirements: 2.1, 7.8_

- [ ] 8. チェックポイント - カテゴリA テスト完了確認
  - 全テストがパスすることを確認する。問題があればユーザーに確認する。

- [ ] 9. textfield/ フォルダのテスト作成（カテゴリC）
  - [x] 9.1 `test/components/textfield/TextField.test.tsx` を作成する
    - テキスト入力時に `onChangeInput` コールバックが入力値で呼び出されることの検証
    - クリアボタンクリック時に入力値が空になり `onChangeInput` が空文字列で呼び出されることの検証
    - `showClearButton=false` でクリアボタンが非表示の検証
    - `isError=true` でエラーメッセージ表示の検証
    - _Requirements: 2.1, 2.2, 2.3, 5.1, 5.2, 5.3, 5.4_
  - [x] 9.2 `test/components/textfield/TextArea.test.tsx` を作成する
    - テキスト入力時に `onChange` コールバックが呼び出されることの検証
    - `maxLength` 設定時に文字数カウンター表示の検証
    - `disabled=true` で入力不可状態の検証
    - _Requirements: 2.1, 2.2, 2.3, 2.6, 5.5, 5.6, 5.7_

- [ ] 10. accordion/, tooltip/, dropdown/, pagination/ フォルダのテスト作成（カテゴリC）
  - [x] 10.1 `test/components/accordion/Accordion.test.tsx` を作成する
    - `summary` テキストの表示検証
    - サマリークリック時に `aria-expanded` 属性が切り替わることの検証
    - `defaultOpen=true` で詳細コンテンツが初期表示されることの検証
    - 詳細領域が `role="region"` と `aria-labelledby` を持つことの検証
    - _Requirements: 2.1, 2.2, 2.3, 12.1, 12.2, 12.3, 12.4_
  - [x] 10.2 `test/components/tooltip/Tooltip.test.tsx` を作成する
    - マウスホバー時にツールチップテキストが表示されることの検証
    - マウスが離れた場合にツールチップテキストが非表示になることの検証
    - _Requirements: 2.1, 12.5, 12.6_
  - [x] 10.3 `test/components/dropdown/Dropdown.test.tsx` を作成する
    - トリガーボタンクリック時にオプションリストが表示されることの検証
    - オプション選択時に `onSelect` コールバックが選択値で呼び出されることの検証
    - `ResizeObserver` モックを設定する
    - _Requirements: 2.1, 2.2, 11.5, 11.6_
  - [x] 10.4 `test/components/pagination/Pagination.test.tsx` を作成する
    - ページ番号ボタンの表示検証
    - ページ番号ボタンクリック時に `onChangePage` コールバックが呼び出されることの検証
    - _Requirements: 2.1, 2.2, 11.3, 11.4_

- [ ] 11. チェックポイント - カテゴリC テスト完了確認
  - 全テストがパスすることを確認する。問題があればユーザーに確認する。

- [ ] 12. backdrop/, dialog/ フォルダのテスト作成（カテゴリB）
  - [x] 12.1 `test/components/backdrop/Backdrop.test.tsx` を作成する
    - `usePortalContainer` をモックする
    - `open=true` で Portal 経由でレンダリングされることの検証
    - `open=false` で非表示クラスを持つことの検証
    - _Requirements: 2.1, 9.1, 9.2, 16.2_
  - [x] 12.2 `test/components/dialog/Dialog.test.tsx` を作成する
    - `usePortalContainer` をモックする
    - `open=true` で `role="dialog"` で Portal 経由でレンダリングされることの検証
    - `open=false` で DOM に存在しないことの検証
    - Escape キーで `onClose` コールバックが呼び出されることの検証
    - `aria-label` 属性が `title` プロパティの値で設定されることの検証
    - `showCloseIcon=true` で閉じるボタンが表示されることの検証
    - `buttons` プロパティでボタンが最大2つまで表示されることの検証
    - _Requirements: 2.1, 2.2, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 16.2_
  - [x] 12.3 `test/components/dialog/WindowDialog.test.tsx` を作成する
    - `usePortalContainer` をモックする
    - `open=true` で `role="dialog"` で Portal 経由でレンダリングされることの検証
    - _Requirements: 2.1, 4.7, 16.2_
  - [x] 12.4 `test/components/dialog/XoMikuDialog.test.tsx` を作成する
    - `usePortalContainer` をモックする
    - Escape キーで `onClose` コールバックが呼び出されることの検証
    - _Requirements: 2.1, 4.8, 16.2_
  - [x] 12.5 `test/components/dialog/XxMikuDialog.test.tsx` を作成する
    - `usePortalContainer` をモックする
    - Escape キーで `onClose` コールバックが呼び出されることの検証
    - _Requirements: 2.1, 4.9, 16.2_

- [ ] 13. drawer/, toast/, sidemenu/ フォルダのテスト作成（カテゴリB）
  - [x] 13.1 `test/components/drawer/Drawer.test.tsx` を作成する
    - `usePortalContainer` をモックする
    - `open=true` で Portal 経由でレンダリングされ children を表示することの検証
    - オーバーレイクリック時に `onClose` コールバックが呼び出されることの検証
    - `pos` プロパティによる位置クラスの検証
    - _Requirements: 2.1, 2.4, 9.3, 9.4, 9.5, 16.2_
  - [x] 13.2 `test/components/toast/Toast.test.tsx` を作成する
    - `usePortalContainer` をモックする
    - `open=true` で Portal 経由でメッセージを表示することの検証
    - `duration` ミリ秒経過後に `onClose` コールバックが呼び出されることの検証（`vi.useFakeTimers()`）
    - 閉じるボタンクリック時に `onClose` コールバックが呼び出されることの検証
    - `message` が配列の場合に全メッセージが表示されることの検証
    - _Requirements: 2.1, 9.6, 9.7, 9.8, 9.9, 16.2_
  - [x] 13.3 `test/components/sidemenu/SideMenu.test.tsx` を作成する
    - `usePortalContainer` をモックする
    - `open=true` で Portal 経由でレンダリングされることの検証
    - ハンバーガーボタンクリック時にメニューの開閉状態が切り替わることの検証
    - _Requirements: 2.1, 11.7, 11.8, 16.2_

- [ ] 14. carousel/, viewer/, effect/ フォルダのテスト作成（カテゴリA/B/C）
  - [x] 14.1 `test/components/carousel/Carousel.test.tsx` を作成する
    - Swiper / SwiperSlide をモックする
    - children を SwiperSlide でラップしてレンダリングされることの検証
    - _Requirements: 2.1, 13.5_
  - [x] 14.2 `test/components/viewer/PictureViewer.test.tsx` を作成する
    - `usePortalContainer` をモックする
    - framer-motion をモックする
    - サムネイル画像の表示検証
    - _Requirements: 2.1, 13.6, 16.2_
  - [x] 14.3 `test/components/effect/DoReMeetEffect.test.tsx` を作成する
    - `text` プロパティのテキスト表示検証
    - `role="button"` の検証
    - クリック時に sekai カラーのアニメーションが開始されることの検証
    - _Requirements: 2.1, 15.1, 15.2, 15.3_
  - [x] 14.4 `test/components/effect/IntoTheSekai.test.tsx` を作成する
    - `usePortalContainer` をモックする
    - Portal 経由で canvas 要素がレンダリングされることの検証
    - _Requirements: 2.1, 15.4, 16.2_
  - [x] 14.5 `test/components/effect/SekaiBackground.test.tsx` を作成する
    - `usePortalContainer` をモックする
    - Portal 経由で canvas 要素がレンダリングされることの検証
    - _Requirements: 2.1, 15.5, 16.2_

- [ ] 15. チェックポイント - カテゴリB テスト完了確認
  - 全テストがパスすることを確認する。問題があればユーザーに確認する。

- [ ] 16. provider/ フォルダのテスト作成（カテゴリD）
  - [x] 16.1 `test/components/provider/YourSekaiProvider.test.tsx` を作成する
    - `useOptionalSekai` をモックしない（実際の Provider を使用）
    - children のレンダリング検証
    - sekaiTheme のコンテキスト値が子コンポーネントに提供されることの検証
    - _Requirements: 2.1, 14.1, 14.2_
  - [x] 16.2 `test/components/provider/SharedValueProvider.test.tsx` を作成する
    - `createSharedValueProvider` が SharedValueProvider と useSharedValueContext を返すことの検証
    - defaultValue がコンテキスト経由で提供されることの検証
    - Provider 外で useSharedValueContext を使用した場合にエラーがスローされることの検証
    - _Requirements: 14.3, 14.4, 14.5_

- [ ] 17. チェックポイント - カテゴリD テスト完了確認
  - 全テストがパスすることを確認する。問題があればユーザーに確認する。

- [ ] 18. プロパティベーステスト（PBT）の作成
  - [ ]* 18.1 `test/components/button/BasicButton.property.test.tsx` を作成する
    - **Property 1: プロパティ転送の不変量**
    - 任意の className 文字列がルート要素に適用されることを fast-check で検証する
    - **Validates: Requirements 2.2, 2.3, 17.1**
  - [ ]* 18.2 `test/components/divider/Divider.property.test.tsx` を作成する
    - **Property 1: プロパティ転送の不変量**
    - 任意の className 文字列がルート要素に適用されることを fast-check で検証する
    - **Validates: Requirements 2.2, 2.3, 17.1**
  - [ ]* 18.3 `test/components/button/BasicButton.property.test.tsx` に sekai テストを追加する
    - **Property 2: sekai CSS 変数設定の不変量**
    - 任意の sekai キーに対して `--sekai-color` が設定されることを fast-check で検証する
    - **Validates: Requirements 2.5, 17.2**
  - [ ]* 18.4 `test/components/text/NamePlate.property.test.tsx` を作成する
    - **Property 3: NamePlate テキスト分割の正当性**
    - 任意の非空文字列と正整数 colorLength に対して、テキストが正しく分割されることを fast-check で検証する
    - **Validates: Requirements 8.6, 17.3**

- [ ] 19. カバレッジ検証と最終確認
  - `npx vitest --run --coverage` を実行し、`src/components/` のステートメントカバレッジが60%以上であることを確認する
  - `npm run test:unit` で全テストがパスすることを確認する
  - 問題があればユーザーに確認する
  - _Requirements: 18.1, 18.2, 18.3_

## Notes

- タスク `*` は優先度や仕様が未確定のため、詳細設計完了後に着手するタスクを示す。