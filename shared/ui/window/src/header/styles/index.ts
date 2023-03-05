import { combine } from '@style/tools'
import { baseStyles } from './base.styles'
import { shapeStyles } from './shape.styles'

export const styles = combine(baseStyles, shapeStyles)
