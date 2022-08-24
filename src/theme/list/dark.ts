import { generic } from 'theme/list/generic'
import { darken, lighten, linearGradient } from 'polished'

export const dark = {
  ...generic,
  palette: {
    accent: {
      default: '#00c6aa',
      get light() {
        return lighten(0.1, this.default)
      },
      get dark() {
        return darken(0.1, this.default)
      },
    },
    front: {
      default: '#f8faff',
      shades: [
        '#ecedf1',
        '#dddfe3',
        '#cbcdd0',
        '#b4b6b9',
        '#a1a3a6',
        '#888a8c',
      ],
    },
    back: {
      default: '#151718',
      shades: [
        '#1d2021',
        '#25292a',
        '#2d3133',
        '#373b3d',
        '#44494b',
        '#565c5e',
      ],
    },
    grayscale: [
      '#34343a',
      '#4c4c54',
      '#676773',
      '#9c9cab',
      '#b4b4c5',
      '#d0d0e3',
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
  },
  gradients: {
    primary: linearGradient({
      colorStops: ['#7458f5', '#ee3ec9', '#ff5293', '#ffc552', '#f9f871'],
      toDirection: '327deg',
    }),
    accent: linearGradient({
      colorStops: [
        '#7458f5',
        '#0079ff',
        '#008aff',
        '#0093de',
        '#0095aa',
        '#009570',
      ],
      toDirection: '45deg',
    }),
  },
}
