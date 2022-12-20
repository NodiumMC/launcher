import { FC } from 'react'
import { Screen } from 'components/utils/Screen'
import styled from 'styled-components'
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
