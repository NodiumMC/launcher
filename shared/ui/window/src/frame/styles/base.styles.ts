import type { StyleFn } from '@lmpx/styled'
import { WRAPPER_SIZE } from '../../constants'

export const baseStyles: StyleFn = () => ({
  display: 'grid',
  gridTemplateAreas: `
    'logo title'
    'sidebar view'
  `,
  gridTemplateRows: `${WRAPPER_SIZE} 1fr`,
  gridTemplateColumns: `${WRAPPER_SIZE} 1fr`,
  boxSizing: 'border-box',
})
