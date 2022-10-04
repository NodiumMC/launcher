import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { Screen } from 'components/utils/Screen'
import { Observer, useModule } from 'mobmarch'
import { GameProfileService } from 'core/services/GameProfile.service'
import { VersionItem } from 'screens/Main/VersionsSubscreen/VersionItem'
import { InstallMenu } from 'screens/Main/VersionsSubscreen/InstallMenu'

const Page = styled(Screen)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const VesionContainer = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`

export const VersionsSubscreen: FC = Observer(() => {
  const profileService = useModule(GameProfileService)

  const list = useMemo(() => profileService.list, [profileService, profileService.list])

  return (
    <Page>
      <VesionContainer>
        {list.map(profile => (
          <VersionItem key={profile.options.lastVersionId} profile={profile} />
        ))}
      </VesionContainer>
      <InstallMenu />
    </Page>
  )
})
