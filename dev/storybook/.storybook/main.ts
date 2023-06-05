import { join, dirname } from 'node:path'

import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../../../**/*.mdx', '../../../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    dirname(
      require.resolve(join('@storybook/addon-links', 'package.json')),
    ),
    dirname(
      require.resolve(join('@storybook/addon-essentials', 'package.json')),
    ),
    dirname(
      require.resolve(
        join('@storybook/addon-interactions', 'package.json'),
      ),
    ),
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}
export default config
