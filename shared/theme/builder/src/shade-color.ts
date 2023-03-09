import { Shade, ShadesRecord } from '@theme/types'
import { MAX_MIX_SHADE_RATIO, MAX_SHADE, MID_SHADE, MIN_MIX_SHADE_RATIO, MIN_SHADE } from './constants'
import { mix } from 'polished'
import { map } from '@lib/math'

const SHADE_VALUES: Shade[] = [5, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 975]

function mapRatioNative(shade: Shade) {
  return map(shade, MIN_SHADE, MAX_SHADE, MIN_MIX_SHADE_RATIO, MAX_MIX_SHADE_RATIO)
}

function mapRatio(shade: Shade, mixWithBackground: boolean) {
  return mixWithBackground
    ? map(shade, MIN_SHADE, MID_SHADE, MIN_MIX_SHADE_RATIO, MAX_MIX_SHADE_RATIO)
    : map(shade, MID_SHADE, MAX_SHADE, MIN_MIX_SHADE_RATIO, MAX_MIX_SHADE_RATIO)
}

export function shade(color: string, background: string, foreground: string, shadeValue: Shade) {
  if (shadeValue === MID_SHADE) return color
  const mixWithBackground = shadeValue <= MID_SHADE

  const ratio = mapRatio(shadeValue, mixWithBackground)

  return mixWithBackground ? mix(ratio, color, background) : mix(ratio, foreground, color)
}

export function shadeNative(primary: string, secondary: string, shadeValue: Shade) {
  const ratio = mapRatioNative(shadeValue)
  return mix(ratio, primary, secondary)
}

export function shadeFactory(background: string, foreground: string) {
  return (color: string, shadeValue: Shade) => shade(color, background, foreground, shadeValue)
}

export function shadeBatchFactory(color: string, background: string, foreground: string) {
  return (shadeValue: Shade) => shade(color, background, foreground, shadeValue)
}

export function shadeNativeBatchFactory(primary: string, secondary: string) {
  return (shadeValue: Shade) => shadeNative(primary, secondary, shadeValue)
}

export function makeShades(color: string, background: string, foreground: string): ShadesRecord {
  const factory = shadeBatchFactory(color, background, foreground)
  const shades = SHADE_VALUES.map(factory)

  return Object.fromEntries(shades.map((shade, idx) => [`_${SHADE_VALUES[idx]}`, shade])) as ShadesRecord
}

export function makeShadesFactory(background: string, foreground: string) {
  return (color: string) => makeShades(color, background, foreground)
}

export function makeNativeShades(primary: string, secondary: string) {
  const factory = shadeNativeBatchFactory(primary, secondary)
  const shades = SHADE_VALUES.map(factory)

  return Object.fromEntries(shades.map((shade, idx) => [`_${SHADE_VALUES[idx]}`, shade])) as ShadesRecord
}
