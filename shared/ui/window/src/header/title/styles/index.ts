import { combine } from 'styled'
import { appearanceStyles } from './appearance.styles'
import { baseStyles } from './base.styles'
import { shapeStyles } from './shape.styles'
import { transitionStyles } from './transition.styles'

export const styles = combine(baseStyles, shapeStyles, appearanceStyles, transitionStyles)
