import { StyleFn } from 'styled'
import { animation } from './spinner.keyframes'

export const svgStyles: StyleFn = () => ({
  width: '1em',
  height: '1em',
})

export const groupStyles: StyleFn = ({ theme }) => ({
  transitionProperty: 'stroke',
  transitionDuration: theme.time.default,
})

export const animatedGroupStyles: StyleFn = () => ({
  animation: `${animation} 1.5s linear infinite`,
})
