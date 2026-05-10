import { PrskTips } from '@/components/dialog/PrskTips'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/PrskTips',
  component: PrskTips,
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
    open: {
      description: 'Whether the Tips is open or not',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    tipsText: {
      description: 'Content of the tips',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
    withOverlay: {
      description: 'Whether to show the overlay backdrop',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      control: 'boolean',
    },
    containerComponent: {
      description: 'Target element where the portal content will be rendered',
      table: {
        type: { summary: 'HTMLElement' },
        defaultValue: { summary: 'document.body' },
      },
      control: false,
    },
  },
  args: {},
} satisfies Meta<typeof PrskTips>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'prsk-tips-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    open: true,
    tipsText:
      'プロセカのTipsダイアログ風のコンポーネントです。小ネタなどを表示させたりするのに使ってください。',
    withOverlay: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'prsk-tips-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    open: true,
    tipsText:
      'プロセカのTipsダイアログ風のコンポーネントです。小ネタなどを表示させたりするのに使ってください。',
    withOverlay: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}
