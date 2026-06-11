import React from 'react'
import { useState } from 'react'

import { ToggleButton } from '@/components/button/ToggleButton'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/ToggleButton',
  component: ToggleButton,
  decorators: [],
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    checked: {
      description: 'ON/OFF 状態',
      table: { type: { summary: 'boolean' } },
      control: { type: 'boolean' },
    },
    labelText: {
      description: 'サイドラベルテキスト',
      table: { type: { summary: 'string' } },
    },
    direction: {
      description: 'toggle の向き',
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' },
      },
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    labelPosition: {
      description: 'ラベルの位置',
      table: { type: { summary: "'left' | 'right' | 'top' | 'bottom'" } },
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
    },
    disabled: {
      description: '無効状態',
      table: { type: { summary: 'boolean' } },
      control: { type: 'boolean' },
    },
    sekai: {
      description: 'What SEKAI color to use',
      table: { type: { summary: 'ColorsSekaiKey' }, defaultValue: { summary: 'Miku' } },
      control: { type: 'select' },
      options: [...Object.keys(COLORS_SEKAI_KEYS)],
    },
    themeMode: {
      description: 'Light or Dark mode',
      table: { type: { summary: 'PaletteMode' }, defaultValue: { summary: 'light' } },
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
    id: {
      description: 'Unique Id',
      table: { type: { summary: 'string' } },
    },
    className: {
      description: 'Custom styles',
      table: { type: { summary: 'string' } },
      control: false,
    },
    style: {
      description: 'Style object',
      table: { type: { summary: 'React.CSSProperties' } },
      control: false,
    },
  },
  args: {
    checked: false,
    onChange: () => {},
  },
} satisfies Meta<typeof ToggleButton>

export default meta
type Story = StoryObj<typeof meta>

const ControlledTemplate = (args: React.ComponentProps<typeof ToggleButton>) => {
  const [checked, setChecked] = useState(args.checked)
  return <ToggleButton {...args} checked={checked} onChange={setChecked} />
}

export const DefaultLight: Story = {
  render: ControlledTemplate,
  args: {
    sekai: 'Miku',
    themeMode: 'light',
  },
  parameters: { sekai: 'Miku', background: 'light' },
}

export const DefaultDark: Story = {
  render: ControlledTemplate,
  args: {
    sekai: 'Miku',
    themeMode: 'dark',
  },
  parameters: { sekai: 'Miku', background: 'dark' },
}

export const WithLabel: Story = {
  render: ControlledTemplate,
  args: {
    sekai: 'Miku',
    themeMode: 'light',
    labelText: '通知を受け取る',
  },
}

export const LabelLeft: Story = {
  render: ControlledTemplate,
  args: {
    sekai: 'Ichika',
    themeMode: 'light',
    labelText: '設定項目',
    labelPosition: 'left',
  },
}

export const Vertical: Story = {
  render: ControlledTemplate,
  args: {
    sekai: 'Kohane',
    themeMode: 'light',
    direction: 'vertical',
    labelText: '縦向き',
  },
}

export const VerticalLabelTop: Story = {
  render: ControlledTemplate,
  args: {
    sekai: 'Rui',
    themeMode: 'light',
    direction: 'vertical',
    labelText: 'ラベル上',
    labelPosition: 'top',
  },
}

export const Disabled: Story = {
  render: ControlledTemplate,
  args: {
    sekai: 'Miku',
    themeMode: 'light',
    labelText: '無効状態',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  render: ControlledTemplate,
  args: {
    sekai: 'Miku',
    themeMode: 'light',
    labelText: '無効（ON）',
    checked: true,
    disabled: true,
  },
}
