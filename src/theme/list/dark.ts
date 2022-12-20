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
