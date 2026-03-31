import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Tooltip } from '@/components/tooltip/Tooltip'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

vi.mock('@/utils/converter', () => ({
  convertHexToRgbaMixWithBlackOrWhite: () => 'rgba(0,0,0,0.2)',
}))

describe('Tooltip', () => {
  const defaultProps = {
    text: 'ツールチップテキスト',
    children: <span>ホバー対象</span>,
  }

  describe('正常系', () => {
    it('children が表示される', () => {
      render(<Tooltip {...defaultProps} />)
      expect(screen.getByText('ホバー対象')).toBeInTheDocument()
    })

    it('初期状態ではツールチップテキストが表示されない', () => {
      render(<Tooltip {...defaultProps} />)
      expect(screen.queryByText('ツールチップテキスト')).not.toBeInTheDocument()
    })

    it('className プロパティが適用される', () => {
      const { container } = render(<Tooltip {...defaultProps} className="custom-class" />)
      expect(container.firstChild).toHaveClass('custom-class')
    })

    it('data-testid が転送される', () => {
      render(<Tooltip {...defaultProps} data-testid="my-tooltip" />)
      expect(screen.getByTestId('my-tooltip')).toBeInTheDocument()
    })
  })

  describe('ホバー動作', () => {
    it('マウスホバー時にツールチップテキストが表示される', async () => {
      const user = userEvent.setup()
      render(<Tooltip {...defaultProps} data-testid="tooltip-wrapper" />)

      await user.hover(screen.getByTestId('tooltip-wrapper'))
      expect(screen.getByText('ツールチップテキスト')).toBeInTheDocument()
    })

    it('マウスが離れた場合にツールチップテキストが非表示になる', async () => {
      const user = userEvent.setup()
      render(<Tooltip {...defaultProps} data-testid="tooltip-wrapper" />)

      await user.hover(screen.getByTestId('tooltip-wrapper'))
      expect(screen.getByText('ツールチップテキスト')).toBeInTheDocument()

      await user.unhover(screen.getByTestId('tooltip-wrapper'))
      expect(screen.queryByText('ツールチップテキスト')).not.toBeInTheDocument()
    })
  })
})
