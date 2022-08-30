import { FC } from 'react'
import { useModule } from 'mobmarch'
import { GameProfileService } from 'core/services/GameProfile.service'
import styled from 'styled-components'
import { Screen } from 'components/utils/Screen'
import { VersionItem } from 'screens/Main/VersionsSubscreen/VersionItem'

const Page = styled(Screen)``

export const VersionsSubscreen: FC = () => {
  const gp = useModule(GameProfileService)

  return (
    <Page>
      {gp.profiles.map(v => (
        <VersionItem profile={v} key={v.lastVersionId} />
      ))}
    </Page>
  )
}
