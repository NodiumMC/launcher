import { hsl, linearGradient, parseToHsl, shade, tint } from 'polished'

const deshade = (color: string, value: number) => {
  const parsed = parseToHsl(shade(value, generic.accent.primary))
  return hsl({
    ...parsed,
    saturation: 0.05,
  })
}

const detint = (color: string, value: number) => {
  const parsed = parseToHsl(tint(value, generic.accent.primary))
  return hsl({
    ...parsed,
    saturation: 0.5,
  })
}

export const generic = {
  accent: {
    primary: '#5297ff',
    secondary: '#7b2eff',
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
    get black() {
      return deshade(generic.accent.primary, 0.8)
    },
    get white() {
      return detint(generic.accent.primary, 0.8)
    },
  },
  fonts: {
    default: 'Rubik',
    interact: 'GTEestiProText',
    title: 'Tomorrow',
  },
  transition: {
    time: '300ms',
  },
  radius: (value = 1) => 6 * value + 'px',
  size: (value = 10) => value / 10 + 'rem',
  space: (value = 1) => 6 * value + 'px',
}
