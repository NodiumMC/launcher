import { FC } from 'react'
import { Defer, Observer, useModule } from 'mobmarch'
import styled from 'styled-components'
import { Screen } from 'components/utils/Screen'
import { InstanceItem } from './InstanceItem'
import { InstanceStore } from 'minecraft/InstanceStore.service'
import { GameProfileService } from 'core/services/GameProfile.service'

const Page = styled(Screen)`
  display: flex;
  gap: 6px;
  flex-direction: column;
  overflow-y: scroll;
  min-height: 100%;
  width: auto;
`

export const InstancesSubscreen: FC = Observer(() => {
  const istorage = useModule(InstanceStore)

  console.log(istorage)

  return (
    <Page>
      <Defer depend={GameProfileService}>
        {istorage.map(v => (
          <InstanceItem instance={v} key={v.settings.name} />
        ))}
      </Defer>
    </Page>
  )
})
