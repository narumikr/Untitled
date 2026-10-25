import React from 'react'

import { PrskLoadingDialog } from '@/components/dialog/PrskLoadingDialog'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const sampleImage = new URL('../assets/theming.png', import.meta.url).href
const backgroundText = 'プロジェクトセカイ カラフルステージ！ feat. 初音ミク '.repeat(40)

const meta = {
  title: 'UI/PrskLoadingDialog',
  component: PrskLoadingDialog,
  decorators: [
    // Page content behind the dialog to check its translucency and blur
    (Story) => (
      <div style={{ width: 640, lineHeight: 1.8 }}>
        <p>{backgroundText}</p>
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
    open: {
      description: 'Open state of the dialog',
      table: {
        type: { summary: 'boolean' },
      },
      control: 'boolean',
    },
    title: {
      description: 'Title of the dialog',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
    imageSrc: {
      description: 'Source URL of the image',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
    imageAlt: {
      description: 'Alternative text of the image',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
      control: 'text',
    },
    withOverlay: {
      description: 'Whether to show the overlay backdrop',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
} satisfies Meta<typeof PrskLoadingDialog>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'prsk-loading-dialog-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    open: true,
    title: '特訓・超えるために',
    imageSrc: sampleImage,
    imageAlt: 'sample illustration',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'prsk-loading-dialog-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    open: true,
    title: '特訓・超えるために',
    imageSrc: sampleImage,
    imageAlt: 'sample illustration',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}

export const WithOverlayLight: Story = {
  args: {
    id: 'prsk-loading-dialog-with-overlay-light',
    sekai: 'Miku',
    themeMode: 'light',
    open: true,
    title: '特訓・超えるために',
    imageSrc: sampleImage,
    imageAlt: 'sample illustration',
    withOverlay: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const WithOverlayDark: Story = {
  args: {
    id: 'prsk-loading-dialog-with-overlay-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    open: true,
    title: '特訓・超えるために',
    imageSrc: sampleImage,
    imageAlt: 'sample illustration',
    withOverlay: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}
