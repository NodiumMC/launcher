import { FC } from 'react'
import { Screen } from 'components/utils/Screen'
import styled from 'styled-components'
import { NotImplemented } from 'components/micro/NotImplemented'
import { Button } from 'components/micro/Button'
import { InstanceStore } from 'minecraft/InstanceStore.service'
import { useMod } from 'hooks/useMod'
import { observer } from 'mobx-react'
import { InstanceItem } from 'screens/Main/PlaySubscreen/InstanceItem'

const Page = styled(Screen)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space()};
  height: 100%;
  position: relative;
`

const Nimpl = styled(NotImplemented)`
  flex-grow: 1;
`

const PlayBtn = styled(Button)`
  &[disabled] {
    filter: saturate(0);
  }
`

const Instances: FC = observer(() => {
  const istore = useMod(InstanceStore)
  return (
    <div>
      {istore.instances.map((v, idx) => (
        <InstanceItem instance={v} key={idx} />
      ))}
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
