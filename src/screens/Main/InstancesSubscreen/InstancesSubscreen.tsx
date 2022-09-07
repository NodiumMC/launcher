import { FC } from 'react'
import { Observer, useModule } from 'mobmarch'
import { GameProfileService } from 'core/services/GameProfile.service'
import styled from 'styled-components'
import { Screen } from 'components/utils/Screen'
import { InstanceItem } from 'screens/Main/InstancesSubscreen/VersionItem'

const Page = styled(Screen)``

export const InstancesSubscreen: FC = Observer(() => {
    const gp = useModule(GameProfileService)

    return (
      <Page>
        {gp.profiles.map(v => (
          <InstanceItem profile={v} key={v.lastVersionId} />
        ))}
      </Page>
    )
  }
)
