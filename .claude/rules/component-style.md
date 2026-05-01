---
paths:
  - "**/*.tsx"
---

# コンポーネント実装時ルール

このプロジェクトはプロセカコンセプトのライブラリです。

一般的なコンポーネント作成と違い、キャラクターのカラーコードからスタイルを実装する必要があります。

## 実装時のルール

以下のルールはユーザーから特別指示がない限りは**必ず**守ってください。

### sekai

キャラクターを指定するためのPropsです。この値から内部用意のhookである`useOptionalSekai`からカラーコードを取得してUIに反映しています。

```tsx
const { sekaiColor, modeTheme, isLight } = useOptionalSekai({ sekai, mode: themeMode })

  const optionStyle = {
    '--sekai-color': sekaiColor,
  }
  ...
  return (
    <div style={{ ...(optionStyle as React.CSSProperties), ...props.style }} />
  )
```

### YourSekaiProvider

専用のproviderも提供しています。ここでは`sekai`の値をはじめテーマカラー(light/dark)の値も共有しています。各コンポーネントはproviderからsekaiなどの値を取得し、取得できなかった場合は`miku`と`light`をデフォルトに動作します。

### useOptionalSekai

内部用のhookです。外部に公開はしていません。`YourSekaiProvider`から`sekai`や`theme`を取得します。コンテキストを取得できなかった場合はデフォルトで`miku`と`light`を返却します。

### src/types/

型定義はコンポーネントファイルから分離しています。`src/types/`フォルダに`src/components/`フォルダと同じ構成で定義し、コンポーネントファイルはそれをimportする形で実装しています。

