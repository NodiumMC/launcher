import { FC } from 'react'
import { Screen } from 'components/utils/Screen'
import styled from 'styled-components'
import { InstanceStore } from 'minecraft/InstanceStore.service'
import { useMod } from 'hooks/useMod'
import { observer } from 'mobx-react'
import { InstanceItem } from 'screens/Main/PlaySubscreen/InstanceItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PopupService } from 'notifications'
import { InstanceEditor } from 'components/organisms/InstanceEditor'
import { Input } from 'components/atoms/Input'
import { PlayerLiteService } from 'user/PlayerLite.service'
import useEvent from 'react-use-event-hook'
import { inputValue } from 'utils'

const Page = styled(Screen)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space()};
  height: 100%;
  position: relative;
`

const Add = styled.div`
  height: 48px;
  border: 1px solid ${({ theme }) => theme.master.shade()};
  border-radius: ${({ theme }) => theme.radius()};
  color: ${({ theme }) => theme.master.shade(0.3)};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.space(2)};
  cursor: pointer;
  flex-shrink: 0;
`

const InstancesList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`

const Instances: FC = observer(() => {
  const istore = useMod(InstanceStore)
  const popup = useMod(PopupService)
  return (
    <InstancesList>
      {istore.instances.map((v, idx) => (
        <InstanceItem instance={v} key={idx} />
      ))}
      <Add onClick={() => popup.create(InstanceEditor, {})}>
        <FontAwesomeIcon icon={'plus'} />
      </Add>
    </InstancesList>
  )
})

const Other = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space()};
`

const EmptyBg = styled.div`
  border-radius: ${({ theme }) => theme.radius()};
  background-color: ${({ theme }) => theme.master.shade()};
  flex-grow: 1;
`

const NicknameInput = styled(Input)`
  width: 256px;
`

const NicknamePanel: FC = observer(() => {
  const player = useMod(PlayerLiteService)

  const input = useEvent((value: string) => {
    player.nickname = value
  })

  return (
    <Other>
      <NicknameInput
        placeholder={'Nickname'}
        onChange={inputValue(input)}
        value={player.nickname}
        invalid={!player.isValid}
      />
      <EmptyBg />
    </Other>
  )
})

export const PlaySubscreen: FC = observer(() => {
  return (
    <Page>
      <Instances />
      <NicknamePanel />
    </Page>
  )
})
