import { dark, generic } from 'theme/list'
import { Theme } from 'theme/type'
import { mix } from 'polished'

export const light: Theme = {
  ...dark,
  master: {
    ...dark.master,
    back: dark.master.front,
    front: dark.master.back,
  },
  palette: {
    ...generic.palette,
    red: mix(0.2, generic.palette.black, generic.palette.red),
    green: mix(0.4, generic.palette.black, generic.palette.green),
    blue: mix(0.2, generic.palette.black, generic.palette.blue),
    yellow: mix(0.4, generic.palette.black, generic.palette.yellow),
    orange: mix(0.2, generic.palette.black, generic.palette.orange),
    cyan: mix(0.2, generic.palette.black, generic.palette.cyan),
    magenta: mix(0.2, generic.palette.black, generic.palette.magenta),
    pink: mix(0.2, generic.palette.black, generic.palette.pink),
  },
}
