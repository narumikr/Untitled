import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Tab, TabPanel } from '@/components/tab/Tab'

const tabList = [{ label: 'タブ1' }, { label: 'タブ2' }, { label: 'タブ3' }]

const TabHarness = () => {
  const [currentTab, setCurrentTab] = React.useState(0)

  return (
    <>
      <Tab tabList={tabList} currentTab={currentTab} onChange={setCurrentTab} />
      <TabPanel tabIndex={0} currentTab={currentTab}>
        パネル1
      </TabPanel>
      <TabPanel tabIndex={1} currentTab={currentTab}>
        パネル2
      </TabPanel>
      <TabPanel tabIndex={2} currentTab={currentTab}>
        パネル3
      </TabPanel>
    </>
  )
}

describe('Tab', () => {
  it('Arrow key, Home, End でフォーカスと選択を移動できる', async () => {
    const user = userEvent.setup()

    render(<TabHarness />)

    const tabs = screen.getAllByRole('tab')

    await user.tab()
    expect(tabs[0]).toHaveFocus()
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{ArrowRight}')
    expect(tabs[1]).toHaveFocus()
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{End}')
    expect(tabs[2]).toHaveFocus()
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{ArrowLeft}')
    expect(tabs[1]).toHaveFocus()
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{Home}')
    expect(tabs[0]).toHaveFocus()
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
  })
})