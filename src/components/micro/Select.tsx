import { useMemo } from 'react'
import ReactSelect, { Props } from 'react-select'
import styled, { css } from 'styled-components'
import { transition } from 'style'
import { rgba } from 'polished'

const StyledSelect = styled(ReactSelect)<Pick<SelectProps, 'mini' | 'square'>>`
  .Select__control {
    background: ${({ theme }) => theme.master.back};
    border: 0 solid ${({ theme }) => theme.master.shade()};
    background-color: ${({ theme }) => theme.master.shade()};
    border-radius: ${({ theme }) => theme.radius()};
    box-shadow: none;
    height: 36px;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    min-width: 38px;
    width: ${({ square }) => (square ? '38px' : 'initial')};
    img {
      height: 24px;
    }

    &:hover {
      border-color: ${({ theme }) => theme.master.shade(0.1)};
    }
  }

  .Select__indicators {
    ${({ mini }) => mini && 'display: none;'}
  }

  .Select__control--is-focused {
    border-color: ${({ theme }) => theme.accent.primary} !important;
  }

  .Select__indicator-separator {
    background-color: ${({ theme }) => theme.master.shade(0.1)};
    width: 2px;
  }

  .Select__dropdown-indicator {
    color: ${({ theme }) => theme.master.shade(0.25)};

    &:hover {
      color: ${({ theme }) => theme.master.shade(0.3)};
    }
  }

  .Select__menu {
    background: ${({ theme, mini }) => (mini ? theme.master.shade() : theme.master.back)};
    border: ${({ mini, theme }) => (mini ? 'none' : `2px solid ${theme.master.shade()}`)};
    border-radius: ${({ theme }) => theme.radius()};
    padding: 0 !important;
    min-height: 38px;
    ${({ mini }) => mini && 'margin: 0; bottom: 0;'}
  }

  .Select__menu-notice {
    ${({ mini }) => mini && 'display: none;'}
  }

  .Select__value-container {
    ${({ mini }) => mini && 'margin: 0; padding: 0;'}
  }

  .Select__value-container .Select__placeholder {
    font-weight: bold;
    color: ${({ theme }) => theme.master.shade(0.35)};
    ${({ mini }) => mini && 'display: none;'}
  }
  .Select__value-container--has-value {
    font-weight: bold;
    .Select__single-value {
      color: ${({ theme }) => theme.accent.primary};
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .Select__option {
    height: 36px;
    display: flex;
    align-items: center;
    ${({ mini }) =>
      mini &&
      css`
        margin: 0 !important;
        padding: 0 !important;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
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
    background-color: ${({ theme }) => rgba(theme.accent.primary, 0.2)} !important;
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
    color: ${({ theme }) => theme.master.shade(0.5)};
  }
`

export interface SelectOption<Label> {
  value: string
  label: Label
}

export interface SelectProps<Value = string, Label = unknown> extends ExtraProps.DataInput<Value> {
  options?: SelectOption<Label>[]
  menuPlacement?: Props['menuPlacement']
  placeholder?: Props['placeholder']
  isLoading?: boolean
  maxMenuHeight?: number
  mini?: boolean
  square?: boolean
}

export const Select = <Value extends string = any, Label = unknown>({
  value,
  options = [],
  onChange,
  maxMenuHeight = 5,
  mini,
  ...props
}: SelectProps<Value, Label> & ExtraProps.Styled) => {
  const defaultValue = useMemo(() => options?.find(v => v.value === value), [options, value])

  return (
    <StyledSelect
      {...props}
      mini={mini}
      classNamePrefix={'Select'}
      options={options}
      defaultValue={defaultValue}
      maxMenuHeight={maxMenuHeight * 38}
      onChange={v => onChange?.((v as any).value)}
      isSearchable={!mini}
      hideSelectedOptions={mini}
    />
  )
}
