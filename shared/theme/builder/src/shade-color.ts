import { Shade, ShadesRecord } from '@theme/types'
import { MAX_MIX_SHADE_RATIO, MAX_SHADE, MID_SHADE, MIN_MIX_SHADE_RATIO, MIN_SHADE } from './constants'
import { mix } from 'polished'
import { map } from '@lib/math'

const SHADE_VALUES: Shade[] = [5, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 975]

export function shade(color: string, background: string, foreground: string, shadeValue: Shade) {
  if (shadeValue === MID_SHADE) return color
  const mixWithBackground = shadeValue <= MID_SHADE

  const ratio = map(shadeValue, MIN_SHADE, MAX_SHADE, MIN_MIX_SHADE_RATIO, MAX_MIX_SHADE_RATIO)

  return mixWithBackground ? mix(ratio, color, background) : mix(ratio, foreground, color)
}

export function shadeFactory(background: string, foreground: string) {
  return (color: string, shadeValue: Shade) => shade(color, background, foreground, shadeValue)
}

export function shadeBatchFactory(color: string, background: string, foreground: string) {
  return (shadeValue: Shade) => shade(color, background, foreground, shadeValue)
}

export function makeShades(color: string, background: string, foreground: string): ShadesRecord {
  const factory = shadeBatchFactory(color, background, foreground)
  const shades = SHADE_VALUES.map(factory)

  return Object.fromEntries(shades.map((shade, idx) => [`_${SHADE_VALUES[idx]}`, shade])) as ShadesRecord
}

export function makeShadesFactory(background: string, foreground: string) {
  return (color: string) => makeShades(color, background, foreground)
}
