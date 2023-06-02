import { makeNativeShades, makeShadesFactory, makeTheme } from '@theme/builder'
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
import { shade } from 'polished'

const shades = makeShadesFactory(light, dark)

export default makeTheme({
  palette: {
    background: light,
    foreground: dark,
    gray: makeNativeShades(dark, light),

    primary: shades(shade(0.35, primary)),
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
