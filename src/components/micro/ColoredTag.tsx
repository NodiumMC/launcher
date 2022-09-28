import styled from 'styled-components'
import { FC } from 'react'
import { Text } from 'components/micro/Text'
import { Styles } from 'polished/lib/types/style'

export interface ColoredTagProps {
  color?: string | (string & Styles)
}

const StyledColoredTag = styled.div<{ color?: string | Styles }>`
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  border-radius: ${({ theme }) => theme.radius()};
  background: ${({ color, theme }) => color ?? theme.master.shade()};
`

const TagText = styled(Text)`
  font-size: 12px;
  text-transform: uppercase;
  color: black;
`

export const ColoredTag: FC<ColoredTagProps & ExtraProps.HasChildren> = ({
  color,
  children,
}) => {
  return (
    <StyledColoredTag color={color}>
      <TagText font={'Tomorrow'} weight={100}>
        {children}
      </TagText>
    </StyledColoredTag>
  )
}
