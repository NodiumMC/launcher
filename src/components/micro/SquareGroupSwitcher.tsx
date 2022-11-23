import { ReactNode } from 'react'
import { SquareGroup } from 'components/micro/SquareGroup'
import styled from 'styled-components'

export interface SquareGroupSwitcherProps<T> extends ExtraProps.DataInput<T> {
  disabled?: boolean
  disoptions?: T[]
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
  opacity: ${({ disabled }) => (disabled ? '0.3' : '1')};
  filter: ${({ disabled }) => (disabled ? 'grayscale(1)' : 'none')};
`

interface SelectorProps {
  offset: number
}

const Selector = styled.div.attrs<SelectorProps>(({ offset }) => ({
  style: {
    left: `${offset * 38}px`,
  },
}))<SelectorProps>`
  position: absolute;
  height: 38px;
  width: 38px;
  background-color: ${({ theme }) => theme.accent.primary};
  border-radius: ${({ theme }) => theme.radius()};
  transition: all 0.3s;
`

export const SquareGroupSwitcher = <T extends string | number>({
  disabled,
  value,
  onChange,
  disoptions,
  options,
}: SquareGroupSwitcherProps<T>) => {
  return (
    <SquareGroup disabled={disabled}>
      {options.map(opt => (
        <Option
          key={opt.id}
          disabled={disabled || disoptions?.includes?.(opt.id)}
          onClick={() => !disabled && !disoptions?.includes?.(opt.id) && onChange?.(opt.id)}
          active={value === opt.id}
        >
          {opt.label}
        </Option>
      ))}
      {value && <Selector offset={options.findIndex(v => v.id === value)} />}
    </SquareGroup>
  )
}
