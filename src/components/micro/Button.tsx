import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { HasChildren, Clickable } from 'utils/UtilityProps'
import { font } from 'components/utils/Font'
import { Preloader } from 'components/micro/Preloader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { shade, ShadeProps, transition } from 'style'
import { rgba } from 'polished'
import { IconName } from '@fortawesome/fontawesome-svg-core'

interface ButtonWrapperProps extends ShadeProps {
  primary?: boolean
  disabled?: boolean
  danger?: boolean
  square?: boolean
  outlined?: boolean
}

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: ${({ square }) => (square ? 'center' : 'space-between')};
  gap: 10px;
  border-radius: ${({ theme }) => theme.shape.radius[0]};
  height: 36px;
  width: ${({ square }) => (square ? '36px' : 'auto')};
  padding: ${({ square }) => (square ? '0' : '0 20px')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ primary, theme }) =>
    primary ? 'white' : theme.palette.front.default};
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
    ${({ theme, danger, disabled, outlined }) =>
      disabled
        ? theme.palette.grayscale[2]
        : danger
        ? theme.palette.red.default
        : disabled
        ? theme.palette.grayscale[2]
        : outlined
        ? theme.palette.accent.default
        : 'transparent'};
  ${transition()}

  &:hover {
    background-color: ${({ theme, danger, disabled, outlined, primary }) =>
      disabled || danger || !outlined || primary
        ? 'none'
        : rgba(theme.palette.accent.default, 0.2)};
    box-shadow: ${({ theme, danger, disabled, outlined }) =>
      disabled || !outlined
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
  icon?: IconName
  fetching?: boolean
}

const FetchingPreloader = styled(Preloader)`
  height: 16px;
  width: 16px;
`

const Icon = styled(FontAwesomeIcon)<ShadeProps>`
  ${({ shade: level }) => shade(level)}
`

export const Button: FC<ButtonProps> = ({
  icon,
  fetching,
  disabled,
  onClick,
  primary,
  danger,
  children,
  square,
  outlined = true,
  shade,
}) => {
  const wp = { danger, primary, square, outlined }
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
      {icon && <Icon icon={icon} shade={shade} />}
      {children}
      {fetching && <FetchingPreloader />}
    </ButtonWrapper>
  )
}
