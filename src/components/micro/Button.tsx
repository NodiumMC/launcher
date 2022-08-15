import { FC } from 'react'
import styled from 'styled-components'
import { HasChildren, Clickable } from 'utils/UtilityProps'
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { font } from 'components/utils/Font'

interface ButtonWrapperProps {
  primary?: boolean
  disabled?: boolean
  danger?: boolean
}

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  border-radius: 5px;
  height: 36px;
  padding: 0 20px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: white;
  ${({ theme }) => font(theme.fonts.interact)}
  user-select: none;
  background: ${({ theme, danger, disabled, primary }) =>
    disabled
      ? theme.colors.mid
      : danger
      ? theme.colors.danger
      : primary
      ? theme.colors.accent
      : 'transparent'};
  border: 2px solid
    ${({ theme, danger, disabled }) =>
      disabled
        ? theme.colors.mid
        : danger
        ? theme.colors.danger
        : disabled
        ? theme.colors.mid
        : theme.colors.accent};
  transition: all ${({ theme }) => theme.transition.time};

  &:hover {
    box-shadow: ${({ danger, disabled }) =>
      disabled
        ? 'none'
        : danger
        ? `
    rgba(0, 0, 0, 0.15) 0px 4px 7px 0px,
    rgba(255, 80, 80, 0.02) 0px 100px 80px 0px,
    rgba(255, 80, 80, 0.03) 0px 42px 33px 0px,
    rgba(255, 80, 80, 0.04) 0px 22px 18px 0px,
    rgba(255, 80, 80, 0.05) 0px 12px 10px 0px,
    rgba(255, 80, 80, 0.08) 0px 7px 5px 0px,
    rgba(255, 80, 80, 0.1) 0px 3px 2px 0px
    `
        : `
    rgba(0, 0, 0, 0.15) 0px 4px 7px 0px,
    rgba(173, 154, 255, 0.02) 0px 100px 80px 0px,
    rgba(173, 154, 255, 0.03) 0px 42px 33px 0px,
    rgba(173, 154, 255, 0.04) 0px 22px 18px 0px,
    rgba(173, 154, 255, 0.05) 0px 12px 10px 0px,
    rgba(173, 154, 255, 0.08) 0px 7px 5px 0px,
    rgba(173, 154, 255, 0.1) 0px 3px 2px 0px
    `};
  }
`

export interface ButtonProps
  extends ButtonWrapperProps,
    Clickable,
    HasChildren {
  icon?: IconDefinition
  fetching?: boolean
}

export const Button: FC<ButtonProps> = ({
  icon,
  fetching,
  disabled,
  onClick,
  primary,
  danger,
  children,
}) => {
  const wp = { disabled, danger, primary }
  return (
    <ButtonWrapper {...wp} onClick={() => !disabled && onClick?.()}>
      {children}
    </ButtonWrapper>
  )
}
