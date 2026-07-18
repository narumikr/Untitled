import React from 'react'

import { fn } from 'storybook/test'

import { Slider } from '@/components/slider/Slider'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/Slider',
  component: Slider,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', width: 500, maxWidth: '80vw', height: 150 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: 'Unique Id',
      table: {
        type: { summary: 'string' },
      },
    },
    className: {
      description: 'Custom styles',
      table: {
        type: { summary: 'string' },
      },
      control: false,
    },
    style: {
      description: 'Style object',
      table: {
        type: { summary: 'React.CSSProperties' },
      },
      control: false,
    },
    sekai: {
      description: 'What SEKAI color to use',
      table: {
        type: { summary: 'ColorsSekaiKey' },
        defaultValue: { summary: 'Miku' },
      },
      control: { type: 'select' },
      options: [...Object.keys(COLORS_SEKAI_KEYS)],
    },
    themeMode: {
      description: 'Light or Dark mode',
      table: {
        type: { summary: 'PaletteMode' },
        defaultValue: { summary: 'light' },
      },
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
    value: {
      description: 'Slider value',
      table: { type: { summary: 'number' } },
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      control: { type: 'number' },
    },
    defaultValue: {
      description: 'Slider default value',
      table: { type: { summary: 'number' } },
      control: { type: 'number' },
    },
    min: {
      description: 'Slider minimum value',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
      control: { type: 'number' },
    },
    max: {
      description: 'Slider maximum value',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
      control: { type: 'number' },
    },
    step: {
      description: 'Slider step value',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
      control: { type: 'number' },
    },
    onChange: {
      description: 'Callback fired when the slider value changes',
      table: { type: { summary: '(value: number) => void' } },
      control: false,
    },
    disabled: {
      description: 'Whether the slider is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    orientation: {
      description: 'Slider orientation',
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' },
      },
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    showValue: {
      description: 'Whether to display the slider value',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'slider-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    value: 40,
    defaultValue: 40,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    orientation: 'horizontal',
    showValue: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'slider-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    value: 40,
    defaultValue: 40,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    orientation: 'horizontal',
    showValue: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const ShowValue: Story = {
  args: {
    id: 'slider-show-value',
    sekai: 'Miku',
    themeMode: 'light',
    value: 60,
    defaultValue: 60,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    orientation: 'horizontal',
    showValue: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const CustomRange: Story = {
  args: {
    id: 'slider-custom-range',
    sekai: 'Miku',
    themeMode: 'light',
    value: 500,
    defaultValue: 500,
    min: 0,
    max: 1000,
    step: 50,
    disabled: false,
    orientation: 'horizontal',
    showValue: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const Vertical: Story = {
  args: {
    id: 'slider-vertical',
    sekai: 'Miku',
    themeMode: 'light',
    value: 50,
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    orientation: 'vertical',
    showValue: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const VerticalShowValue: Story = {
  args: {
    id: 'slider-vertical-show-value',
    sekai: 'Miku',
    themeMode: 'light',
    value: 30,
    defaultValue: 30,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    orientation: 'vertical',
    showValue: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const Disabled: Story = {
  args: {
    id: 'slider-disabled',
    sekai: 'Miku',
    themeMode: 'light',
    value: 40,
    defaultValue: 40,
    min: 0,
    max: 100,
    step: 1,
    disabled: true,
    orientation: 'horizontal',
    showValue: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}
