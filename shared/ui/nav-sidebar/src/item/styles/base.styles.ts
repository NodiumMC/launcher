import { combine, ifProp, StyleFn } from 'styled'
import { ItemProps } from '../item.interface'

const base: StyleFn = () => ({
  display: 'flex',
  position: 'relative',
  zIndex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  cursor: 'pointer',
})

const blurry: StyleFn = () => ({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  zIndex: -1,
  filter: 'blur(15px) saturate(150%)',
})

export const baseStyles = combine(
  base,
  ifProp(({ blurry }: ItemProps) => blurry, blurry),
)
