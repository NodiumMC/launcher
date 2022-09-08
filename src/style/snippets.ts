import { css } from 'styled-components'
import { mix } from 'polished'

export const transition = (
  selector = 'all',
  duration?: string,
  timing = '',
) => css`
  transition: ${selector + ','}
    ${({ theme }) => duration ?? theme.transition.time} ${timing};
`

export type ShadeLevel = number | 'low' | 'medium' | 'high'

export interface ShadeProps {
  shade?: ShadeLevel
}

export const shade = (level?: number | 'low' | 'medium' | 'high') =>
  level
    ? css`
        color: ${({ theme }) =>
          mix(
            typeof level === 'string'
              ? level === 'high'
                ? 0.5
                : level === 'medium'
                ? 0.3
                : 0.1
              : level,
            theme.palette.back.default,
            theme.palette.front.default,
          )};
      `
    : ''
