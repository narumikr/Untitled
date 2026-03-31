import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { createSharedValueProvider } from '@/components/provider/SharedValueProvider'

const mockSetSharedValue = vi.fn()
const mockDeleteSharedValue = vi.fn()

vi.mock('@/hooks/useSessionStorage', () => ({
  useSessionStorage: <T,>(_key: string, defaultValue: T) => ({
    storedValue: defaultValue,
    setStoredValue: mockSetSharedValue,
    deleteSessionStorage: mockDeleteSharedValue,
  }),
}))

describe('createSharedValueProvider', () => {
  it('SharedValueProvider と useSharedValueContext を返す', () => {
    const { SharedValueProvider, useSharedValueContext } = createSharedValueProvider<string>()
    expect(SharedValueProvider).toBeDefined()
    expect(useSharedValueContext).toBeDefined()
    expect(typeof SharedValueProvider).toBe('function')
    expect(typeof useSharedValueContext).toBe('function')
  })

  it('defaultValue がコンテキスト経由で提供される', () => {
    const { SharedValueProvider, useSharedValueContext } = createSharedValueProvider<string>()

    const Consumer = () => {
      const { sharedValue } = useSharedValueContext()
      return <span data-testid="value">{sharedValue}</span>
    }

    render(
      <SharedValueProvider sessionStorageKey="test-key" defaultValue="hello">
        <Consumer />
      </SharedValueProvider>,
    )

    expect(screen.getByTestId('value')).toHaveTextContent('hello')
  })

  it('Provider 外で useSharedValueContext を使用した場合にエラーがスローされる', () => {
    const { useSharedValueContext } = createSharedValueProvider<number>()

    const BadConsumer = () => {
      useSharedValueContext()
      return null
    }

    // コンソールエラーを抑制
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<BadConsumer />)).toThrow(
      'useSharedValueContext must be used within a SharedValueProvider.',
    )

    spy.mockRestore()
  })
})
