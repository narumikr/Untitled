import { Slider } from '@/components/slider/Slider'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/Slider',
  component: Slider,
  decorators: [],
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
    ref: {
      description: 'Ref to the root element',
      table: {
        type: { summary: 'React.Ref<HTMLDivElement>' },
      },
      control: false,
    }
  },
  args: {},
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'slider-default-light',
    sekai: 'Miku',
    themeMode: 'light',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  }
}

export const DefaultDark: Story = {
  args: {
    id: 'slider-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  }
}