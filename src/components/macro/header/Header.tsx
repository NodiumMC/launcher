import { FC } from 'react'
import styled from 'styled-components'
import { Empty } from '../../utils/Empty'
import { WindowControl } from './WindowControl'
import { font } from 'components/utils/Font'

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
      initial-value: ${({ theme }) => theme.palette.back.shades[0]};
      inherits: false;
    }
    background: linear-gradient(
      90deg,
      transparent,
      var(--hdcolor),
      transparent
    );
    --hdcolor: ${({ theme }) => theme.palette.back.shades[0]};
    transition: --hdcolor ${({ theme }) => theme.transition.time};
  }
`

const Title = styled.div`
  ${({ theme }) => font(theme.fonts.interact)}
  color: ${({ theme }) => theme.palette.back.shades[2]};
  user-select: none;
  transition: color ${({ theme }) => theme.transition.time};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

export const Header: FC = () => {
  return (
    <HeaderBlock data-tauri-drag-region>
      <Empty />
      <Title data-tauri-drag-region>Nodium Launcher</Title>
      <WindowControl />
    </HeaderBlock>
  )
}
