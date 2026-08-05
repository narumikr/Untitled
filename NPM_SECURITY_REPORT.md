# 🩺 依存関係ヘルスレポート

> 🌟 **天馬 司**: 未来のスーパースターがチェックしてきたぞ！脆弱性など我が前には無力だぁぁ！🌟

**実行日時**: 2026/08/01 02:47:37 JST

---

## 📦 npm outdated

```
Package                          Current  Wanted  Latest  Location                                      Depended by
@babel/plugin-transform-runtime   7.29.7  7.29.7   8.0.1  node_modules/@babel/plugin-transform-runtime  Untitled
@babel/runtime                    7.29.7  7.29.7   8.0.0  node_modules/@babel/runtime                   Untitled
@eslint/compat                     1.4.1   1.4.1   2.1.0  node_modules/@eslint/compat                   Untitled
@eslint/js                        9.39.5  9.39.5  10.0.1  node_modules/@eslint/js                       Untitled
@rollup/plugin-babel               6.1.0   6.1.0   7.1.0  node_modules/@rollup/plugin-babel             Untitled
@rollup/plugin-typescript         11.1.6  11.1.6  12.3.0  node_modules/@rollup/plugin-typescript        Untitled
@storybook/addon-onboarding       10.2.8  10.2.8  10.5.5  node_modules/@storybook/addon-onboarding      Untitled
@testing-library/jest-dom          6.9.1   6.9.1   7.0.0  node_modules/@testing-library/jest-dom        Untitled
@types/node                       25.9.5  25.9.5  26.1.2  node_modules/@types/node                      Untitled
eslint                            9.39.5  9.39.5  10.8.0  node_modules/eslint                           Untitled
fast-check                        3.23.2  3.23.2   4.9.0  node_modules/fast-check                       Untitled
jsdom                             29.1.1  29.1.1  30.0.1  node_modules/jsdom                            Untitled
swiper                            12.2.0  12.2.0  14.0.7  node_modules/swiper                           Untitled
typescript                         5.9.3   5.9.3   7.0.2  node_modules/typescript                       Untitled
vite                               6.4.3   6.4.3   8.2.0  node_modules/vite                             Untitled
```

---

## 🔒 npm audit

```
合計 9 件の脆弱性が検出されました

critical : 0
high     : 9
moderate : 0
low      : 0
info     : 0

----------------------------------------

■ @eslint/compat [HIGH]
  影響バージョン: 1.2.0 - 2.0.1
  修正: @eslint/compat@2.1.0 へのアップデートが必要

■ @eslint/config-array [HIGH]
  影響バージョン: <=0.22.0
  修正: eslint@10.8.0 へのアップデートが必要

■ @eslint/eslintrc [HIGH]
  影響バージョン: 0.0.1 || >=0.1.1
  修正: @eslint/eslintrc@0.1.0 へのアップデートが必要

■ brace-expansion [HIGH]
  影響バージョン: <=5.0.7
  brace-expansion: DoS via unbounded expansion length causing an out-of-memory process crash
  https://github.com/advisories/GHSA-mh99-v99m-4gvg
  修正: eslint-plugin-react@7.22.0 へのアップデートが必要

■ eslint [HIGH]
  影響バージョン: 0.12.0 - 2.0.0-rc.1 || 4.1.0 - 10.0.0-rc.2
  修正: eslint@10.8.0 へのアップデートが必要

■ eslint-plugin-import [HIGH]
  影響バージョン: >=1.15.0
  修正: eslint-plugin-import@1.14.0 へのアップデートが必要

■ eslint-plugin-jsx-a11y [HIGH]
  影響バージョン: >=6.5.0
  修正: eslint-plugin-jsx-a11y@6.4.1 へのアップデートが必要

■ eslint-plugin-react [HIGH]
  影響バージョン: >=7.23.0
  修正: eslint-plugin-react@7.22.0 へのアップデートが必要

■ minimatch [HIGH]
  影響バージョン: 2.0.0 - 10.0.2
  修正: eslint-plugin-react@7.22.0 へのアップデートが必要
```
