// This file has been automatically migrated to valid ESM format by Storybook.
import path from 'path'
import { fileURLToPath } from 'url'

import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-onboarding', '@chromatic-com/storybook', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const srcPath = path.resolve(__dirname, '../src')
    config.resolve ??= {}
    const existing = config.resolve.alias
    if (Array.isArray(existing)) {
      config.resolve.alias = [...existing, { find: '@', replacement: srcPath }]
    } else {
      config.resolve.alias = { ...existing, '@': srcPath }
    }
    return config
  },
  staticDirs: ['../.storybook/public'],
}

export default config
