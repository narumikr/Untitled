import React from 'react'

import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Carousel } from '@/components/carousel/Carousel'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

vi.mock('swiper/css', () => ({}))
vi.mock('swiper/css/pagination', () => ({}))
vi.mock('swiper/css/navigation', () => ({}))
vi.mock('swiper/modules', () => ({
  Autoplay: 'Autoplay',
  Pagination: 'Pagination',
}))
vi.mock('swiper/react', () => ({
  Swiper: ({
    children,
    className,
    style,
  }: React.PropsWithChildren<{ className?: string; style?: React.CSSProperties }>) => (
    <div data-testid="swiper" className={className} style={style}>
      {children}
    </div>
  ),
  SwiperSlide: ({ children }: React.PropsWithChildren) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}))

describe('Carousel', () => {
  describe('正常系', () => {
    it('children を SwiperSlide でラップしてレンダリングする', () => {
      render(
        <Carousel>
          <div>スライド1</div>
          <div>スライド2</div>
          <div>スライド3</div>
        </Carousel>,
      )

      expect(screen.getByTestId('swiper')).toBeInTheDocument()
      const slides = screen.getAllByTestId('swiper-slide')
      expect(slides).toHaveLength(3)
      expect(screen.getByText('スライド1')).toBeInTheDocument()
      expect(screen.getByText('スライド2')).toBeInTheDocument()
      expect(screen.getByText('スライド3')).toBeInTheDocument()
    })

    it('className が Swiper に適用される', () => {
      render(
        <Carousel className="custom-carousel">
          <div>スライド</div>
        </Carousel>,
      )

      expect(screen.getByTestId('swiper')).toHaveClass('custom-carousel')
    })

    it('sekai プロパティで CSS 変数が設定される', () => {
      render(
        <Carousel sekai="Miku">
          <div>スライド</div>
        </Carousel>,
      )

      const swiper = screen.getByTestId('swiper')
      expect(swiper.style.getPropertyValue('--sekai-color')).toBe('#00CCBB')
    })
  })
})
