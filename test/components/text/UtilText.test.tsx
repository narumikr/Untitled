import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import {
  BodyText,
  SekaiBodyText,
  DetailText,
  SekaiDetailText,
  AnnotationText,
  SekaiAnnotationText,
} from '@/components/text/UtilText'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

describe('BodyText', () => {
  describe('正常系', () => {
    it('children を p 要素で表示する', () => {
      render(<BodyText>テスト本文</BodyText>)
      const el = screen.getByText('テスト本文')
      expect(el).toBeInTheDocument()
      expect(el.tagName).toBe('P')
    })

    it('className が適用される', () => {
      render(<BodyText className="custom-class">テスト</BodyText>)
      expect(screen.getByText('テスト')).toHaveClass('custom-class')
    })

    it('data-testid が転送される', () => {
      render(<BodyText data-testid="body-text">テスト</BodyText>)
      expect(screen.getByTestId('body-text')).toBeInTheDocument()
    })

    it('modeTheme に応じたクラス名が適用される', () => {
      render(<BodyText>テスト</BodyText>)
      expect(screen.getByText('テスト')).toHaveClass('sekai-body-text-light')
    })
  })
})

describe('SekaiBodyText', () => {
  describe('正常系', () => {
    it('children を p 要素で表示する', () => {
      render(<SekaiBodyText sekai="Miku">セカイ本文</SekaiBodyText>)
      const el = screen.getByText('セカイ本文')
      expect(el).toBeInTheDocument()
      expect(el.tagName).toBe('P')
    })

    it('sekai カラーをテキストカラーとして適用する', () => {
      render(<SekaiBodyText sekai="Miku">テスト</SekaiBodyText>)
      const el = screen.getByText('テスト')
      expect(el.style.color).toBe('rgb(0, 204, 187)')
    })

    it('className が適用される', () => {
      render(
        <SekaiBodyText sekai="Miku" className="sekai-class">
          テスト
        </SekaiBodyText>,
      )
      expect(screen.getByText('テスト')).toHaveClass('sekai-class')
    })

    it('data-testid が転送される', () => {
      render(
        <SekaiBodyText sekai="Miku" data-testid="sekai-body">
          テスト
        </SekaiBodyText>,
      )
      expect(screen.getByTestId('sekai-body')).toBeInTheDocument()
    })
  })
})

describe('DetailText', () => {
  describe('正常系', () => {
    it('children を p 要素で表示する', () => {
      render(<DetailText>詳細テキスト</DetailText>)
      const el = screen.getByText('詳細テキスト')
      expect(el).toBeInTheDocument()
      expect(el.tagName).toBe('P')
    })

    it('className が適用される', () => {
      render(<DetailText className="detail-class">テスト</DetailText>)
      expect(screen.getByText('テスト')).toHaveClass('detail-class')
    })

    it('data-testid が転送される', () => {
      render(<DetailText data-testid="detail-text">テスト</DetailText>)
      expect(screen.getByTestId('detail-text')).toBeInTheDocument()
    })

    it('modeTheme に応じたクラス名が適用される', () => {
      render(<DetailText>テスト</DetailText>)
      expect(screen.getByText('テスト')).toHaveClass('sekai-detail-text-light')
    })
  })
})

describe('SekaiDetailText', () => {
  describe('正常系', () => {
    it('sekai カラーをテキストカラーとして適用する', () => {
      render(<SekaiDetailText sekai="Miku">テスト</SekaiDetailText>)
      const el = screen.getByText('テスト')
      expect(el.style.color).toBe('rgb(0, 204, 187)')
    })
  })
})

describe('AnnotationText', () => {
  describe('正常系', () => {
    it('children を表示する', () => {
      render(<AnnotationText>注釈テキスト</AnnotationText>)
      expect(screen.getByText('注釈テキスト')).toBeInTheDocument()
    })

    it('className が適用される', () => {
      render(<AnnotationText className="annotation-class">テスト</AnnotationText>)
      expect(screen.getByText('テスト')).toHaveClass('annotation-class')
    })

    it('data-testid が転送される', () => {
      render(<AnnotationText data-testid="annotation">テスト</AnnotationText>)
      expect(screen.getByTestId('annotation')).toBeInTheDocument()
    })

    it('modeTheme に応じたクラス名が適用される', () => {
      render(<AnnotationText>テスト</AnnotationText>)
      expect(screen.getByText('テスト')).toHaveClass('sekai-annotation-text-light')
    })
  })
})

describe('SekaiAnnotationText', () => {
  describe('正常系', () => {
    it('children を表示する', () => {
      render(<SekaiAnnotationText sekai="Miku">セカイ注釈</SekaiAnnotationText>)
      expect(screen.getByText('セカイ注釈')).toBeInTheDocument()
    })

    it('sekai カラーに基づいたテキストカラーが適用される', () => {
      render(<SekaiAnnotationText sekai="Miku">テスト</SekaiAnnotationText>)
      const el = screen.getByText('テスト')
      expect(el.style.color).toBe('rgb(128, 230, 221)')
    })

    it('className が適用される', () => {
      render(
        <SekaiAnnotationText sekai="Miku" className="sekai-annotation">
          テスト
        </SekaiAnnotationText>,
      )
      expect(screen.getByText('テスト')).toHaveClass('sekai-annotation')
    })

    it('data-testid が転送される', () => {
      render(
        <SekaiAnnotationText sekai="Miku" data-testid="sekai-annotation">
          テスト
        </SekaiAnnotationText>,
      )
      expect(screen.getByTestId('sekai-annotation')).toBeInTheDocument()
    })
  })
})
