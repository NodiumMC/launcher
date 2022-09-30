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
import { InstancesSubscreen } from 'screens/Main/InstancesSubscreen'
import { InstanceStore } from 'minecraft/InstanceStore.service'
import { LoadingScreen } from 'components/utils/Screen'
import { GameProfileService } from 'core/services/GameProfile.service'
import { PopupService } from 'notifications'
import { VersionsSubscreen } from './VersionsSubscreen'
import { I18n } from 'i18n'
import { Components } from './DebugSubscreens'

export const Main: FC = () => {
  return (
    <Defer depend={[MainScreenSubRouter, I18n]}>
      <MainScreenSidebarSubrouter>
        <SubRoute icon={'play'} to={MainScreenPage.PLAY}>
          <PlaySubscreen />
        </SubRoute>
        <SubRoute icon={'cubes'} to={MainScreenPage.INSTANCES}>
          <Defer
            depend={[InstanceStore, GameProfileService, PopupService]}
            fallback={<LoadingScreen />}
          >
            <InstancesSubscreen />
          </Defer>
        </SubRoute>
        <SubRoute icon={'download'} to={MainScreenPage.VERSIONS}>
          <Defer depend={GameProfileService}>
            <VersionsSubscreen />
          </Defer>
        </SubRoute>
        <SubRoute icon={'terminal'} to={MainScreenPage.CONSOLE}>
          <Text>456</Text>
        </SubRoute>
        <SubRoute icon={'gear'} to={MainScreenPage.SETTINGS}></SubRoute>
        <SubRoute icon={'puzzle-piece'} to={MainScreenPage.COMPONENTS} debug>
          <Components />
        </SubRoute>
        <SubRoute icon={'circle-notch'} to={MainScreenPage.LOGS} debug />
      </MainScreenSidebarSubrouter>
    </Defer>
  )
}
