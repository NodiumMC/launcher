import { darkTheme, ThemeType, lightTheme } from 'theme/theme'

export const deviceThemeIsDark = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches
export const deviceTheme = (): ThemeType =>
  deviceThemeIsDark() ? darkTheme : lightTheme
