import type { Palette } from './palette'
import type { Radius } from './shape'
import type { Space } from './layout'

export * from './palette'
export * from './shape'
export * from './utils'
export * from './layout'

export interface Schema {
  palette: Palette
  radius: Radius
  space: Space
}
