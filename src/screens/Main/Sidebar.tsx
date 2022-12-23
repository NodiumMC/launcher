import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import { transition } from 'style'
import { rgba } from 'polished'

interface SidebarItem<T extends string | number = number> extends ExtraProps.Changeable<T> {
  id: T
  icon: IconName
}

interface SidebarProps {
  items: SidebarItem[]
  selected?: string | number
}

const StyledSidebar = styled.div`
  position: relative;
  width: 50px;
  height: 100%;
  border-radius: ${({ theme }) => theme.radius()};
  z-index: 1;
  border-right: 1px solid ${({ theme }) => theme.master.shade()};
  padding-right: 6px;
  box-sizing: content-box;
`

const Selector = styled.div<{ position: number }>`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: inherit;
  transform: translateY(calc(${({ position }) => position} * 100%));
  top: 0;
  left: 0;
  border: 2px solid ${({ theme }) => theme.accent.primary};
  background-size: 200%;
  z-index: -1;
  background-color: ${({ theme }) => rgba(theme.accent.primary, 0.2)};
  ${transition('transform')}
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    filter: blur(10px);
    opacity: 0.5;
  }
`

const SidebarItem = styled.div<{ active: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme, active }) => (active ? theme.master.reshade(0.15) : theme.accent.primary)};
  font-size: 18px;
  cursor: pointer;
`

export const Sidebar: FC<SidebarProps> = ({ items, selected }) => {
  const selectedPosition = useMemo(() => items.findIndex(v => v.id === selected), [selected])

  return (
    <StyledSidebar>
      <Selector position={selectedPosition} />
      {items.map((v, i) => (
        <SidebarItem key={v.id} active={selectedPosition !== i} onClick={() => v.onChange?.(v.id)}>
          <FontAwesomeIcon icon={v.icon} />
        </SidebarItem>
      ))}
    </StyledSidebar>
  )
}
