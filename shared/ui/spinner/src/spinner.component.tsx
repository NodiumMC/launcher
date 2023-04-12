import { styled, useTheme } from 'styled'
import { FC } from 'react'
import { Schema } from '@theme/types'
import { SpinnerProps } from './spinner.interface'
import { animatedGroupStyles, groupStyles, svgStyles } from './spinner.styles'

const Svg = styled.svg(svgStyles)
const G = styled.g(groupStyles)
const AnimatedG = styled.g(groupStyles, animatedGroupStyles)

export const Spinner: FC<SpinnerProps> = props => {
  const theme = useTheme() as Schema

  return (
    <Svg {...props} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
      <G fill='none' stroke={theme.palette.gray._100} strokeLinecap='round' strokeLinejoin='round' strokeWidth={10}>
        <path d='m32 58.6 23.04-13.3V18.7L32 5.4 8.96 18.7v26.6z' />
        <path d='M32 58.6V32l23.04-13.3M32 32 8.96 18.7' />
      </G>
      <AnimatedG
        fill='none'
        strokeDasharray={80}
        stroke={theme.palette.gray._600}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={10}
      >
        <path d='m32 58.6 23.04-13.3V18.7L32 5.4 8.96 18.7v26.6z' />
        <path d='M32 58.6V32l23.04-13.3M32 32 8.96 18.7' />
      </AnimatedG>
    </Svg>
  )
}
