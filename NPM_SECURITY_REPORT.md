# 🩺 依存関係ヘルスレポート

> 🍨 **KAITO**: 依存関係のヘルスチェック完了だよ！僕と一緒に確認してみよう！🍨

**実行日時**: 2026/11/07 06:26:27 JST

---

## 📦 npm outdated

```
Package                          Current   Wanted   Latest  Location                                      Depended by
@babel/plugin-transform-runtime   7.29.7   7.29.7    8.0.6  node_modules/@babel/plugin-transform-runtime  Untitled
@babel/runtime                   7.29.13  7.29.13    8.1.0  node_modules/@babel/runtime                   Untitled
@eslint/compat                     1.4.1    1.4.1    2.1.1  node_modules/@eslint/compat                   Untitled
@eslint/js                        9.39.5   9.39.5   10.0.1  node_modules/@eslint/js                       Untitled
@rollup/plugin-babel               6.1.0    6.1.0    7.1.0  node_modules/@rollup/plugin-babel             Untitled
@rollup/plugin-typescript         11.1.6   11.1.6   12.3.1  node_modules/@rollup/plugin-typescript        Untitled
@storybook/addon-onboarding       10.2.8   10.2.8   10.6.6  node_modules/@storybook/addon-onboarding      Untitled
@testing-library/jest-dom          6.9.1    6.9.1    7.0.1  node_modules/@testing-library/jest-dom        Untitled
@types/node                       25.9.9   25.9.9   26.6.6  node_modules/@types/node                      Untitled
@vitest/coverage-v8               4.1.12   4.1.12    5.1.0  node_modules/@vitest/coverage-v8              Untitled
eslint                            9.39.5   9.39.5  10.14.0  node_modules/eslint                           Untitled
fast-check                        3.23.2   3.23.2   4.10.2  node_modules/fast-check                       Untitled
framer-motion                    12.43.0  12.43.0  14.10.1  node_modules/framer-motion                    Untitled
jsdom                             29.1.1   29.1.1   31.0.0  node_modules/jsdom                            Untitled
swiper                            12.2.0   12.2.0   14.4.0  node_modules/swiper                           Untitled
typescript                         6.0.3    6.0.3    7.0.2  node_modules/typescript                       Untitled
vite                               6.4.5    6.4.5    8.3.6  node_modules/vite                             Untitled
vitest                            4.1.12   4.1.12    5.1.0  node_modules/vitest                           Untitled
```

---

## 🔒 npm audit

```
合計 14 件の脆弱性が検出されました

critical : 0
high     : 0
moderate : 10
low      : 4
info     : 0

----------------------------------------

■ @joshwooding/vite-plugin-react-docgen-typescript [MODERATE]
  影響バージョン: 0.4.0 || 0.5.0 - 0.9.0
  修正: @storybook/react-vite@8.5.3 へのアップデートが必要

■ @rollup/plugin-node-resolve [LOW]
  影響バージョン: >=8.0.0
  修正: @rollup/plugin-node-resolve@7.1.3 へのアップデートが必要

■ @storybook/react-vite [MODERATE]
  影響バージョン: <=0.0.0-pr-36141-sha-6ddbeb4a || >=8.5.4
  修正: @storybook/react-vite@8.5.3 へのアップデートが必要

■ @svgr/plugin-svgo [LOW]
  影響バージョン: >=5.5.0
  修正: @svgr/rollup@5.4.0 へのアップデートが必要

■ @svgr/rollup [LOW]
  影響バージョン: >=5.5.0
  修正: @svgr/rollup@5.4.0 へのアップデートが必要

■ @typescript-eslint/eslint-plugin [MODERATE]
  影響バージョン: >=6.16.0
  修正: @typescript-eslint/eslint-plugin@7.0.0 へのアップデートが必要

■ @typescript-eslint/parser [MODERATE]
  影響バージョン: >=6.16.0
  修正: @typescript-eslint/parser@6.15.0 へのアップデートが必要

■ @typescript-eslint/type-utils [MODERATE]
  影響バージョン: >=6.16.0
  修正: @typescript-eslint/eslint-plugin@7.0.0 へのアップデートが必要

■ @typescript-eslint/typescript-estree [MODERATE]
  影響バージョン: >=6.16.0
  修正: @typescript-eslint/parser@6.15.0 へのアップデートが必要

■ @typescript-eslint/utils [MODERATE]
  影響バージョン: >=6.16.0
  修正: @typescript-eslint/eslint-plugin@7.0.0 へのアップデートが必要

■ deepmerge [LOW]
  影響バージョン: >=4.2.0
  deepmerge mergeObject() allows prototype poisoning of returned objects
  https://github.com/advisories/GHSA-gcqx-w48m-w2h4
  修正: @rollup/plugin-node-resolve@7.1.3 へのアップデートが必要

■ eslint-plugin-storybook [MODERATE]
  影響バージョン: <=0.0.0-pr-36141-sha-6ddbeb4a || >=0.9.1--canary.1251e0f.0
  修正: eslint-plugin-storybook@0.9.0 へのアップデートが必要

■ glob [MODERATE]
  影響バージョン: 9.0.0 - 14.0.1
  Glob: AbortSignal cancellation bypass allows post-timeout filesystem traversal
  https://github.com/advisories/GHSA-3g3m-2fjr-6pw4
  修正: @storybook/react-vite@8.5.3 へのアップデートが必要

■ minimatch [MODERATE]
  影響バージョン: 7.0.0 - 11.0.0
  minimatch has potential denial of service via globparts amplification
  https://github.com/advisories/GHSA-g3hv-75wg-m249
  修正: @typescript-eslint/parser@6.15.0 へのアップデートが必要
```
