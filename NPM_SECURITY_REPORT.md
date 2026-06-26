# 🩺 依存関係ヘルスレポート

> 🐧 **桐谷 遥**: 依存関係少し心配だったから確認してレポートにまとめたよ。私も手伝うから確認しちゃおう🐧

**実行日時**: 2026/06/27 01:48:47 JST

---

## 📦 npm outdated

```
Package                            Current   Wanted   Latest  Location                                        Depended by
@babel/plugin-transform-runtime     7.28.5   7.29.7    8.0.1  node_modules/@babel/plugin-transform-runtime    Untitled
@babel/runtime                      7.28.3   7.29.7    8.0.0  node_modules/@babel/runtime                     Untitled
@chromatic-com/storybook             5.0.1    5.2.1    5.2.1  node_modules/@chromatic-com/storybook           Untitled
@eslint/compat                       1.3.2    1.4.1    2.1.0  node_modules/@eslint/compat                     Untitled
@eslint/js                          9.39.4   9.39.4   10.0.1  node_modules/@eslint/js                         Untitled
@rollup/plugin-babel                 6.1.0    6.1.0    7.1.0  node_modules/@rollup/plugin-babel               Untitled
@rollup/plugin-commonjs             29.0.0   29.0.3   29.0.3  node_modules/@rollup/plugin-commonjs            Untitled
@rollup/plugin-typescript           11.1.6   11.1.6   12.3.0  node_modules/@rollup/plugin-typescript          Untitled
@storybook/addon-docs              10.1.10   10.4.6   10.4.6  node_modules/@storybook/addon-docs              Untitled
@storybook/addon-onboarding         10.2.8   10.2.8   10.4.6  node_modules/@storybook/addon-onboarding        Untitled
@storybook/react-vite               10.2.8   10.4.6   10.4.6  node_modules/@storybook/react-vite              Untitled
@types/node                         25.3.3   25.9.4   26.0.1  node_modules/@types/node                        Untitled
@types/react                        19.2.7  19.2.17  19.2.17  node_modules/@types/react                       Untitled
@typescript-eslint/eslint-plugin    8.49.0   8.62.0   8.62.0  node_modules/@typescript-eslint/eslint-plugin   Untitled
@typescript-eslint/parser           8.56.1   8.62.0   8.62.0  node_modules/@typescript-eslint/parser          Untitled
@vitest/coverage-v8                  4.1.8    4.1.9    4.1.9  node_modules/@vitest/coverage-v8                Untitled
autoprefixer                       10.4.21   10.5.2   10.5.2  node_modules/autoprefixer                       Untitled
baseline-browser-mapping            2.10.0  2.10.40  2.10.40  node_modules/baseline-browser-mapping           Untitled
eslint                              9.39.4   9.39.4   10.5.0  node_modules/eslint                             Untitled
eslint-import-resolver-typescript    4.4.4    4.4.5    4.4.5  node_modules/eslint-import-resolver-typescript  Untitled
eslint-plugin-prettier               5.5.5    5.5.6    5.5.6  node_modules/eslint-plugin-prettier             Untitled
eslint-plugin-storybook            10.1.10   10.4.6   10.4.6  node_modules/eslint-plugin-storybook            Untitled
fast-check                          3.23.2   3.23.2    4.8.0  node_modules/fast-check                         Untitled
framer-motion                      12.38.0  12.42.0  12.42.0  node_modules/framer-motion                      Untitled
jsdom                               29.0.2   29.1.1   29.1.1  node_modules/jsdom                              Untitled
postcss                             8.5.10   8.5.15   8.5.15  node_modules/postcss                            Untitled
react                               19.2.3   19.2.7   19.2.7  node_modules/react                              Untitled
react-dom                           19.2.3   19.2.7   19.2.7  node_modules/react-dom                          Untitled
rollup                              4.60.1   4.62.2   4.62.2  node_modules/rollup                             Untitled
rollup-plugin-dts                    6.3.0    6.4.1    6.4.1  node_modules/rollup-plugin-dts                  Untitled
sass                                1.99.0  1.101.0  1.101.0  node_modules/sass                               Untitled
storybook                           10.3.5   10.4.6   10.4.6  node_modules/storybook                          Untitled
swiper                              12.1.3   12.2.0   12.2.0  node_modules/swiper                             Untitled
typescript                           5.9.3    5.9.3    6.0.3  node_modules/typescript                         Untitled
vite                                 6.4.2    6.4.3    8.1.0  node_modules/vite                               Untitled
vitest                               4.1.8    4.1.9    4.1.9  node_modules/vitest                             Untitled
```

---

## 🔒 npm audit

```
合計 5 件の脆弱性が検出されました

critical : 0
high     : 2
moderate : 1
low      : 2
info     : 0

----------------------------------------

■ @babel/core [LOW]
  影響バージョン: <=7.29.0
  @babel/core: Arbitrary File Read via sourceMappingURL Comment
  https://github.com/advisories/GHSA-4x5r-pxfx-6jf8
  修正: npm audit fix で対応可能

■ esbuild [LOW]
  影響バージョン: 0.27.3 - 0.28.0
  esbuild allows arbitrary file read when running the development server on Windows
  https://github.com/advisories/GHSA-g7r4-m6w7-qqqr
  修正: npm audit fix で対応可能

■ js-yaml [MODERATE]
  影響バージョン: <=4.1.1
  JS-YAML: Quadratic-complexity DoS in merge key handling via repeated aliases
  https://github.com/advisories/GHSA-h67p-54hq-rp68
  修正: npm audit fix で対応可能

■ undici [HIGH]
  影響バージョン: 7.0.0 - 7.27.2
  undici vulnerable to TLS certificate validation bypass via dropped requestTls in SOCKS5 ProxyAgent
  https://github.com/advisories/GHSA-vmh5-mc38-953g
  undici vulnerable to HTTP header injection via Set-Cookie percent-decoding
  https://github.com/advisories/GHSA-p88m-4jfj-68fv
  undici WebSocket client vulnerable to denial of service via fragment count bypass
  https://github.com/advisories/GHSA-vxpw-j846-p89q
  undici vulnerable to cross-origin request routing via SOCKS5 proxy pool reuse
  https://github.com/advisories/GHSA-hm92-r4w5-c3mj
  undici vulnerable to HTTP response queue poisoning via keep-alive socket reuse
  https://github.com/advisories/GHSA-35p6-xmwp-9g52
  undici vulnerable to Set-Cookie SameSite attribute downgrade via permissive substring matching
  https://github.com/advisories/GHSA-g8m3-5g58-fq7m
  undici vulnerable to cross-user information disclosure via shared cache whitespace bypass
  https://github.com/advisories/GHSA-pr7r-676h-xcf6
  修正: npm audit fix で対応可能

■ vite [HIGH]
  影響バージョン: <=6.4.2
  launch-editor: NTLMv2 hash disclosure via UNC path handling on Windows
  https://github.com/advisories/GHSA-v6wh-96g9-6wx3
  vite: `server.fs.deny` bypass on Windows alternate paths
  https://github.com/advisories/GHSA-fx2h-pf6j-xcff
  修正: npm audit fix で対応可能
```
