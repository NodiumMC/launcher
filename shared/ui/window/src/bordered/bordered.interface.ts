import { GridProps } from '@lmpx/styled'

export interface BorderedProps extends GridProps {
  sides?: Array<'left' | 'right' | 'top' | 'bottom'>
}
