import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import { transition } from 'style'
import { build, styield } from 'styield'
import { MainScreenPage } from 'screens/Main/MainScreenSubRouter'

interface SidebarItem<T extends string | number = number> extends ExtraProps.Changeable<T> {
  id: T
  icon: IconName
}

interface SidebarProps {
  items: SidebarItem[]
  selected?: string | number
}

const StyledSidebar = styled.div(({ theme }) =>
  build(
    styield
      .position('relative')
      .display('flex')
      .gap(theme.space())
      .flexDirection('column')
      .width('42px')
      .height('100%')
      .borderRadius(theme.radius())
      .zIndex(1)
      .borderRight(`1px solid ${theme.master.shade()}`)
      .paddingRight('6px')
      .boxSizing('content-box'),
  ),
)

const SelectionContainer = styled.div(() => build(styield.flexGrow(1).position('relative').borderRadius('inherit')))

const Selector = styled.div<{ position: number }>`
  position: absolute;
  width: 42px;
  height: 42px;
  border-radius: inherit;
  transform: translateY(calc(${({ position }) => (position <= -1 ? 20 : position)} * 100%));
  opacity: ${({ position }) => (position >= 0 ? 1 : 0)};
  top: 0;
  left: 0;
  background-size: 200%;
  z-index: -1;
  background-color: ${({ theme }) => theme.accent.primary};
  ${transition('all')}
`

const SidebarItem = styled.div<{ active: boolean; position: number }>`
  position: absolute;
  width: 42px;
  height: 42px;
  border-radius: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme, active }) => (active ? theme.master.reshade(0.6) : theme.master.back)};
  font-size: 16px;
  cursor: pointer;
  ${({ position }) => (position >= 0 ? `top: ${position * 42}px;` : `bottom: ${(position * -1 - 1) * 42}px;`)}
`

export const Sidebar: FC<SidebarProps> = ({ items, selected }) => {
  const selectedPosition = useMemo(() => items.find(v => v.id === selected)!.id, [selected])

  return (
    <StyledSidebar>
      <SelectionContainer>
        <Selector position={selectedPosition} />
        {items.map((v, i) => (
          <SidebarItem position={v.id} key={v.id} active={selectedPosition !== i} onClick={() => v.onChange?.(v.id)}>
            <FontAwesomeIcon icon={v.icon} />
          </SidebarItem>
        ))}
      </SelectionContainer>
    </StyledSidebar>
  )
}
