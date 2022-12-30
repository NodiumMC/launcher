import { FC } from 'react'
import styled from 'styled-components'
import { Screen } from 'components/utils/Screen'
import { Img } from 'components/utils/Img'
import { Text } from 'components/atoms/Text'
import logo from 'assets/img/logo.png'
import { version } from 'native/app'
import { linearGradient } from 'polished'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { open } from '@tauri-apps/api/shell'

const Page = styled(Screen)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space(8)};
  flex-direction: column;
  position: relative;
  z-index: 1;
`

const Logo = styled(Img)`
  height: 64px;
  width: 64px;
`

const Name = styled(Text)`
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background: ${({ theme }) =>
    linearGradient({ colorStops: [theme.accent.primary, theme.accent.secondary], toDirection: '45deg' })};
  position: relative;
  & * {
    position: absolute;
    bottom: 0;
    font-size: inherit;
    width: 100%;
    z-index: -1;
  }
`

const Back = styled(NavLink)`
  width: 48px;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.master.shade(0.3)};
  color: ${({ theme }) => theme.master.shade(0.3)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 30px 1px rgba(0, 0, 0, 0.1);
`

const Authors = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space()};
`

const Author = styled.div`
  &:before {
    content: '@ ';
    color: ${({ theme }) => theme.master.shade(0.3)};
  }
  padding: ${({ theme }) => theme.space(2)};
  border-radius: ${({ theme }) => theme.radius()};
  border: 1px solid ${({ theme }) => theme.master.shade(0.1)};
  cursor: pointer;
  box-shadow: 0 0 30px 1px rgba(0, 0, 0, 0.1);
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space()};
  align-items: center;
`

const Creator = styled(Author)`
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background: ${({ theme }) =>
    linearGradient({ colorStops: [theme.accent.primary, theme.accent.secondary], toDirection: '45deg' })};
  font-weight: bold;
`

export const About: FC = () => {
  return (
    <Page>
      <Logo src={logo} />
      <Col>
        <Name interaction weight={'black'} size={30}>
          Nodium Launcher
        </Name>
        <Text>v {version}</Text>
      </Col>
      <Authors>
        <Creator onClick={() => open('https://github.com/LIMPIX31')}>LIMPIX31</Creator>
        <Author onClick={() => open('https://github.com/maslakovSaveliy')}>maslakovSaveliy</Author>
      </Authors>
      <Back to={'/'}>
        <FontAwesomeIcon icon={'arrow-left'} />
      </Back>
    </Page>
  )
}
