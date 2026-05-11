import React from 'react'

import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'

import { createSharedValueProvider } from '@/components/provider/SharedValueProvider'

describe('createSharedValueProvider - SharedValueProvider', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('children をレンダリングする', () => {
    // Arrange
    const { SharedValueProvider } = createSharedValueProvider<string>()

    // Act
    render(
      <SharedValueProvider sessionStorageKey="test-key" defaultValue="hello">
        <span>子要素</span>
      </SharedValueProvider>,
    )

    // Assert
    expect(screen.getByText('子要素')).toBeInTheDocument()
  })

  it('defaultValue がコンテキストの初期値として提供される', () => {
    // Arrange
    const { SharedValueProvider, useSharedValueContext } = createSharedValueProvider<string>()

    const Consumer = () => {
      const { sharedValue } = useSharedValueContext()
      return <span data-testid="value">{sharedValue}</span>
    }

    // Act
    render(
      <SharedValueProvider sessionStorageKey="test-key" defaultValue="初期値">
        <Consumer />
      </SharedValueProvider>,
    )

    // Assert
    expect(screen.getByTestId('value')).toHaveTextContent('初期値')
  })

  it('数値型の defaultValue が正しく提供される', () => {
    // Arrange
    const { SharedValueProvider, useSharedValueContext } = createSharedValueProvider<number>()

    const Consumer = () => {
      const { sharedValue } = useSharedValueContext()
      return <span data-testid="value">{sharedValue}</span>
    }

    // Act
    render(
      <SharedValueProvider sessionStorageKey="num-key" defaultValue={42}>
        <Consumer />
      </SharedValueProvider>,
    )

    // Assert
    expect(screen.getByTestId('value')).toHaveTextContent('42')
  })

  it('オブジェクト型の defaultValue が正しく提供される', () => {
    // Arrange
    type User = { name: string; age: number }
    const { SharedValueProvider, useSharedValueContext } = createSharedValueProvider<User>()

    const Consumer = () => {
      const { sharedValue } = useSharedValueContext()
      return (
        <div>
          <span data-testid="name">{sharedValue.name}</span>
          <span data-testid="age">{sharedValue.age}</span>
        </div>
      )
    }

    // Act
    render(
      <SharedValueProvider
        sessionStorageKey="user-key"
        defaultValue={{ name: 'テストユーザー', age: 20 }}>
        <Consumer />
      </SharedValueProvider>,
    )

    // Assert
    expect(screen.getByTestId('name')).toHaveTextContent('テストユーザー')
    expect(screen.getByTestId('age')).toHaveTextContent('20')
  })
})

describe('createSharedValueProvider - setSharedValue', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('値を更新するとコンテキストの値が変わる', () => {
    // Arrange
    const { SharedValueProvider, useSharedValueContext } = createSharedValueProvider<string>()

    const Consumer = () => {
      const { sharedValue, setSharedValue } = useSharedValueContext()
      return (
        <div>
          <span data-testid="value">{sharedValue}</span>
          <button onClick={() => setSharedValue('更新後の値')}>更新</button>
        </div>
      )
    }

    render(
      <SharedValueProvider sessionStorageKey="test-key" defaultValue="初期値">
        <Consumer />
      </SharedValueProvider>,
    )
    expect(screen.getByTestId('value')).toHaveTextContent('初期値')

    // Act
    act(() => {
      screen.getByRole('button', { name: '更新' }).click()
    })

    // Assert
    expect(screen.getByTestId('value')).toHaveTextContent('更新後の値')
  })

  it('更新した値が sessionStorage に保存される', () => {
    // Arrange
    const { SharedValueProvider, useSharedValueContext } = createSharedValueProvider<string>()

    const Consumer = () => {
      const { setSharedValue } = useSharedValueContext()
      return <button onClick={() => setSharedValue('保存される値')}>保存</button>
    }

    render(
      <SharedValueProvider sessionStorageKey="save-key" defaultValue="">
        <Consumer />
      </SharedValueProvider>,
    )

    // Act
    act(() => {
      screen.getByRole('button', { name: '保存' }).click()
    })

    // Assert
    expect(JSON.parse(sessionStorage.getItem('save-key')!)).toBe('保存される値')
  })
})

describe('createSharedValueProvider - deleteSharedValue', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('削除後に defaultValue にリセットされる', () => {
    // Arrange
    const { SharedValueProvider, useSharedValueContext } = createSharedValueProvider<string>()

    const Consumer = () => {
      const { sharedValue, setSharedValue, deleteSharedValue } = useSharedValueContext()
      return (
        <div>
          <span data-testid="value">{sharedValue}</span>
          <button onClick={() => setSharedValue('更新値')}>更新</button>
          <button onClick={() => deleteSharedValue()}>削除</button>
        </div>
      )
    }

    render(
      <SharedValueProvider sessionStorageKey="delete-key" defaultValue="デフォルト">
        <Consumer />
      </SharedValueProvider>,
    )

    act(() => {
      screen.getByRole('button', { name: '更新' }).click()
    })
    expect(screen.getByTestId('value')).toHaveTextContent('更新値')

    // Act
    act(() => {
      screen.getByRole('button', { name: '削除' }).click()
    })

    // Assert
    expect(screen.getByTestId('value')).toHaveTextContent('デフォルト')
  })

  it('削除後に sessionStorage の値が defaultValue にリセットされる', () => {
    // Arrange
    const { SharedValueProvider, useSharedValueContext } = createSharedValueProvider<string>()

    const Consumer = () => {
      const { setSharedValue, deleteSharedValue } = useSharedValueContext()
      return (
        <div>
          <button onClick={() => setSharedValue('値')}>更新</button>
          <button onClick={() => deleteSharedValue()}>削除</button>
        </div>
      )
    }

    render(
      <SharedValueProvider sessionStorageKey="cleanup-key" defaultValue="デフォルト">
        <Consumer />
      </SharedValueProvider>,
    )

    act(() => {
      screen.getByRole('button', { name: '更新' }).click()
    })
    expect(JSON.parse(sessionStorage.getItem('cleanup-key')!)).toBe('値')

    // Act
    act(() => {
      screen.getByRole('button', { name: '削除' }).click()
    })

    // Assert: useSessionStorage の仕様上、削除後に書き込み effect が defaultValue を再保存する
    expect(JSON.parse(sessionStorage.getItem('cleanup-key')!)).toBe('デフォルト')
  })
})

describe('createSharedValueProvider - useSharedValueContext', () => {
  it('Provider 外で使用するとエラーをスローする', () => {
    // Arrange
    const { useSharedValueContext } = createSharedValueProvider<string>()

    const BrokenConsumer = () => {
      useSharedValueContext()
      return null
    }

    // Act & Assert
    expect(() => render(<BrokenConsumer />)).toThrow(
      'useSharedValueContext must be used within a SharedValueProvider.',
    )
  })
})

describe('createSharedValueProvider - 複数インスタンスの独立性', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('異なる createSharedValueProvider で生成したインスタンスは独立して動作する', () => {
    // Arrange
    const providerA = createSharedValueProvider<string>()
    const providerB = createSharedValueProvider<number>()

    const ConsumerA = () => {
      const { sharedValue } = providerA.useSharedValueContext()
      return <span data-testid="value-a">{sharedValue}</span>
    }

    const ConsumerB = () => {
      const { sharedValue } = providerB.useSharedValueContext()
      return <span data-testid="value-b">{sharedValue}</span>
    }

    // Act
    render(
      <providerA.SharedValueProvider sessionStorageKey="key-a" defaultValue="テキスト">
        <providerB.SharedValueProvider sessionStorageKey="key-b" defaultValue={99}>
          <ConsumerA />
          <ConsumerB />
        </providerB.SharedValueProvider>
      </providerA.SharedValueProvider>,
    )

    // Assert
    expect(screen.getByTestId('value-a')).toHaveTextContent('テキスト')
    expect(screen.getByTestId('value-b')).toHaveTextContent('99')
  })
})
