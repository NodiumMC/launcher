import { ThemeType } from './style/themes/theme'
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends ThemeType {}
}
