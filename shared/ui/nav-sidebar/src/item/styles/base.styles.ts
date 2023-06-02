import { StyleFn } from '@lmpx/styled'

export const baseStyles: StyleFn = () => ({
  display: 'flex',
  position: 'relative',
  zIndex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  cursor: 'pointer',
  userSelect: 'none',
})
