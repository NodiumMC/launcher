import { hsl, parseToHsl, shade, tint } from 'polished'

export function deriveDarkFromAccent(accent: string, value = 0.8, saturation = 0.05) {
  const parsed = parseToHsl(shade(value, accent))
  return hsl({
    ...parsed,
    saturation,
  })
}

export function deriveLightdFromAccent(accent: string, value = 0.8, saturation = 0.5) {
  const parsed = parseToHsl(tint(value, accent))
  return hsl({
    ...parsed,
    saturation,
  })
}
