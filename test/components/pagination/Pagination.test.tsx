import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Pagination } from '@/components/pagination/Pagination'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

vi.mock('@/img/arrow', () => ({
  ArrowSvg: (props: Record<string, unknown>) => (
    <svg data-testid="arrow-svg" data-vector={props.vector as string} />
  ),
}))

vi.mock('@/utils/converter', () => ({
  convertHexToRgba: () => 'rgba(0,204,187,0.2)',
}))

describe('Pagination', () => {
  const defaultProps = {
    totalPages: 10,
    onChangePage: vi.fn(),
  }

  describe('正常系', () => {
    it('ページ番号ボタンが表示される', () => {
      render(<Pagination {...defaultProps} />)
      // 0-indexed internally, displayed as 1-indexed
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    it('className プロパティが適用される', () => {
      const { container } = render(<Pagination {...defaultProps} className="custom-class" />)
      expect(container.firstChild).toHaveClass('custom-class')
    })

    it('data-testid が転送される', () => {
      render(<Pagination {...defaultProps} data-testid="my-pagination" />)
      expect(screen.getByTestId('my-pagination')).toBeInTheDocument()
    })

    it('前後の矢印ボタンが表示される', () => {
      render(<Pagination {...defaultProps} />)
      const arrows = screen.getAllByTestId('arrow-svg')
      expect(arrows).toHaveLength(2)
      expect(arrows[0]).toHaveAttribute('data-vector', 'left')
      expect(arrows[1]).toHaveAttribute('data-vector', 'right')
    })

    it('totalPages が少ない場合に省略記号なしで全ページが表示される', () => {
      render(<Pagination {...defaultProps} totalPages={5} />)
      for (let i = 1; i <= 5; i++) {
        expect(screen.getByText(String(i))).toBeInTheDocument()
      }
      expect(screen.queryByText('...')).not.toBeInTheDocument()
    })

    it('totalPages が多い場合に省略記号が表示される', () => {
      render(<Pagination {...defaultProps} totalPages={10} />)
      expect(screen.getByText('...')).toBeInTheDocument()
    })
  })

  describe('インタラクション', () => {
    it('ページ番号ボタンクリック時に onChangePage コールバックが呼び出される', async () => {
      const user = userEvent.setup()
      const onChangePage = vi.fn()
      render(<Pagination {...defaultProps} onChangePage={onChangePage} />)

      await user.click(screen.getByText('2'))
      // page index is 0-based: button "2" corresponds to index 1
      expect(onChangePage).toHaveBeenCalledWith(1)
    })

    it('次ページボタンクリック時に onChangePage が次のページで呼び出される', async () => {
      const user = userEvent.setup()
      const onChangePage = vi.fn()
      render(<Pagination {...defaultProps} page={0} onChangePage={onChangePage} />)

      const nextArrow = screen
        .getAllByTestId('arrow-svg')
        .find((a) => a.getAttribute('data-vector') === 'right')!
      await user.click(nextArrow.closest('button')!)

      expect(onChangePage).toHaveBeenCalledWith(1)
    })

    it('前ページボタンクリック時に onChangePage が前のページで呼び出される', async () => {
      const user = userEvent.setup()
      const onChangePage = vi.fn()
      render(<Pagination {...defaultProps} page={2} onChangePage={onChangePage} />)

      const prevArrow = screen
        .getAllByTestId('arrow-svg')
        .find((a) => a.getAttribute('data-vector') === 'left')!
      await user.click(prevArrow.closest('button')!)

      expect(onChangePage).toHaveBeenCalledWith(1)
    })

    it('最初のページで前ページボタンをクリックしても onChangePage が呼び出されない', async () => {
      const user = userEvent.setup()
      const onChangePage = vi.fn()
      render(<Pagination {...defaultProps} page={0} onChangePage={onChangePage} />)

      const prevArrow = screen
        .getAllByTestId('arrow-svg')
        .find((a) => a.getAttribute('data-vector') === 'left')!
      await user.click(prevArrow.closest('button')!)

      expect(onChangePage).not.toHaveBeenCalled()
    })
  })
})
