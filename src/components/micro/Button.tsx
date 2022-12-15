import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { font } from 'style'
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
  noShadow?: boolean
}

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: ${({ square }) => (square ? 'center' : 'space-between')};
  gap: 10px;
  border-radius: ${({ theme }) => theme.radius()};
  height: 38px;
  width: ${({ square }) => (square ? '38px' : 'auto')};
  padding: ${({ square }) => (square ? '0' : '0 20px')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ primary, theme }) => (primary ? theme.master.back : theme.master.front)};
  ${({ theme }) => font(theme.fonts.interact)}
  user-select: none;
  background: ${({ theme, danger, disabled, primary }) =>
    disabled ? theme.master.shade(0.2) : danger ? theme.palette.red : primary ? theme.accent.primary : 'transparent'};
  border: 2px solid
    ${({ theme, danger, disabled, outlined, primary }) =>
      disabled
        ? theme.master.shade(0.2)
        : danger
        ? theme.palette.red
        : disabled
        ? theme.master.shade(0.2)
        : primary
        ? theme.accent.primary
        : outlined
        ? theme.accent.primary
        : 'transparent'};
  ${transition()}

  &:hover {
    background-color: ${({ theme, danger, disabled, outlined, primary }) =>
      disabled || danger || !outlined || primary ? 'none' : rgba(theme.accent.primary, 0.2)};
    box-shadow: ${({ theme, danger, disabled, outlined, noShadow }) =>
      disabled || !outlined || noShadow
        ? 'none'
        : danger
        ? `
    ${rgba(theme.palette.red, 0.15)} 0px 4px 7px 0px,
    ${rgba(theme.palette.red, 0.02)} 0px 100px 80px 0px,
    ${rgba(theme.palette.red, 0.03)} 0px 42px 33px 0px,
    ${rgba(theme.palette.red, 0.04)} 0px 22px 18px 0px,
    ${rgba(theme.palette.red, 0.05)} 0px 12px 10px 0px,
    ${rgba(theme.palette.red, 0.08)} 0px 7px 5px 0px,
    ${rgba(theme.palette.red, 0.1)} 0px 3px 2px 0px
    `
        : `
    ${rgba(theme.accent.primary, 0.15)} 0px 4px 7px 0px,
    ${rgba(theme.accent.primary, 0.02)} 0px 100px 80px 0px,
    ${rgba(theme.accent.primary, 0.03)} 0px 42px 33px 0px,
    ${rgba(theme.accent.primary, 0.04)} 0px 22px 18px 0px,
    ${rgba(theme.accent.primary, 0.05)} 0px 12px 10px 0px,
    ${rgba(theme.accent.primary, 0.08)} 0px 7px 5px 0px,
    ${rgba(theme.accent.primary, 0.1)} 0px 3px 2px 0px
    `};
  }
`

export interface ButtonProps
  extends ButtonWrapperProps,
    ExtraProps.Clickable,
    ExtraProps.HasChildren,
    ExtraProps.Styled {
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
  className,
  style,
}) => {
  const wp = { danger, primary, square, outlined }
  const genericDisable = useMemo(() => disabled || fetching, [disabled, fetching])
  return (
    <ButtonWrapper
      className={className}
      style={style}
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
