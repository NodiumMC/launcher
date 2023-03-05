import { makeShadesFactory, makeTheme } from '@theme/builder'
import {
  dark,
  error,
  font,
  light,
  line,
  primary,
  radius,
  secondary,
  size,
  space,
  success,
  tertiary,
  time,
  warning,
} from '@theme/common'

const shades = makeShadesFactory(dark, light)

export default makeTheme({
  palette: {
    background: shades(dark),
    foreground: shades(light),

    primary: shades(primary),
    secondary: shades(secondary),
    tertiary: shades(tertiary),

    error: shades(error),
    warning: shades(warning),
    success: shades(success),
  },
  font,
  radius,
  space,
  size,
  line,
  time,
})
