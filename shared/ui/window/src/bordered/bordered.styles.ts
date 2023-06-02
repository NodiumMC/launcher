import { type StyleFn } from '@lmpx/styled'
import { BorderedProps } from './bordered.interface'


export const styles: StyleFn<BorderedProps> = ({ sides = [], theme }) => ({
  borderColor: theme.palette.gray._50,
  borderTopWidth: sides.includes('top') ? '1px' : '0',
  borderBottomWidth: sides.includes('bottom') ? '1px' : '0',
  borderLeftWidth: sides.includes('left') ? '1px' : '0',
  borderRightWidth: sides.includes('right') ? '1px' : '0',
  borderStyle: 'solid',
})
