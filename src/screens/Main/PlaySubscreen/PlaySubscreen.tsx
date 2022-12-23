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

const Page = styled(Screen)`
  display: flex;
  flex-direction: column;
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
`

const Instances: FC = observer(() => {
  const istore = useMod(InstanceStore)
  const popup = useMod(PopupService)
  return (
    <div>
      {istore.instances.map((v, idx) => (
        <InstanceItem instance={v} key={idx} />
      ))}
      <Add onClick={() => popup.create(InstanceEditor, {})}>
        <FontAwesomeIcon icon={'plus'} />
      </Add>
    </div>
  )
})

export const PlaySubscreen: FC = observer(() => {
  return (
    <Page>
      <Instances />
    </Page>
  )
})
