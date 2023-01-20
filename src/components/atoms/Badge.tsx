import styled from 'styled-components'
import { FC } from 'react'
import { Text } from 'components/atoms/Text'
import { Styles } from 'polished/lib/types/style'
import { mix, rgba } from 'polished'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface BadgeProps {
  color?: string | (string & Styles)
  icon?: IconName
}

const StyledColoredTag = styled.div<{ color?: string | Styles }>`
  display: inline-flex;
  align-items: center;
  padding: 1px 8px;
  border-radius: ${({ theme }) => theme.radius()};
  background: ${({ color, theme }) => (color ? mix(0.2, color, theme.master.back) : theme.master.shade())};
  border: 1px solid ${({ color, theme }) => (color ? rgba(color, 0.2) : theme.master.shade())};
`

const TagText = styled(Text)<{ color?: string }>`
  font-size: ${({ theme }) => theme.size(9)} !important;
  color: ${({ theme, color }) => (color ? mix(0.4, theme.master.front, color) : theme.master.front)} !important;
`

const IconWrapper = styled.span`
  font-size: ${({ theme }) => theme.size()};
  padding-right: ${({ theme }) => theme.space()};
`

export const Badge: FC<BadgeProps & ExtraProps.HasChildren> = ({ color, children, icon }) => {
  return (
    <StyledColoredTag color={color}>
      {icon && (
        <IconWrapper>
          <FontAwesomeIcon icon={icon} />
        </IconWrapper>
      )}
      <TagText weight={100} color={color}>
        {children}
      </TagText>
    </StyledColoredTag>
  )
}
