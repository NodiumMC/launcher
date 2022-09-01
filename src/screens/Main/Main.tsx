import { FC } from 'react'
import {
  MainScreenPage,
  MainScreenSidebarSubrouter,
  MainScreenSubRouter,
  SubRoute,
} from './MainScreenSubRouter'
import { Defer } from 'mobmarch'
import { Text } from 'components/micro/Text'
import { PlaySubscreen } from 'screens/Main/PlaySubscreen'
import { VersionsSubscreen } from 'screens/Main/VersionsSubscreen'
import { InstanceStore } from 'minecraft/InstanceStore.service'
import { LoadingScreen } from 'components/utils/Screen'

export const Main: FC = () => {
  return (
    <Defer depend={MainScreenSubRouter}>
      <MainScreenSidebarSubrouter>
        <SubRoute icon={'play'} to={MainScreenPage.PLAY}>
          <PlaySubscreen />
        </SubRoute>
        <SubRoute icon={'cubes'} to={MainScreenPage.VERSIONS}>
          <Defer depend={InstanceStore} fallback={<LoadingScreen />}>
            <VersionsSubscreen />
          </Defer>
        </SubRoute>
        <SubRoute icon={'terminal'} to={MainScreenPage.CONSOLE}>
          <Text>456</Text>
        </SubRoute>
        <SubRoute icon={'gear'} to={MainScreenPage.SETTINGS}></SubRoute>
      </MainScreenSidebarSubrouter>
    </Defer>
  )
}
