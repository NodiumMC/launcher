import { combine } from '@styled/tools'
import { appearanceStyles } from './appearance.styles'
import { baseStyles } from './base.styles'
import { shapeStyles } from './shape.styles'

export const styles = combine(baseStyles, shapeStyles, appearanceStyles)
