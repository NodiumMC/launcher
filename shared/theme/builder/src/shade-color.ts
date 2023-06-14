import { Palette } from './types'
import { mix } from 'polished'

export function map(value: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number {
  return ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin
}

import { MAX_MIX_SHADE_RATIO, MAX_SHADE, MID_SHADE, MIN_MIX_SHADE_RATIO, MIN_SHADE } from './constants'
import { Shade } from '@theme/types'

const SHADE_VALUES: Shade[] = [5, 10, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 975, 995]
const MID_SHADE_VALUE = SHADE_VALUES.indexOf(500)

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

export function makeShades<T extends string>(name: T, color: string, background: string, foreground: string) {
  const factory = shadeBatchFactory(color, background, foreground)
  const shades = SHADE_VALUES.map(factory)

  return Object.fromEntries(
    shades.map((shade, idx) => [`${name}${SHADE_VALUES[idx]}`, shade]).concat([[name, shades[MID_SHADE_VALUE]]]),
  ) as Palette<T>
}

export function makeShadesFromPalette<T extends Record<string, string>, K extends keyof T & string>(
  palette: T,
  background: string,
  foreground: string,
) {
  return Object.entries(palette)
    .map(([key, color]) => makeShades(key, color, background, foreground))
    .reduce((a, c) => ({ ...a, ...c }), {}) as Palette<K>
}

export function makeNativeShades<T extends string>(name: T, primary: string, secondary: string) {
  const factory = shadeNativeBatchFactory(primary, secondary)
  const shades = SHADE_VALUES.map(factory)

  return Object.fromEntries(
    shades.map((shade, idx) => [`${name}${SHADE_VALUES[idx]}`, shade]).concat([[name, shades[MID_SHADE_VALUE]]]),
  ) as Palette<T>
}
