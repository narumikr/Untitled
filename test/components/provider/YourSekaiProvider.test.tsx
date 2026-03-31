import { useContext } from 'react'

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { YourSekaiProvider, YourSekaiContext } from '@/components/provider/YourSekaiProvider'

import { createSekai } from '@/utils/createSekai'

const sekaiTheme = createSekai({ palette: { sekai: 'Miku', mode: 'light' } })

/** コンテキスト値を表示するテスト用コンシューマー */
const ContextConsumer = () => {
  const ctx = useContext(YourSekaiContext)!
  return (
    <div>
      <span data-testid="sekai">{ctx.sekaiTheme.palette.sekai}</span>
      <span data-testid="mode">{ctx.sekaiTheme.palette.mode}</span>
      <span data-testid="font">{ctx.sekaiTheme.typography.fontFamily}</span>
    </div>
  )
}

describe('YourSekaiProvider', () => {
  it('children をレンダリングする', () => {
    render(
      <YourSekaiProvider sekaiTheme={sekaiTheme} options={{ disableStoreSekai: true, disableStoreTheme: true }}>
        <span>子要素</span>
      </YourSekaiProvider>,
    )
    expect(screen.getByText('子要素')).toBeInTheDocument()
  })

  it('sekaiTheme のコンテキスト値が子コンポーネントに提供される', () => {
    render(
      <YourSekaiProvider sekaiTheme={sekaiTheme}>
        <ContextConsumer />
      </YourSekaiProvider>,
    )
    expect(screen.getByTestId('sekai')).toHaveTextContent('Miku')
    expect(screen.getByTestId('mode')).toHaveTextContent('light')
    expect(screen.getByTestId('font')).toHaveTextContent(sekaiTheme.typography.fontFamily)
  })

  it('異なる sekai キーでコンテキスト値が正しく設定される', () => {
    const rinTheme = createSekai({ palette: { sekai: 'Rin', mode: 'dark' } })
    render(
      <YourSekaiProvider
        sekaiTheme={rinTheme}
        options={{ disableStoreSekai: true, disableStoreTheme: true }}>
        <ContextConsumer />
      </YourSekaiProvider>,
    )
    expect(screen.getByTestId('sekai')).toHaveTextContent('Rin')
    expect(screen.getByTestId('mode')).toHaveTextContent('dark')
  })
})
