# 🩺 依存関係ヘルスレポート

> 💧 **日野森 雫**: パッケージの状態確認してきたわよ～。必要あれば更新していきましょう💧

**実行日時**: 2026/06/06 01:56:45 JST

---

## 📦 npm outdated

```
Package                             Current   Wanted   Latest  Location                                        Depended by
@babel/plugin-transform-runtime      7.28.5   7.29.7   7.29.7  node_modules/@babel/plugin-transform-runtime    Untitled
@babel/runtime                       7.28.3   7.29.7   7.29.7  node_modules/@babel/runtime                     Untitled
@chromatic-com/storybook              5.0.1    5.2.1    5.2.1  node_modules/@chromatic-com/storybook           Untitled
@eslint/compat                        1.3.2    1.4.1    2.1.0  node_modules/@eslint/compat                     Untitled
@eslint/js                           9.39.4   9.39.4   10.0.1  node_modules/@eslint/js                         Untitled
@rollup/plugin-babel                  6.1.0    6.1.0    7.1.0  node_modules/@rollup/plugin-babel               Untitled
@rollup/plugin-commonjs              29.0.0   29.0.3   29.0.3  node_modules/@rollup/plugin-commonjs            Untitled
@rollup/plugin-typescript            11.1.6   11.1.6   12.3.0  node_modules/@rollup/plugin-typescript          Untitled
@storybook/addon-docs               10.1.10   10.4.2   10.4.2  node_modules/@storybook/addon-docs              Untitled
@storybook/addon-onboarding          10.2.8   10.2.8   10.4.2  node_modules/@storybook/addon-onboarding        Untitled
@storybook/react-vite                10.2.8   10.4.2   10.4.2  node_modules/@storybook/react-vite              Untitled
@types/node                          25.3.3   25.9.1   25.9.1  node_modules/@types/node                        Untitled
@types/react                         19.2.7  19.2.16  19.2.16  node_modules/@types/react                       Untitled
@typescript-eslint/eslint-plugin     8.49.0   8.60.1   8.60.1  node_modules/@typescript-eslint/eslint-plugin   Untitled
@typescript-eslint/parser            8.56.1   8.60.1   8.60.1  node_modules/@typescript-eslint/parser          Untitled
@vitest/coverage-v8                   3.2.4    3.2.6    4.1.8  node_modules/@vitest/coverage-v8                Untitled
autoprefixer                        10.4.21   10.5.0   10.5.0  node_modules/autoprefixer                       Untitled
baseline-browser-mapping             2.10.0  2.10.34  2.10.34  node_modules/baseline-browser-mapping           Untitled
eslint                               9.39.4   9.39.4   10.4.1  node_modules/eslint                             Untitled
eslint-import-resolver-typescript     4.4.4    4.4.5    4.4.5  node_modules/eslint-import-resolver-typescript  Untitled
eslint-plugin-prettier                5.5.5    5.5.6    5.5.6  node_modules/eslint-plugin-prettier             Untitled
eslint-plugin-storybook             10.1.10   10.4.2   10.4.2  node_modules/eslint-plugin-storybook            Untitled
fast-check                           3.23.2   3.23.2    4.8.0  node_modules/fast-check                         Untitled
framer-motion                      12.23.26  12.40.0  12.40.0  node_modules/framer-motion                      Untitled
jsdom                                29.0.2   29.1.1   29.1.1  node_modules/jsdom                              Untitled
postcss                              8.5.10   8.5.15   8.5.15  node_modules/postcss                            Untitled
react                                19.2.3   19.2.7   19.2.7  node_modules/react                              Untitled
react-dom                            19.2.3   19.2.7   19.2.7  node_modules/react-dom                          Untitled
rollup                               4.60.1   4.61.1   4.61.1  node_modules/rollup                             Untitled
rollup-plugin-dts                     6.3.0    6.4.1    6.4.1  node_modules/rollup-plugin-dts                  Untitled
sass                                 1.99.0  1.100.0  1.100.0  node_modules/sass                               Untitled
storybook                            10.3.5   10.4.2   10.4.2  node_modules/storybook                          Untitled
swiper                               12.1.3   12.2.0   12.2.0  node_modules/swiper                             Untitled
typescript                            5.9.3    5.9.3    6.0.3  node_modules/typescript                         Untitled
vite                                  6.4.2    6.4.3   8.0.16  node_modules/vite                               Untitled
vitest                                3.2.4    3.2.6    4.1.8  node_modules/vitest                             Untitled
```

---

## 🔒 npm audit

```
合計 5 件の脆弱性が検出されました

critical : 2
high     : 1
moderate : 2
low      : 0
info     : 0

----------------------------------------

■ @babel/plugin-transform-modules-systemjs [HIGH]
  影響バージョン: 7.12.0 - 7.29.0
  @babel/plugin-transform-modules-systemjs generates arbitrary code when compiling malicious input
  https://github.com/advisories/GHSA-fv7c-fp4j-7gwp
  修正: npm audit fix で対応可能

■ @vitest/coverage-v8 [CRITICAL]
  影響バージョン: <=4.1.0-beta.6
  修正: @vitest/coverage-v8@4.1.8 へのアップデートが必要

■ brace-expansion [MODERATE]
  影響バージョン: 5.0.2 - 5.0.5
  brace-expansion: Large numeric range defeats documented `max` DoS protection
  https://github.com/advisories/GHSA-jxxr-4gwj-5jf2
  修正: npm audit fix で対応可能

■ vitest [CRITICAL]
  影響バージョン: <4.1.0
  When Vitest UI server is listening, arbitrary file can be read and executed
  https://github.com/advisories/GHSA-5xrq-8626-4rwp
  修正: vitest@4.1.8 へのアップデートが必要

■ ws [MODERATE]
  影響バージョン: 8.0.0 - 8.20.0
  ws: Uninitialized memory disclosure
  https://github.com/advisories/GHSA-58qx-3vcg-4xpx
  修正: npm audit fix で対応可能
```
