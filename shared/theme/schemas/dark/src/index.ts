import { makeNativeShades, makeShadesFromPalette, makeTheme } from '@theme/builder'
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

export default makeTheme({
  palette: {
    ...makeShadesFromPalette(
      {
        background: dark,
        foreground: light,

        primary,
        secondary,
        tertiary,

        error,
        warning,
        success,
      },
      dark,
      light,
    ),
    ...makeNativeShades('gray', light, dark),
  },
  font,
  radius,
  space,
  size,
  line,
  time,
})
