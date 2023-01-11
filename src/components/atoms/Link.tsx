import { FC } from 'react'
import styled from 'styled-components'
import { open } from '@tauri-apps/api/shell'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface LinkProps {
  href: string
}

const StyledLink = styled.span`
  color: ${({ theme }) => theme.accent.primary};
  text-decoration: underline;
  cursor: pointer;
  svg {
    margin-right: ${({ theme }) => theme.space()};
  }
`

export const Link: FC<LinkProps & JSX.IntrinsicElements['div']> = ({ href, children, ...props }) => {
  return (
    <StyledLink onClick={() => open(href)}>
      <FontAwesomeIcon icon={'arrow-up-right-from-square'} />
      {children}
    </StyledLink>
  )
}
