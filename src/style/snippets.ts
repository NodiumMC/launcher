import { css } from 'styled-components'

export const transition = (
  selector = 'all',
  duration?: string,
  timing = '',
) => css`
  ${selector} {
    transition: ${selector} ${({ theme }) => duration ?? theme.transition.time}
      ${timing};
  }
`
