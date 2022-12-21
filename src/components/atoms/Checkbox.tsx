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
  background-color: ${({ theme, disabled }) => (disabled ? theme.master.shade(0.3) : theme.accent.primary)};
  border-radius: ${({ theme }) => theme.radius(0.5)};
  position: relative;
  ${transition('all', '0.1s')}

  &:hover {
    ${({ disabled, theme }) =>
      !disabled
        ? `
    box-shadow: 0 0 10px 1px ${theme.accent.primary}3F
    `
        : ''}
  }
`

const Container = styled(Substrate)<ExtraProps.Value<boolean>>`
  width: 16px;
  height: 16px;
  background-color: ${({ theme, value }) => (value ? theme.accent.primary : theme.master.back)};
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
  border-radius: 0;
  ${transition('all', '0.1s')}
  background-color: ${({ theme, disabled }) => (disabled ? theme.master.shade(0.3) : theme.accent.primary)};
  z-index: 2;
`

export const Checkbox: FC<SubstrateProps & ExtraProps.DataInput<boolean> & ExtraProps.Styled> = ({
  value,
  disabled,
  onChange,
  ...props
}) => {
  return (
    <Substrate disabled={disabled} onClick={() => !disabled && onChange?.(!value)} {...props}>
      <Container disabled={disabled} value={value}>
        <Checked value={value} disabled={disabled}>
          <L />
        </Checked>
      </Container>
    </Substrate>
  )
}
