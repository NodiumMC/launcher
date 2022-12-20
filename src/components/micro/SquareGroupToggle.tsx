import { ReactNode } from 'react'
import styled from 'styled-components'
import { SquareGroup } from 'components/micro/SquareGroup'

export interface SquareGroupToggleProps<T> extends ExtraProps.DataInput<T[]> {
  disabled?: boolean
  options: Array<{
    label: ReactNode
    id: T
  }>
}

interface OptionProps {
  active?: boolean
  disabled?: boolean
}

const Option = styled.div<OptionProps>`
  height: 38px;
  width: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: ${({ theme }) => theme.space()};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;
  z-index: 1;
  color: ${({ theme, active }) => (active ? theme.master.back : theme.master.front)};
  img {
    width: 100%;
    height: 100%;
  }
  &:before {
    height: ${({ active }) => (active ? '100%' : '0')};
    width: ${({ active }) => (active ? '100%' : '0')};
    position: absolute;
    content: '';
    display: block;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    border-radius: ${({ active }) => (active ? '0' : '50%')};
    background-color: ${({ theme }) => theme.accent.primary};
    transition: all 0.2s;
    z-index: -1;
  }
`

export const SquareGroupToggle = <T extends number | string>({
  options,
  value,
  onChange,
  disabled,
}: SquareGroupToggleProps<T>) => {
  return (
    <SquareGroup disabled={disabled}>
      {options.map(opt => (
        <Option
          key={opt.id}
          disabled={disabled}
          active={value?.includes?.(opt.id)}
          onClick={() =>
            !disabled &&
            onChange?.(
              value?.some?.(v => v === opt.id) ? value?.filter?.(v => v !== opt.id) ?? [] : [...(value ?? []), opt.id],
            )
          }
        >
          {opt.label}
        </Option>
      ))}
    </SquareGroup>
  )
}
