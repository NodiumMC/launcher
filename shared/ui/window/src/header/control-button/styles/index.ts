import { combine } from 'styled'
import { baseStyles } from './base.styles'
import { shapeStyles } from './shape.styles'
import { transitionStyles } from './transition.styles'
import { defaultAppearanceStyles, destructiveAppearanceStyles } from './appearance.styles'

export const styles = combine(
  baseStyles,
  shapeStyles,
  defaultAppearanceStyles,
  destructiveAppearanceStyles,
  transitionStyles,
)
