import { FC } from 'react'
import styled from 'styled-components'
import { Screen } from 'components/utils/Screen'
import { Observer, useModule } from 'mobmarch'
import { GameProfileService } from 'core/services/GameProfile.service'
import { VersionItem } from 'screens/Main/VersionsSubscreen/VersionItem'

const Page = styled(Screen)`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`

export const VersionsSubscreen: FC = Observer(() => {
  const profileService = useModule(GameProfileService)

  return (
    <Page>
      {profileService.profiles.map(profile => (
        <VersionItem key={profile.lastVersionId} profile={profile} />
      ))}
    </Page>
  )
})
