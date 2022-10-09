import { FC } from 'react'
import { Screen } from 'components/utils/Screen'
import { Observer } from 'mobmarch'
import styled, { css } from 'styled-components'
import { NotImplemented } from 'components/micro/NotImplemented'
import { DownloadBar } from 'screens/Main/PlaySubscreen/DownloadBar'
import { Button } from 'components/micro/Button'
import { Pair } from 'components/utils/Pair'
import { rgba } from 'polished'
import { Select } from 'components/micro/Select'
import { ProviderIcon, SupportedProviders, VersionProvider } from 'core/client-providers'
import { Img } from 'components/utils/Img'
import { Text } from 'components/micro/Text'
import { ProviderSelect } from 'screens/Main/PlaySubscreen/ProviderSelect'
import { VersionSelector } from 'screens/Main/PlaySubscreen/VersionSelector'

const Page = styled(Screen)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space()};
  height: 100%;
`

const Nimpl = styled(NotImplemented)`
  flex-grow: 1;
`

const PlayBtn = styled(Button)`
  ${({ theme }) => css`
    background: conic-gradient(from 101.77deg at 0% 56%, ${theme.accent.secondary} 45.12%, ${theme.accent.primary} 100%),
      conic-gradient(from 315deg at 92% 100%, ${theme.accent.secondary} 0%, ${theme.accent.primary} 25.94%),
      repeating-radial-gradient(ellipse at 95% 2%, ${theme.accent.secondary} 0%, ${theme.accent.primary} 100%),
      repeating-linear-gradient(
        225deg,
        ${theme.accent.primary} 0%,
        ${theme.accent.secondary} 45.27027027027027%,
        ${theme.accent.primary} 100%
      ),
      linear-gradient(45deg, ${theme.accent.primary} 1%, ${theme.accent.secondary} 100%);
    background-blend-mode: saturation, saturation, darken, color, normal;
  `}
  border: none;
  color: ${({ theme }) => theme.master.back};

  &:hover {
    box-shadow: none;
  }

  &:before,
  &:after {
    display: block;
    content: '';
    position: absolute;
    left: 50%;
    translate: -50%;
    top: 6px;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: inherit;
    filter: blur(8px);
    z-index: -1;
    opacity: 0.5;
  }

  &:after {
    top: 12px;
    width: 110%;
    opacity: 0.2;
    filter: blur(15px);
  }

  &[disabled] {
    filter: saturate(0);
  }
`

export const PlaySubscreen: FC = Observer(() => {
  return (
    <Page>
      <Nimpl />
      <Pair>
        {/*<Select menuPlacement={'top'} placeholder={'аккаунт'} />*/}
        <ProviderSelect />
        <VersionSelector />
        <PlayBtn icon={'bolt'}>Играть</PlayBtn>
      </Pair>
      <DownloadBar prepare={0} value={0} />
    </Page>
  )
})
