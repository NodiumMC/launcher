import { generic } from 'theme/list/generic'
import { darken, lighten, linearGradient } from 'polished'

export const dark = {
  ...generic,
  palette: {
    accent: {
      default: '#ff986c',
      get light() {
        return lighten(0.1, this.default)
      },
      get dark() {
        return darken(0.1, this.default)
      },
    },
    front: {
      default: '#fff8e8',
      shades: [
        '#ebe4d4',
        '#e1daca',
        '#d7d0c0',
        '#cdc6b6',
        '#c3bcac',
        '#b9b2a2',
      ],
    },
    back: {
      default: '#2c2525',
      shades: [
        '#362f2f',
        '#403939',
        '#4a4343',
        '#544d4d',
        '#5e5757',
        '#686161',
      ],
    },
    grayscale: [
      '#403939',
      '#544d4d',
      '#686161',
      '#7c7575',
      '#908989',
      '#a49d9d',
    ],
    red: {
      default: '#ff5050',
    },
    green: {
      default: '#bfff50',
    },
    yellow: {
      default: '#fff791',
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
  },
  gradients: {
    primary: linearGradient({
      colorStops: ['#7458f5', '#ee3ec9', '#ff5293', '#ffc552', '#f9f871'],
      toDirection: '327deg',
    }),
    accent: linearGradient({
      colorStops: [
        '#ff986c',
        '#f37e7d',
        '#da6d8e',
        '#b6639a',
        '#885e9e',
        '#535997',
      ],
      toDirection: '45deg',
    }),
    mono: linearGradient({
      colorStops: [
        '#ff986c',
        '#ffd06c'
      ],
      toDirection: '45deg',
    }),
  },
}
