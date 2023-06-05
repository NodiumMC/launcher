import { combine } from '@lmpx/styled'
import { shapeStyles } from './shape.styles'
import { appearanceStyles } from './appearance.styles'

export const styles = combine(shapeStyles, appearanceStyles)
