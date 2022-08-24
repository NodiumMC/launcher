import { css } from 'styled-components'

export const transition = (
  selector = 'all',
  duration?: string,
  timing = '',
) => css`
  transition: ${selector} ${({ theme }) => duration ?? theme.transition.time}
    ${timing};
`
