import { FC } from 'react'
import styled from 'styled-components'
import { LauncherProfile } from 'core'
import { Img } from '../utils/Img'
import { Text } from '../micro/Text'
import { Button } from '../micro/Button'
import { useI18N } from 'hooks'
import { Observer } from 'mobmarch'

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.backShade};
  transition: background-color ${({ theme }) => theme.transition.time};
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  &:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.colors.back};
  }
`

const Icon = styled(Img)`
  width: 40px;
  background-color: ${({ theme }) => theme.colors.mid};
  border-radius: 10px;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export interface GameProfileProps {
  profile: LauncherProfile
}

export const GameProfile: FC<GameProfileProps> = Observer(({ profile }) => {
  const i18n = useI18N()
  return (
    <Wrapper>
      <Icon src={profile.icon} />
      <Text ns>{profile.name}</Text>
      <Text ns shade>
        {profile.lastVersionId}
      </Text>
      <Actions>
        <Button>{i18n.translate.minecraft.settings}</Button>
        <Button primary>{i18n.translate.minecraft.play}</Button>
      </Actions>
    </Wrapper>
  )
})
