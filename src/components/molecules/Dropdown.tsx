import { FC, ReactNode, useMemo, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { font } from 'style'

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.master.shade()};
  border-radius: ${({ theme }) => theme.radius()};
  background-color: ${({ theme }) => theme.master.back};
  transition: all ${({ theme }) => theme.transition.time};
  position: relative;
  transition: all ${({ theme }) => theme.transition.time};
  min-width: 200px;
`

export interface DropdownItem {
  value: string
  label: string
  icon?: ReactNode
}

export interface DropdownProps extends ExtraProps.DataInput<string> {
  items: DropdownItem[]
}

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 35px;
  gap: 10px;
  z-index: 1;
  transition: inherit;
  cursor: pointer;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.master.back};
  border-radius: inherit;

  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.master.shade()};
  }
`

interface LabelProps {
  selected?: boolean
}

const Label = styled.span<LabelProps>`
  ${({ theme }) => font(theme.fonts.interact)};
  color: ${({ theme, selected }) => (selected ? theme.accent.primary : theme.master.front)};
  user-select: none;
  transition: inherit;
`

const IconWrapper = styled.div`
  width: 30px;
  height: 20px;
  border-radius: inherit;
  overflow: hidden;
  img {
    object-fit: contain;
  }
  * {
    width: 100%;
    height: 100%;
  }
`

const Item: FC<{ selected: DropdownItem } & ExtraProps.DataInput<DropdownItem>> = ({ selected, onChange, value }) => {
  return (
    <ItemWrapper onClick={() => onChange?.(value!)}>
      <IconWrapper>{value?.icon}</IconWrapper>
      <Label selected={selected.value === value?.value}>{value?.label}</Label>
    </ItemWrapper>
  )
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
  border-radius: inherit;
  border: 0px solid ${({ theme }) => theme.master.shade()};
  ${({ opened, theme }) =>
    opened
      ? `
    max-height: calc(3 * 40px);
    border: 2px solid ${theme.master.shade()};
  `
      : ''};
  transition-duration: 0.35s;
`

const Open = styled.div`
  height: 20px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.master.shade(0.3)};
  border-left: 1px solid ${({ theme }) => theme.master.shade()};
  cursor: pointer;
  transition: inherit;
`

export const Dropdown: FC<DropdownProps> = ({ items, value, onChange }) => {
  const selectedItem = useMemo(() => items.find(v => v.value === value), [items, value])

  const normalized = useMemo(
    () => ({
      ...selectedItem!,
      label: selectedItem?.label.padEnd(Math.max(...items.map(v => v.label.length)), ' ') ?? '',
    }),
    [value],
  )

  const [opened, setOpened] = useState(false)

  return (
    <Wrapper>
      <Item selected={selectedItem!} value={normalized} />
      <Open tabIndex={0} onClick={() => setOpened(!opened)} onBlur={() => setOpened(false)}>
        <FontAwesomeIcon icon={faAngleDown} />
      </Open>
      <List opened={opened}>
        {items
          .filter(i => selectedItem?.value !== i.value)
          .map((i, key) => (
            <Item key={key} selected={selectedItem!} value={i} onChange={({ value }) => onChange?.(value)} />
          ))}
      </List>
    </Wrapper>
  )
}
