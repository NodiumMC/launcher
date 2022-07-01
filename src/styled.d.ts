import { ThemeType } from './style/themes/theme'
declare module "styled-components" {
  interface DefaultTheme extends ThemeType {}
}
