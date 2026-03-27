import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Card, CardContent, CardTitle } from '@/components/card/Card'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('Card', () => {
  describe('正常系', () => {
    it('children を含めてレンダリングされる', () => {
      render(<Card>カードコンテンツ</Card>)
      expect(screen.getByText('カードコンテンツ')).toBeInTheDocument()
    })

    it('className プロパティが適用される', () => {
      render(
        <Card className="custom-class" data-testid="card">
          テスト
        </Card>,
      )
      expect(screen.getByTestId('card')).toHaveClass('custom-class')
    })

    it('data-testid が転送される', () => {
      render(<Card data-testid="my-card">テスト</Card>)
      expect(screen.getByTestId('my-card')).toBeInTheDocument()
    })

    it('sekai プロパティで CSS 変数が設定される', () => {
      render(
        <Card sekai="Miku" data-testid="card">
          テスト
        </Card>,
      )
      const card = screen.getByTestId('card')
      expect(card.style.getPropertyValue('--sekai-color')).toBe('#00CCBB')
    })
  })
})

describe('CardContent', () => {
  describe('正常系', () => {
    it('children を含めてレンダリングされる', () => {
      render(<CardContent>コンテンツ内容</CardContent>)
      expect(screen.getByText('コンテンツ内容')).toBeInTheDocument()
    })

    it('className プロパティが適用される', () => {
      render(
        <CardContent className="custom-content" id="card-content">
          テスト
        </CardContent>,
      )
      expect(document.getElementById('card-content')).toHaveClass('custom-content')
    })
  })
})

describe('CardTitle', () => {
  describe('正常系', () => {
    it('title プロパティのテキストを表示する', () => {
      render(<CardTitle title="タイトルテスト" />)
      expect(screen.getByRole('heading', { name: 'タイトルテスト' })).toBeInTheDocument()
    })

    it('デフォルトでアンダーラインクラスが適用される', () => {
      render(<CardTitle title="タイトル" />)
      const heading = screen.getByRole('heading')
      expect(heading).toHaveClass('sekai-underline')
    })

    it('underline=false でアンダーラインクラスが適用されない', () => {
      render(<CardTitle title="タイトル" underline={false} />)
      const heading = screen.getByRole('heading')
      expect(heading).not.toHaveClass('sekai-underline')
    })

    it('className プロパティが適用される', () => {
      render(<CardTitle title="タイトル" className="custom-title" />)
      const heading = screen.getByRole('heading')
      expect(heading).toHaveClass('custom-title')
    })

    it('data-testid が転送される', () => {
      render(<CardTitle title="タイトル" data-testid="card-title" />)
      expect(screen.getByTestId('card-title')).toBeInTheDocument()
    })
  })
})
