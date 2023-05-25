import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { styled } from '@lmpx/styled'
import { NavSidebarProps } from './nav-sidebar.interface'
import { styles } from './styles'
import { Item } from './item'
import { Splitter } from './splitter'

const NavSidebarElement = styled.div(styles)

export const NavSidebar: FC<NavSidebarProps> = ({ topItems, bottomItems }) => {
  const { pathname } = useLocation()

  const nav = useNavigate()

  function active(path: string) {
    return pathname === path
  }

  return (
    <NavSidebarElement>
      {topItems.map(item => (
        <Item icon={item.icon} key={item.path} isActive={active(item.path)} onClick={() => nav(item.path)} />
      ))}
      <Splitter />
      {bottomItems.map(item => (
        <Item icon={item.icon} key={item.path} isActive={active(item.path)} onClick={() => nav(item.path)} />
      ))}
    </NavSidebarElement>
  )
}
