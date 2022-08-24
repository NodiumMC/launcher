import { dark, light } from 'theme/list'
import { DefaultTheme } from 'styled-components'

export const deviceThemeIsDark = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches
export const deviceTheme = (): DefaultTheme =>
  deviceThemeIsDark() ? dark : light
