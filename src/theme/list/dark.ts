import { generic } from './generic'
import { invert, mix, readableColor, shade, tint } from 'polished'

export const dark = {
  ...generic,
  master: {
    back: generic.palette.black,
    front: generic.palette.white,
    shade(factor = 0.05) {
      return mix(factor >= 0 ? factor : 1 - factor * -1, this.front, this.back)
    },
    reshade(factor = 0.05) {
      return mix(factor >= 0 ? factor : 1 - factor * -1, this.back, this.front)
    },
    tint(factor = 0.05) {
      return shade(factor >= 0 ? factor : 1 - factor * -1, this.back)
    },
    retint(factor = 0.05) {
      return tint(factor >= 0 ? factor : 1 - factor * -1, this.front)
    },
    edge(factor = 0.05) {
      return mix(factor >= 0 ? factor : 1 - factor * -1, invert(readableColor(this.back)), this.back)
    },
  },
  palette: {
    ...generic.palette,
    red: mix(0, generic.palette.white, generic.palette.red),
    green: mix(0, generic.palette.white, generic.palette.green),
    blue: mix(0, generic.palette.white, generic.palette.blue),
    yellow: mix(0, generic.palette.white, generic.palette.yellow),
    orange: mix(0, generic.palette.white, generic.palette.orange),
    cyan: mix(0, generic.palette.white, generic.palette.cyan),
    magenta: mix(0, generic.palette.white, generic.palette.magenta),
    pink: mix(0, generic.palette.white, generic.palette.pink),
  },
  console: [
    '#000',
    '#ff5050',
    '#bfff50',
    '#ffdc50',
    '#55F',
    '#F5F',
    '#5FF',
    '#AAA',
    '#555',
    '#ff245d',
    '#80ff2c',
    '#ffcf11',
    '#6237ff',
    '#d231ff',
    '#00ff8b',
    '#FFF',
  ],
}
