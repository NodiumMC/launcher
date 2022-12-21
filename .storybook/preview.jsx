import theme from './theme'
import { ThemeProvider } from 'styled-components'
import { dark } from '../src/theme/list/dark'
import 'reflect-metadata'
import { Style } from '../src/style'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme
  }
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={dark}>
      <Style storybook />
      <Story />
    </ThemeProvider>
  ),
];
