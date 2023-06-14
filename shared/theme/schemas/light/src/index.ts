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
import { shade } from 'polished'

export default makeTheme({
  palette: {
    ...makeShadesFromPalette(
      {
        background: light,
        foreground: dark,

        primary: shade(0.3, primary),
        secondary,
        tertiary,

        error,
        warning,
        success,
      },
      light,
      dark,
    ),
    ...makeNativeShades('gray', dark, light),
  },
  font,
  radius,
  space,
  size,
  line,
  time,
})
