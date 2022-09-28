import { generic } from 'theme/list'
import { mix } from 'polished'

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
