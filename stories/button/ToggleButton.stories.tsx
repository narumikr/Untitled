import { fn } from 'storybook/test'

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
    checked: {
      description: 'Controls whether the toggle button is checked',
      table: { type: { summary: 'boolean' } },
      control: { type: 'boolean' },
    },
    onChange: {
      description: 'Callback fired when the toggle button state changes',
      table: { type: { summary: '(checked: boolean) => void' } },
      control: false,
    },
    labelText: {
      description: 'Label text to display',
      table: { type: { summary: 'string' } },
    },
    direction: {
      description: 'Toggle direction',
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' },
      },
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    labelPosition: {
      description: 'Label position',
      table: { type: { summary: "'left' | 'right' | 'top' | 'bottom'" } },
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
    },
    disabled: {
      description: 'Controls whether the toggle button is disabled',
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
} satisfies Meta<typeof ToggleButton>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'toggle-button-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    checked: true,
    labelText: '',
    direction: 'horizontal',
    labelPosition: 'right',
    disabled: false,
  },
  parameters: { sekai: 'Miku', background: 'light' },
}

export const DefaultDark: Story = {
  args: {
    id: 'toggle-button-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    checked: true,
    labelText: '',
    direction: 'horizontal',
    labelPosition: 'right',
    disabled: false,
  },
  parameters: { sekai: 'Miku', background: 'dark' },
}

export const WithLabel: Story = {
  args: {
    id: 'toggle-button-with-label',
    sekai: 'Miku',
    themeMode: 'light',
    checked: true,
    labelText: 'AUTO',
    direction: 'horizontal',
    labelPosition: 'right',
    disabled: false,
  },
}

export const LabelLeft: Story = {
  args: {
    id: 'toggle-button-label-left',
    sekai: 'Miku',
    themeMode: 'light',
    checked: true,
    labelText: 'AUTO',
    direction: 'horizontal',
    labelPosition: 'left',
    disabled: false,
  },
}

export const Vertical: Story = {
  args: {
    id: 'toggle-button-vertical',
    sekai: 'Miku',
    themeMode: 'light',
    checked: true,
    direction: 'vertical',
    labelPosition: 'bottom',
    labelText: 'AUTO',
    disabled: false,
  },
}

export const VerticalLabelTop: Story = {
  args: {
    id: 'toggle-button-vertical-label-top',
    sekai: 'Miku',
    themeMode: 'light',
    checked: true,
    labelText: 'AUTO',
    direction: 'vertical',
    labelPosition: 'top',
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    sekai: 'Miku',
    themeMode: 'light',
    checked: false,
    labelText: '無効状態',
    direction: 'horizontal',
    labelPosition: 'right',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    sekai: 'Miku',
    themeMode: 'light',
    checked: true,
    labelText: '無効状態',
    direction: 'horizontal',
    labelPosition: 'right',
    disabled: true,
  },
}
