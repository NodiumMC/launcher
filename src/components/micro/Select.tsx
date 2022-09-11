import { useMemo } from 'react'
import ReactSelect, { Props } from 'react-select'
import styled from 'styled-components'
import { transition } from 'style'
import { DataInput, Styled } from 'utils/UtilityProps'
import { rgba } from 'polished'

const StyledSelect = styled(ReactSelect)`
  .Select__control {
    background: ${({ theme }) => theme.palette.back.default};
    border: 2px solid ${({ theme }) => theme.palette.back.shades[0]};
    border-radius: ${({ theme }) => theme.shape.radius[0]};
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
      border-color: ${({ theme }) => theme.palette.back.shades[1]};
    }
  }

  .Select__control--is-focused {
    border-color: ${({ theme }) => theme.palette.accent.default} !important;
  }

  .Select__indicator-separator {
    background-color: ${({ theme }) => theme.palette.back.shades[0]};
    width: 2px;
  }

  .Select__dropdown-indicator {
    color: ${({ theme }) => theme.palette.back.shades[4]};

    &:hover {
      color: ${({ theme }) => theme.palette.back.shades[5]};
    }
  }

  .Select__menu {
    background: ${({ theme }) => theme.palette.back.default};
    border: 2px solid ${({ theme }) => theme.palette.back.shades[0]};
    border-radius: ${({ theme }) => theme.shape.radius[0]};
    padding: 0;
  }

  .Select__value-container--has-value {
    .Select__single-value {
      color: ${({ theme }) => theme.palette.accent.default};
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
    background-color: ${({ theme }) => theme.palette.back.shades[0]};
  }

  .Select__option--is-selected {
    background-color: ${({ theme }) =>
      rgba(theme.palette.accent.default, 0.2)} !important;
    color: ${({ theme }) => theme.palette.front.default};
  }

  .Select__control--is-disabled {
    background-color: ${({ theme }) => theme.palette.back.shades[0]};
  }

  .Select__multi-value {
    background-color: ${({ theme }) => theme.palette.back.shades[1]};
  }

  .Select__multi-value__label {
    color: ${({ theme }) => theme.palette.front.default};
  }

  .Select__multi-value__remove {
    &:hover {
      background-color: ${({ theme }) => theme.palette.red.default};
      color: ${({ theme }) => theme.palette.front.default};
    }

    margin-left: 6px;
    ${transition()}
  }

  .Select__input-container {
    color: ${({ theme }) => theme.palette.back.shades[3]};
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
  extends DataInput<Value> {
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
}: SelectProps<Value, Label> & Styled) => {
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
