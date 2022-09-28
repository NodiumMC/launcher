import { useMemo } from 'react'
import ReactSelect, { Props } from 'react-select'
import styled from 'styled-components'
import { transition } from 'style'
import { rgba } from 'polished'

const StyledSelect = styled(ReactSelect)`
  .Select__control {
    background: ${({ theme }) => theme.master.back};
    border: 2px solid ${({ theme }) => theme.master.shade()};
    border-radius: ${({ theme }) => theme.radius()};
    box-shadow: none;
    height: 36px;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    img {
      height: 24px;
    }

    &:hover {
      border-color: ${({ theme }) => theme.master.shade(0.1)};
    }
  }

  .Select__control--is-focused {
    border-color: ${({ theme }) => theme.accent.primary} !important;
  }

  .Select__indicator-separator {
    background-color: ${({ theme }) => theme.master.shade()};
    width: 2px;
  }

  .Select__dropdown-indicator {
    color: ${({ theme }) => theme.master.shade(0.25)};

    &:hover {
      color: ${({ theme }) => theme.master.shade(0.3)};
    }
  }

  .Select__menu {
    background: ${({ theme }) => theme.master.back};
    border: 2px solid ${({ theme }) => theme.master.shade()};
    border-radius: ${({ theme }) => theme.radius()};
    padding: 0;
  }

  .Select__value-container--has-value {
    .Select__single-value {
      color: ${({ theme }) => theme.accent.primary};
    }
  }

  .Select__option {
    height: 36px;
    display: flex;
    align-items: center;
    img {
      height: 24px;
    }
    ${transition()}
  }

  .Select__option:hover,
  .Select__option--is-focused {
    background-color: ${({ theme }) => theme.master.shade()};
  }

  .Select__option--is-selected {
    background-color: ${({ theme }) =>
      rgba(theme.accent.primary, 0.2)} !important;
    color: ${({ theme }) => theme.master.front};
  }

  .Select__control--is-disabled {
    background-color: ${({ theme }) => theme.master.shade()};
  }

  .Select__multi-value {
    background-color: ${({ theme }) => theme.master.shade(0.1)};
  }

  .Select__multi-value__label {
    color: ${({ theme }) => theme.master.front};
  }

  .Select__multi-value__remove {
    &:hover {
      background-color: ${({ theme }) => theme.palette.red};
      color: ${({ theme }) => theme.master.front};
    }

    margin-left: 6px;
    ${transition()}
  }

  .Select__input-container {
    color: ${({ theme }) => theme.master.shade(0.2)};
  }

  height: 40px;
  max-width: 200px;
  border: 0;
`

export interface SelectOption<Label> {
  value: string
  label: Label
}

export interface SelectProps<Value = string, Label = unknown>
  extends ExtraProps.DataInput<Value> {
  options?: SelectOption<Label>[]
  menuPlacement?: Props['menuPlacement']
  placeholder?: Props['placeholder']
  isLoading?: boolean
  maxMenuHeight?: number
}

export const Select = <Value extends string = any, Label = unknown>({
  value,
  options = [],
  onChange,
  maxMenuHeight = 5,
  ...props
}: SelectProps<Value, Label> & ExtraProps.Styled) => {
  const defaultValue = useMemo(
    () => options?.find(v => v.value === value),
    [options, value],
  )

  return (
    <StyledSelect
      {...props}
      classNamePrefix={'Select'}
      options={options}
      defaultValue={defaultValue}
      maxMenuHeight={maxMenuHeight * 38}
      onChange={v => onChange?.((v as any).value)}
    />
  )
}
