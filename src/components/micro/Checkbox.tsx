import { FC } from 'react'
import styled from 'styled-components'

import { transition } from 'style'

interface SubstrateProps {
  disabled?: boolean
}

const Substrate = styled.div<SubstrateProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.master.shade(0.2) : theme.accent.primary};
  position: relative;
  ${transition('all', '100ms')}

  &:hover {
    ${({ disabled, theme }) =>
      !disabled
        ? `
    box-shadow: 0 0 10px 1px ${theme.accent.primary}3F
    `
        : ''}
  }

  &:before,
  &:after {
    background-color: inherit;
    position: absolute;
    content: '';
  }

  &:after {
    border-radius: 10% / 50%;
    height: 100%;
    left: -10%;
    right: -10%;
    top: 0;
  }

  &:before {
    border-radius: 50% / 10%;
    bottom: -10%;
    left: 0;
    top: -10%;
    width: 100%;
  }
`

const Container = styled(Substrate)<ExtraProps.Value<boolean>>`
  width: 16px;
  height: 16px;
  background-color: ${({ theme, value }) =>
    value ? theme.accent.primary : theme.master.back};
  z-index: 1;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  &:before,
  &:after {
    background-color: inherit;
  }
`

const L = styled.div`
  width: 40%;
  height: 55%;
  position: absolute;
  z-index: 2;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-150deg);

  &:after,
  &:before {
    content: '';
    display: block;
    position: absolute;
    background-color: white;
    z-index: 2;
  }

  &:before {
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
  }

  &:after {
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }
`

const Checked = styled.div<ExtraProps.Value<boolean> & SubstrateProps>`
  position: absolute;
  width: ${({ value }) => (value ? '100%' : 0)};
  height: ${({ value }) => (value ? '100%' : 0)};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  ${transition('all', '50ms')}
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.master.reshade(0.6) : theme.accent.primary};
  z-index: 2;
`

export const Checkbox: FC<
  SubstrateProps & ExtraProps.DataInput<boolean> & ExtraProps.Styled
> = ({ value, disabled, onChange, ...props }) => {
  return (
    <Substrate
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!value)}
      {...props}
    >
      <Container disabled={disabled} value={value}>
        <Checked value={value} disabled={disabled}>
          <L />
        </Checked>
      </Container>
    </Substrate>
  )
}
