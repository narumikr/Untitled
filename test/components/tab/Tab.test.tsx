import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Tab, TabPanel } from '@/components/tab/Tab'

const tabList = [{ label: 'タブ1' }, { label: 'タブ2' }, { label: 'タブ3' }]

const TabHarness = ({ id }: { id?: string } = {}) => {
  const [currentTab, setCurrentTab] = React.useState(0)

  return (
    <>
      <Tab id={id} tabList={tabList} currentTab={currentTab} onChange={setCurrentTab} />
      <TabPanel id={id} tabIndex={0} currentTab={currentTab}>
        パネル1
      </TabPanel>
      <TabPanel id={id} tabIndex={1} currentTab={currentTab}>
        パネル2
      </TabPanel>
      <TabPanel id={id} tabIndex={2} currentTab={currentTab}>
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

  it('id propを共有すると Tab と TabPanel の ARIA 関連付けが成立する', () => {
    render(<TabHarness id="alpha" />)

    const tabs = screen.getAllByRole('tab')
    tabs.forEach((tab, index) => {
      expect(tab).toHaveAttribute('id', `alpha-tab-${index}`)
      expect(tab).toHaveAttribute('aria-controls', `alpha-tabpanel-${index}`)
    })

    const visiblePanel = screen.getByRole('tabpanel')
    expect(visiblePanel).toHaveAttribute('id', 'alpha-tabpanel-0')
    expect(visiblePanel).toHaveAttribute('aria-labelledby', 'alpha-tab-0')
  })

  it('複数の Tab を同一画面に置いても id が衝突しない', () => {
    render(
      <>
        <TabHarness id="alpha" />
        <TabHarness id="beta" />
      </>,
    )

    const allIds = screen
      .getAllByRole('tab')
      .map((tab) => tab.getAttribute('id'))
      .concat(screen.getAllByRole('tabpanel').map((panel) => panel.getAttribute('id')))

    expect(new Set(allIds).size).toBe(allIds.length)
  })
})
