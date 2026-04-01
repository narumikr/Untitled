import { render, screen, fireEvent } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, describe, it, expect, vi } from 'vitest'

import { MusicBannerCard } from '@/components/card/MusicBannerCard'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

const mockObserve = vi.fn()

describe('MusicBannerCard', () => {
  const originalResizeObserver = globalThis.ResizeObserver

  beforeAll(() => {
    globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: mockObserve,
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
  })

  afterAll(() => {
    globalThis.ResizeObserver = originalResizeObserver
  })

  afterEach(() => {
    mockObserve.mockClear()
  })

  const defaultProps = {
    musicTitle: 'テスト楽曲',
    artist: 'テストアーティスト',
  }

  describe('正常系', () => {
    it('musicTitle と artist を表示する', () => {
      render(<MusicBannerCard {...defaultProps} />)
      expect(screen.getByText('テスト楽曲')).toBeInTheDocument()
      expect(screen.getByText('テストアーティスト')).toBeInTheDocument()
    })

    it('role="button" でレンダリングされる', () => {
      render(<MusicBannerCard {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('フォーカス時に選択状態のスタイルが適用される', () => {
      render(<MusicBannerCard {...defaultProps} data-testid="music-card" />)
      const card = screen.getByTestId('music-card')

      fireEvent.focus(card)

      expect(card).toHaveClass('sekai-music-card-selected')
    })

    it('マウスエンター時に選択状態のスタイルが適用される', () => {
      render(<MusicBannerCard {...defaultProps} data-testid="music-card" />)
      const card = screen.getByTestId('music-card')

      fireEvent.mouseEnter(card)

      expect(card).toHaveClass('sekai-music-card-selected')
    })

    it('フォーカス時に onSelect が true で呼び出される', () => {
      const onSelect = vi.fn()
      render(<MusicBannerCard {...defaultProps} onSelect={onSelect} data-testid="music-card" />)

      fireEvent.focus(screen.getByTestId('music-card'))

      expect(onSelect).toHaveBeenCalledWith(true)
    })

    it('selected=true で初期状態から選択スタイルが適用される', () => {
      render(<MusicBannerCard {...defaultProps} selected={true} data-testid="music-card" />)
      expect(screen.getByTestId('music-card')).toHaveClass('sekai-music-card-selected')
    })

    it('className が転送される', () => {
      render(<MusicBannerCard {...defaultProps} className="custom" data-testid="music-card" />)
      expect(screen.getByTestId('music-card')).toHaveClass('custom')
    })

    it('variants="view-all" でアーティストの選択スタイルが適用される', () => {
      render(
        <MusicBannerCard {...defaultProps} variants="view-all" data-testid="music-card" />,
      )
      // view-all バリアントでは selected=false でもアーティスト行に選択スタイルが適用される
      const artistEl = screen.getByText('テストアーティスト').closest('[class*="sekai-music-card-detail-artist"]')
      expect(artistEl).toHaveClass('sekai-music-card-detail-artist-selected')
    })
  })
})
