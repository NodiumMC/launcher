import styled from 'styled-components'
import { FC } from 'react'
import { HasChildren } from 'utils/UtilityProps'
import { Text } from 'components/micro/Text'
import { Styles } from 'polished/lib/types/style'

export interface ColoredTagProps {
  color?: string | Styles
}

const StyledColoredTag = styled.div<{ color?: string | Styles }>`
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  border-radius: ${({ theme }) => theme.shape.radius[0]};
  background: ${({ color, theme }) => color ?? theme.palette.back.shades[0]};
`

const TagText = styled(Text)`
  font-size: 12px;
  text-transform: uppercase;
  color: black;
`

export const ColoredTag: FC<ColoredTagProps & HasChildren> = ({
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
