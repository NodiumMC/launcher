import { makeShadesFactory, makeTheme } from '@theme/builder'
import { dark, error, light, primary, radius, secondary, space, success, tertiary, warning } from '@theme/common'

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
  radius,
  space,
})
