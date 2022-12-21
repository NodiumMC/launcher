import { hsl, linearGradient, parseToHsl, shade, tint } from 'polished'
import { normalizeColor } from 'utils'

const primary = '#5297ff'
const secondary = '#7b2eff'

const deshade = (color: string, value: number) => {
  const parsed = parseToHsl(shade(value, primary))
  return hsl({
    ...parsed,
    saturation: 0.05,
  })
}

const detint = (color: string, value: number) => {
  const parsed = parseToHsl(tint(value, primary))
  return hsl({
    ...parsed,
    saturation: 0.5,
  })
}

export const generic = {
  accent: {
    primary,
    secondary,
    // primary: '#7980ff',
    // secondary: '#aa79ff',
    gradient(direction?: string) {
      return linearGradient({
        colorStops: [this.primary, this.secondary],
        toDirection: direction ?? '45deg',
      })
    },
  },
  palette: {
    red: '#ff5c7a',
    green: '#a7ff77',
    blue: '#779eff',
    yellow: '#ffdf77',
    orange: '#ffa259',
    cyan: '#5effdf',
    magenta: '#d059ff',
    pink: '#ff58b7',
    black: deshade(primary, 0.8),
    white: detint(primary, 0.8),
  },
  fonts: {
    default: '"Jetbrains Mono"',
    interact: '"Jetbrains Mono"',
    title: 'Tomorrow',
  },
  transition: {
    time: '300ms',
  },
  radius: (value = 1) => 6 * value + 'px',
  size: (value = 10) => value / 10 + 'rem',
  space: (value = 1) => 6 * value + 'px',
}
