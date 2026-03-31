import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { Toast } from '@/components/toast/Toast'

vi.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: () => ({
    sekaiColor: '#00CCBB',
    modeTheme: 'light',
    isLight: true,
  }),
}))

vi.mock('@/internal/usePortalContainer', () => ({
  usePortalContainer: () => document.body,
}))

describe('Toast', () => {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    message: 'Test message',
  }

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('正常系', () => {
    it('open=true でメッセージを表示する', () => {
      render(<Toast {...defaultProps} />)
      expect(screen.getByText('Test message')).toBeInTheDocument()
    })

    it('open=true で open クラスが適用される', () => {
      render(<Toast {...defaultProps} data-testid="toast" />)
      expect(screen.getByTestId('toast')).toHaveClass('sekai-toast-open')
    })

    it('open=false で open クラスが適用されない', () => {
      render(<Toast {...defaultProps} open={false} data-testid="toast" />)
      expect(screen.getByTestId('toast')).not.toHaveClass('sekai-toast-open')
    })

    it('message が配列の場合に全メッセージが表示される', () => {
      render(<Toast {...defaultProps} message={['Message 1', 'Message 2', 'Message 3']} />)
      expect(screen.getByText('Message 1')).toBeInTheDocument()
      expect(screen.getByText('Message 2')).toBeInTheDocument()
      expect(screen.getByText('Message 3')).toBeInTheDocument()
    })

    it('className プロパティがルート要素に適用される', () => {
      render(<Toast {...defaultProps} className="custom-class" data-testid="toast" />)
      expect(screen.getByTestId('toast')).toHaveClass('custom-class')
    })

    it('data-testid が転送される', () => {
      render(<Toast {...defaultProps} data-testid="my-toast" />)
      expect(screen.getByTestId('my-toast')).toBeInTheDocument()
    })

    it('デフォルトの pos="bottom" で対応するクラスが適用される', () => {
      render(<Toast {...defaultProps} data-testid="toast" />)
      expect(screen.getByTestId('toast')).toHaveClass('sekai-toast-bottom')
    })

    it('pos="top" で対応するクラスが適用される', () => {
      render(<Toast {...defaultProps} pos="top" data-testid="toast" />)
      expect(screen.getByTestId('toast')).toHaveClass('sekai-toast-top')
    })
  })

  describe('自動クローズ', () => {
    it('デフォルトの duration(3000ms) 経過後に onClose が呼び出される', () => {
      const handleClose = vi.fn()
      render(<Toast {...defaultProps} onClose={handleClose} />)

      expect(handleClose).not.toHaveBeenCalled()
      vi.advanceTimersByTime(3000)
      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('カスタム duration 経過後に onClose が呼び出される', () => {
      const handleClose = vi.fn()
      render(<Toast {...defaultProps} onClose={handleClose} duration={5000} />)

      vi.advanceTimersByTime(4999)
      expect(handleClose).not.toHaveBeenCalled()
      vi.advanceTimersByTime(1)
      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('open=false の場合はタイマーが設定されない', () => {
      const handleClose = vi.fn()
      render(<Toast {...defaultProps} open={false} onClose={handleClose} />)

      vi.advanceTimersByTime(5000)
      expect(handleClose).not.toHaveBeenCalled()
    })
  })

  describe('インタラクション', () => {
    it('閉じるボタンクリック時に onClose が呼び出される', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      const handleClose = vi.fn()
      render(<Toast {...defaultProps} onClose={handleClose} />)

      const closeButton = screen.getByRole('button')
      await user.click(closeButton)
      expect(handleClose).toHaveBeenCalledTimes(1)
    })
  })
})
