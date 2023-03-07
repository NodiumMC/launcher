import { StyleFn } from '@style/tools'

export const baseStyles: StyleFn = () => ({
  display: 'flex',
  position: 'absolute',
  inset: '0',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
})