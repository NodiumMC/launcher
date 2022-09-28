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
    primary: '#ffa052',
    secondary: '#ff552e',
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
    get black() {
      return deshade(generic.accent.primary, 0.85)
    },
    get white() {
      return detint(generic.accent.primary, 0.85)
    },
  },
  fonts: {
    default: 'Rubik',
    interact: 'GTEestiProText',
    title: 'Tomorrow',
  },
  transition: {
    time: '.3s',
  },
  radius: (value = 1) => 6 * value + 'px',
  size: (value = 10) => value / 10 + 'rem',
}

