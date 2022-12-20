import { FC } from 'react'
import styled from 'styled-components'
import { Empty } from '../../utils/Empty'
import { WindowControl } from './WindowControl'
import { font } from 'style'
import { useDebugMode } from 'hooks'
import { observer } from 'mobx-react'

const HeaderBlock = styled.div`
  height: 26px;
  padding-bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 100;

  &:after,
  &:before {
    content: '';
    position: absolute;
    display: block;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    height: 1px;
    width: 100%;
  }

  &:after {
    @property --hdcolor {
      syntax: '<color>';
      initial-value: ${({ theme }) => theme.master.shade()};
      inherits: false;
    }
    background: linear-gradient(90deg, transparent, var(--hdcolor), transparent);
    --hdcolor: ${({ theme }) => theme.master.shade()};
    transition: --hdcolor ${({ theme }) => theme.transition.time};
  }
`

const Title = styled.div`
  ${({ theme }) => font(theme.fonts.interact)}
  color: ${({ theme }) => theme.master.shade(0.15)};
  user-select: none;
  transition: color ${({ theme }) => theme.transition.time};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

const Debug = styled.span`
  color: ${({ theme }) => theme.palette.red};
  user-select: none;
  pointer-events: none;
`

export const Header: FC = observer(() => {
  const debug = useDebugMode()

  return (
    <HeaderBlock data-tauri-drag-region>
      <Empty />
      <Title data-tauri-drag-region>Nodium Launcher {debug && <Debug>Debug</Debug>}</Title>
      <WindowControl />
    </HeaderBlock>
  )
})
