import type { Preview } from '@storybook/react'
import { ThemeProvider } from '@theme/provider'
import { STORY_THEME } from './constants'
import { dark, light } from './theme'

export default {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'default',
      values: [
        {
          name: 'default',
          value: STORY_THEME === 'dark' ? dark.appBg : light.appBg
        }
      ]
    },
    docs: {
      theme: STORY_THEME  === 'dark' ? dark : light,
    }
  },
} satisfies Preview

export const decorators = [
  (Story) => (
    <ThemeProvider forceTheme={STORY_THEME}>
      <Story />
    </ThemeProvider>
  ),
]
