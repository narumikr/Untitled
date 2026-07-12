import React from 'react'

import { useArgs } from 'storybook/preview-api'
import { fn } from 'storybook/test'

import { Tab, TabPanel } from '@/components/tab/Tab'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { TabProps } from '@/types/components/tab/Tab.types'
import type { Meta, StoryObj } from '@storybook/react-vite'

const youtubeSvg = new URL('../assets/youtube.svg', import.meta.url).href
const discordSvg = new URL('../assets/discord.svg', import.meta.url).href
const githubSvg = new URL('../assets/github.svg', import.meta.url).href

const sampleTabList = [{ label: 'HOME' }, { label: 'MUSIC' }, { label: 'PROFILE' }]

const sampleIconTabList = [
  { label: 'Nightcode', icon: <img src={discordSvg} alt="Nightcode" /> },
  { label: 'PLAY TUBING', icon: <img src={youtubeSvg} alt="PLAY TUBING" /> },
  { label: 'GitHub', icon: <img src={githubSvg} alt="GitHub" /> },
]

const ControlledTab = (args: TabProps) => {
  const [{ currentTab }, updateArgs] = useArgs<TabProps>()
  return (
    <Tab
      {...args}
      currentTab={currentTab ?? 0}
      onChange={(next) => {
        updateArgs({ currentTab: next })
        args.onChange?.(next)
      }}
    />
  )
}

const ControlledTabWithPanel = (args: TabProps) => {
  const [{ currentTab }, updateArgs] = useArgs<TabProps>()
  const activeTab = currentTab ?? 0
  return (
    <div style={{ width: 480 }}>
      <Tab
        {...args}
        currentTab={activeTab}
        onChange={(next) => {
          updateArgs({ currentTab: next })
          args.onChange?.(next)
        }}
      />
      {args.tabList.map((tab, index) => (
        <TabPanel key={`${tab.label}-${index}`} tabIndex={index} currentTab={activeTab}>
          <div style={{ padding: 16 }}>
            <p style={{ margin: 0 }}>{`${tab.label} panel contents`}</p>
          </div>
        </TabPanel>
      ))}
    </div>
  )
}

const meta = {
  title: 'UI/Tab',
  component: Tab,
  decorators: [],
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
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
    tabList: {
      description: 'List of tabs to render',
      table: { type: { summary: 'TabItem[]' } },
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      control: false,
    },
    currentTab: {
      description: 'Index of the currently selected tab',
      table: { type: { summary: 'number' } },
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      control: { type: 'number' },
    },
    onChange: {
      description: 'Callback fired when the active tab changes',
      table: { type: { summary: '(value: number) => void' } },
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      control: false,
    },
    variant: {
      description: 'Visual variant of the tab',
      table: {
        type: { summary: "'underline' | 'sticky-note'" },
        defaultValue: { summary: 'underline' },
      },
      control: { type: 'select' },
      options: ['underline', 'sticky-note'],
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Tab>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'tab-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    tabList: sampleTabList,
    currentTab: 0,
    variant: 'underline',
  },
  parameters: { sekai: 'Miku', background: 'light' },
  render: ControlledTab,
}

export const DefaultDark: Story = {
  args: {
    id: 'tab-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    tabList: sampleTabList,
    currentTab: 0,
    variant: 'underline',
  },
  parameters: { sekai: 'Miku', background: 'dark' },
  render: ControlledTab,
}

export const StickyNoteLight: Story = {
  args: {
    id: 'tab-sticky-note-light',
    sekai: 'Miku',
    themeMode: 'light',
    tabList: sampleTabList,
    currentTab: 0,
    variant: 'sticky-note',
  },
  parameters: { sekai: 'Miku', background: 'light' },
  render: ControlledTab,
}

export const StickyNoteDark: Story = {
  args: {
    id: 'tab-sticky-note-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    tabList: sampleTabList,
    currentTab: 0,
    variant: 'sticky-note',
  },
  parameters: { sekai: 'Miku', background: 'dark' },
  render: ControlledTab,
}

export const WithIcons: Story = {
  args: {
    id: 'tab-with-icons',
    sekai: 'Miku',
    themeMode: 'light',
    tabList: sampleIconTabList,
    currentTab: 0,
    variant: 'underline',
  },
  parameters: { sekai: 'Miku', background: 'light' },
  render: ControlledTab,
}

export const WithTabPanel: Story = {
  args: {
    id: 'tab-with-panel',
    sekai: 'Miku',
    themeMode: 'light',
    tabList: sampleTabList,
    currentTab: 0,
    variant: 'underline',
  },
  parameters: { sekai: 'Miku', background: 'light' },
  render: ControlledTabWithPanel,
}
