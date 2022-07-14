import { FC, ReactNode, useMemo, useState } from 'react'
import styled from 'styled-components'
import { DataEntriable } from '../../utils/UtilityProps'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.colors.backShade};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.back};
  transition: all ${({ theme }) => theme.transition.time};
  position: relative;
  transition: all ${({ theme }) => theme.transition.time};
  min-width: 200px;
`

export interface DropdownItem {
  id: string,
  label: string,
  icon?: ReactNode
}

export interface DropdownProps extends DataEntriable<DropdownItem> {
  items: DropdownItem[]
}

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  gap: 10px;
  z-index: 1;
  transition: inherit;
  cursor: pointer;
  padding: 0 10px;

  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.colors.backShade};
  }
`

interface LabelProps {
  selected?: boolean
}

const Label = styled.span<LabelProps>`
  font-family: ${({ theme }) => theme.fonts.interact};
  color: ${({ theme, selected }) => selected ? theme.colors.accent : theme.colors.front};
  user-select: none;
  transition: inherit;
`

const IconWrapper = styled.div`
  width: 30px;
  height: 20px;
  border-radius: 5px;
  overflow: hidden;
  * {
    width: 100%;
    height: 100%;
  }
`

const Item: FC<{ selected: DropdownItem } & DataEntriable<DropdownItem>> = ({ selected, onChange, value }) => {
  return <ItemWrapper onClick={() => onChange?.(value!)}>
    <IconWrapper>
      {value?.icon}
    </IconWrapper>
    <Label selected={selected.id === value?.id}>{value?.label}</Label>
  </ItemWrapper>
}

interface ListProps {
  opened?: boolean
}

const List = styled.div<ListProps>`
  box-sizing: content-box;
  position: absolute;
  top: 40px;
  left: -2px;
  width: 100%;
  max-height: 0;
  overflow: scroll;
  transition: inherit;
  border-radius: 10px;
  border: 0px solid ${({ theme }) => theme.colors.backShade};
  ${({ opened, theme }) => opened ? `
    max-height: calc(3 * 40px);
    border: 2px solid ${theme.colors.backShade};
  ` : ''};
  transition-duration: .35s;
`

const Open = styled.div`
  height: 20px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.mid};
  border-left: 1px solid ${({ theme }) => theme.colors.backShade};
  cursor: pointer;
  transition: inherit;
`

export const Dropdown: FC<DropdownProps> = ({ items, value, onChange }) => {
  const normalized = useMemo(() => ({
    ...value!,
    label: value?.label.padEnd(Math.max(...items.map(v => v.label.length)), ' ') ?? '',
  }), [value])

  const [opened, setOpened] = useState(false)

  return <Wrapper>
    <Item selected={value!} value={normalized} />
    <Open tabIndex={0} onClick={() => setOpened(!opened)} onBlur={() => setOpened(false)}>
      <FontAwesomeIcon icon={faAngleDown} />
    </Open>
    <List opened={opened}>
      {items.filter(i => value?.id !== i.id).map((i, key) => <Item key={key} selected={value!} value={i} onChange={onChange} />)}
    </List>
  </Wrapper>
}
