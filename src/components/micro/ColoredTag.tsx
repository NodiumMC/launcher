import styled from 'styled-components'
import { FC } from 'react'
import { Text } from 'components/micro/Text'
import { Styles } from 'polished/lib/types/style'
import { mix, readableColor } from 'polished'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface ColoredTagProps {
  color?: string | (string & Styles)
  icon?: IconName
}

const StyledColoredTag = styled.div<{ color?: string | Styles }>`
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  border-radius: ${({ theme }) => theme.radius()};
  background: ${({ color, theme }) =>
    color ? mix(0.2, color, theme.master.back) : theme.master.shade()};
  border: 1px solid ${({ color, theme }) => color ?? theme.master.shade()};
`

const TagText = styled(Text)<{ color?: string }>`
  font-size: ${({ theme }) => theme.size()};
  color: ${({ theme, color }) =>
    color ? mix(0.4, theme.master.front, color) : theme.master.front};
`

const IconWrapper = styled.span`
  font-size: ${({ theme }) => theme.size()};
  padding-right: ${({ theme }) => theme.space()};
`

export const ColoredTag: FC<ColoredTagProps & ExtraProps.HasChildren> = ({
  color,
  children,
  icon,
}) => {
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
