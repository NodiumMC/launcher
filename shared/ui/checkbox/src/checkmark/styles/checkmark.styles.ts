import { combine, StyleFn } from 'styled'

const base: StyleFn = ({ theme }) => ({
  position: 'relative',
  width: '5px',
  height: '10px',
  border: `solid ${theme.palette.primary._500}`,
  borderWidth: '0 2px 2px 0',
  transform: 'rotate(45deg)',
})

export const checkmarkStyles = combine(base)
