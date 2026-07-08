import React, { useState } from 'react'

import { fn } from 'storybook/test'

import { Tab, TabPanel } from '@/components/tab/Tab'

import { CompactDiscIcon } from '@/img/compactDisc'
import { LightBulbSvg } from '@/img/lightBulb'
import { ProfileSvg } from '@/img/profile'
import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { TabProps } from '@/types/components/tab/Tab.types'
import type { Meta, StoryObj } from '@storybook/react-vite'

const sampleTabList = [
  { label: 'HOME' },
  { label: 'MUSIC' },
  { label: 'PROFILE' },
]

const iconTabList = [
  { label: 'HOME', icon: <LightBulbSvg /> },
  { label: 'MUSIC', icon: <CompactDiscIcon /> },
  { label: 'PROFILE', icon: <ProfileSvg /> },
]

const ControlledTab = (args: TabProps) => {
  const [currentTab, setCurrentTab] = useState(args.currentTab ?? 0)
  return (
    <Tab
      {...args}
      currentTab={currentTab}
      onChange={(next) => {
        setCurrentTab(next)
        args.onChange?.(next)
      }}
    />
  )
}

const ControlledTabWithPanel = (args: TabProps) => {
  const [currentTab, setCurrentTab] = useState(args.currentTab ?? 0)
  return (
    <div style={{ width: 480 }}>
      <Tab
        {...args}
        currentTab={currentTab}
        onChange={(next) => {
          setCurrentTab(next)
          args.onChange?.(next)
        }}
      />
      {args.tabList.map((tab, index) => (
        <TabPanel key={tab.label} tabIndex={index} currentTab={currentTab}>
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
  render: (args) => <ControlledTab {...args} />,
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
  render: (args) => <ControlledTab {...args} />,
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
  render: (args) => <ControlledTab {...args} />,
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
  render: (args) => <ControlledTab {...args} />,
}

export const WithIcons: Story = {
  args: {
    id: 'tab-with-icons',
    sekai: 'Miku',
    themeMode: 'light',
    tabList: iconTabList,
    currentTab: 0,
    variant: 'underline',
  },
  parameters: { sekai: 'Miku', background: 'light' },
  render: (args) => <ControlledTab {...args} />,
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
  render: (args) => <ControlledTabWithPanel {...args} />,
}
