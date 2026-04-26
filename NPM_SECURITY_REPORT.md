# 🩺 依存関係ヘルスレポート

> 🤖 **草薙 寧々**: パッケージの依存関係の状態確認してきたよ。レポートにまとめておいたから後で確認しておいて欲しいな🤖

**実行日時**: 2026/04/25 01:29:43 JST

---

## 📦 npm outdated

```
Package                            Current   Wanted   Latest  Location                                       Depended by
@babel/plugin-transform-runtime     7.28.5   7.29.0   7.29.0  node_modules/@babel/plugin-transform-runtime   Untitled
@babel/runtime                      7.28.3   7.29.2   7.29.2  node_modules/@babel/runtime                    Untitled
@chromatic-com/storybook             5.0.1    5.1.2    5.1.2  node_modules/@chromatic-com/storybook          Untitled
@eslint/compat                       1.3.2    1.4.1    2.0.5  node_modules/@eslint/compat                    Untitled
@eslint/js                          9.39.2   9.39.4   10.0.1  node_modules/@eslint/js                        Untitled
@rollup/plugin-babel                 6.1.0    6.1.0    7.0.0  node_modules/@rollup/plugin-babel              Untitled
@rollup/plugin-commonjs             29.0.0   29.0.2   29.0.2  node_modules/@rollup/plugin-commonjs           Untitled
@storybook/addon-docs              10.1.10   10.3.5   10.3.5  node_modules/@storybook/addon-docs             Untitled
@storybook/addon-onboarding         10.2.8   10.2.8   10.3.5  node_modules/@storybook/addon-onboarding       Untitled
@storybook/react-vite               10.2.8   10.3.5   10.3.5  node_modules/@storybook/react-vite             Untitled
@types/node                         25.3.3   25.6.0   25.6.0  node_modules/@types/node                       Untitled
@types/react                        19.2.7  19.2.14  19.2.14  node_modules/@types/react                      Untitled
@typescript-eslint/eslint-plugin    8.49.0   8.59.0   8.59.0  node_modules/@typescript-eslint/eslint-plugin  Untitled
@typescript-eslint/parser           8.56.1   8.59.0   8.59.0  node_modules/@typescript-eslint/parser         Untitled
@vitest/coverage-v8                  3.2.4    3.2.4    4.1.5  node_modules/@vitest/coverage-v8               Untitled
autoprefixer                       10.4.21   10.5.0   10.5.0  node_modules/autoprefixer                      Untitled
baseline-browser-mapping            2.10.0  2.10.21  2.10.21  node_modules/baseline-browser-mapping          Untitled
eslint                              9.34.0   9.39.4   10.2.1  node_modules/eslint                            Untitled
eslint-plugin-react-hooks            7.0.1    7.1.1    7.1.1  node_modules/eslint-plugin-react-hooks         Untitled
eslint-plugin-storybook            10.1.10   10.3.5   10.3.5  node_modules/eslint-plugin-storybook           Untitled
fast-check                          3.23.2   3.23.2    4.7.0  node_modules/fast-check                        Untitled
framer-motion                     12.23.26  12.38.0  12.38.0  node_modules/framer-motion                     Untitled
jsdom                               29.0.1   29.0.2   29.0.2  node_modules/jsdom                             Untitled
react                               19.2.3   19.2.5   19.2.5  node_modules/react                             Untitled
react-dom                           19.2.3   19.2.5   19.2.5  node_modules/react-dom                         Untitled
rollup                              4.60.1   4.60.2   4.60.2  node_modules/rollup                            Untitled
rollup-plugin-dts                    6.3.0    6.4.1    6.4.1  node_modules/rollup-plugin-dts                 Untitled
rollup-plugin-typescript2           0.36.0   0.36.0   0.37.0  node_modules/rollup-plugin-typescript2         Untitled
sass                                1.96.0   1.99.0   1.99.0  node_modules/sass                              Untitled
typescript                           5.9.3    5.9.3    6.0.3  node_modules/typescript                        Untitled
vite                                 6.4.2    6.4.2   8.0.10  node_modules/vite                              Untitled
vitest                               3.2.4    3.2.4    4.1.5  node_modules/vitest                            Untitled
```

---

## 🔒 npm audit

```
合計 8 件の脆弱性が検出されました

critical : 0
high     : 6
moderate : 2
low      : 0
info     : 0

----------------------------------------

■ brace-expansion [MODERATE]
  影響バージョン: <=1.1.12 || 2.0.0 - 2.0.2 || 4.0.0 - 5.0.4
  brace-expansion: Zero-step sequence causes process hang and memory exhaustion
  https://github.com/advisories/GHSA-f886-m6hf-6m8v
  brace-expansion: Zero-step sequence causes process hang and memory exhaustion
  https://github.com/advisories/GHSA-f886-m6hf-6m8v
  brace-expansion: Zero-step sequence causes process hang and memory exhaustion
  https://github.com/advisories/GHSA-f886-m6hf-6m8v
  修正: npm audit fix で対応可能

■ flatted [HIGH]
  影響バージョン: <=3.4.1
  flatted vulnerable to unbounded recursion DoS in parse() revive phase
  https://github.com/advisories/GHSA-25h7-pfq9-p65f
  Prototype Pollution via parse() in NodeJS flatted
  https://github.com/advisories/GHSA-rf6f-7fwh-wjgh
  修正: npm audit fix で対応可能

■ glob [HIGH]
  影響バージョン: 10.2.0 - 10.4.5
  glob CLI: Command injection via -c/--cmd executes matches with shell:true
  https://github.com/advisories/GHSA-5j98-mcp5-4vw2
  修正: npm audit fix で対応可能

■ immutable [HIGH]
  影響バージョン: 5.0.0 - 5.1.4
  Immutable is vulnerable to Prototype Pollution
  https://github.com/advisories/GHSA-wf6x-7x77-mvgw
  修正: npm audit fix で対応可能

■ minimatch [HIGH]
  影響バージョン: 9.0.0 - 9.0.6
  minimatch has a ReDoS via repeated wildcards with non-matching literal in pattern
  https://github.com/advisories/GHSA-3ppc-4f35-3m26
  minimatch has ReDoS: matchOne() combinatorial backtracking via multiple non-adjacent GLOBSTAR segments
  https://github.com/advisories/GHSA-7r86-cg39-jmmj
  minimatch ReDoS: nested *() extglobs generate catastrophically backtracking regular expressions
  https://github.com/advisories/GHSA-23c5-xmqv-rm74
  修正: npm audit fix で対応可能

■ picomatch [HIGH]
  影響バージョン: <=2.3.1
  Picomatch: Method Injection in POSIX Character Classes causes incorrect Glob Matching
  https://github.com/advisories/GHSA-3v7f-55p6-f55p
  Picomatch has a ReDoS vulnerability via extglob quantifiers
  https://github.com/advisories/GHSA-c2c7-rcm5-vvqj
  修正: npm audit fix で対応可能

■ svgo [HIGH]
  影響バージョン: 2.1.0 - 2.8.0 || 3.0.0 - 3.3.2
  SVGO DoS through entity expansion in DOCTYPE (Billion Laughs)
  https://github.com/advisories/GHSA-xpqw-6gx7-v673
  SVGO DoS through entity expansion in DOCTYPE (Billion Laughs)
  https://github.com/advisories/GHSA-xpqw-6gx7-v673
  修正: npm audit fix で対応可能

■ yaml [MODERATE]
  影響バージョン: 1.0.0 - 1.10.2
  yaml is vulnerable to Stack Overflow via deeply nested YAML collections
  https://github.com/advisories/GHSA-48c2-rrv3-qjmp
  修正: npm audit fix で対応可能
```
