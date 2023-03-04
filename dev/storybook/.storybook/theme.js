import { create } from '@storybook/theming'
import './font.css'

export default create({
  base: 'dark',

  colorPrimary: '#5297ff',
  colorSecondary: '#5297ff',

  // UI
  appBg: '#1f2123',
  appContentBg: '#1f2123',
  appBorderColor: '#282b2d',
  appBorderRadius: 6,

  // Typography
  fontBase: '"JetBrains Mono", sans-serif',
  fontCode: '"JetBrains Mono", monospace',

  // Text colors
  textColor: '#e5ecf6',
  textInverseColor: '#e5ecf6',

  // Toolbar default and active colors
  barTextColor: '#dbe1eb',
  barSelectedColor: '#5297ff',
  barBg: '#1f2123',

  // Form colors
  inputBg: '#1d1f21',
  inputBorder: '#282b2d',
  inputTextColor: '#e5ecf6',
  inputBorderRadius: 6,

  brandTitle: 'Nodium Launcher',
  // brandUrl: 'https://example.com',
  brandTarget: '_self',
})
