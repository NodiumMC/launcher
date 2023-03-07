import { combine } from '@styled/tools'
import { baseStyles } from './base.styles'
import { appearanceStyles } from './appearance.styles'
import { shapeStyles } from './shape.styles'
import { transitionStyles } from './transition.styles'

export const styles = combine(baseStyles, appearanceStyles, shapeStyles, transitionStyles)
