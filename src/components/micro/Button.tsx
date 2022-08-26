import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { HasChildren, Clickable } from 'utils/UtilityProps'
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { font } from 'components/utils/Font'
import { Preloader } from 'components/micro/Preloader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { transition } from 'style'
import { rgba } from 'polished'

interface ButtonWrapperProps {
  primary?: boolean
  disabled?: boolean
  danger?: boolean
}

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-radius: ${({ theme }) => theme.shape.radius[0]};
  height: 36px;
  padding: 0 20px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: white;
  ${({ theme }) => font(theme.fonts.interact)}
  user-select: none;
  background: ${({ theme, danger, disabled, primary }) =>
    disabled
      ? theme.palette.grayscale[2]
      : danger
      ? theme.palette.red.default
      : primary
      ? theme.palette.accent.default
      : 'transparent'};
  border: 2px solid
    ${({ theme, danger, disabled }) =>
      disabled
        ? theme.palette.grayscale[2]
        : danger
        ? theme.palette.red.default
        : disabled
        ? theme.palette.grayscale[2]
        : theme.palette.accent.default};
  ${transition()}

  &:hover {
    box-shadow: ${({ theme, danger, disabled }) =>
      disabled
        ? 'none'
        : danger
        ? `
    ${rgba(theme.palette.red.default, 0.15)} 0px 4px 7px 0px,
    ${rgba(theme.palette.red.default, 0.02)} 0px 100px 80px 0px,
    ${rgba(theme.palette.red.default, 0.03)} 0px 42px 33px 0px,
    ${rgba(theme.palette.red.default, 0.04)} 0px 22px 18px 0px,
    ${rgba(theme.palette.red.default, 0.05)} 0px 12px 10px 0px,
    ${rgba(theme.palette.red.default, 0.08)} 0px 7px 5px 0px,
    ${rgba(theme.palette.red.default, 0.1)} 0px 3px 2px 0px
    `
        : `
    ${rgba(theme.palette.accent.default, 0.15)} 0px 4px 7px 0px,
    ${rgba(theme.palette.accent.default, 0.02)} 0px 100px 80px 0px,
    ${rgba(theme.palette.accent.default, 0.03)} 0px 42px 33px 0px,
    ${rgba(theme.palette.accent.default, 0.04)} 0px 22px 18px 0px,
    ${rgba(theme.palette.accent.default, 0.05)} 0px 12px 10px 0px,
    ${rgba(theme.palette.accent.default, 0.08)} 0px 7px 5px 0px,
    ${rgba(theme.palette.accent.default, 0.1)} 0px 3px 2px 0px
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

const FetchingPreloader = styled(Preloader)`
  height: 16px;
  width: 16px;
`

export const Button: FC<ButtonProps> = ({
  icon,
  fetching,
  disabled,
  onClick,
  primary,
  danger,
  children,
}) => {
  const wp = { danger, primary }
  const genericDisable = useMemo(
    () => disabled || fetching,
    [disabled, fetching],
  )
  return (
    <ButtonWrapper
      {...wp}
      onClick={() => !genericDisable && onClick?.()}
      disabled={genericDisable}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {children}
      {fetching && <FetchingPreloader />}
    </ButtonWrapper>
  )
}
