import type { Palette } from './palette'
import type { Radius } from './shape'
import type { Space } from './layout'
import type { FontFamily } from './font'
import type { FontSize, LineHeight } from './text'
import type { Time } from './transition'

export * from './palette'
export * from './shape'
export * from './utils'
export * from './layout'
export * from './font'
export * from './text'
export * from './transition'

export interface Schema {
  palette: Palette
  radius: Radius
  space: Space
  font: FontFamily
  size: FontSize
  line: LineHeight
  time: Time
}
