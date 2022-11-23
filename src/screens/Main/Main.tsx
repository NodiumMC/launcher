import { FC } from 'react'
import { MainScreenPage, MainScreenSidebarSubrouter, MainScreenSubRouter, SubRoute } from './MainScreenSubRouter'
import { Defer } from 'mobmarch'
import { PlaySubscreen } from 'screens/Main/PlaySubscreen'
import { I18n } from 'i18n'
import { Components, Logs } from './DebugSubscreens'
import { DebugService } from 'debug'
import { JournalSubscreen } from 'screens/Main/JournalSubscreen/JournalSubscreen'

export const Main: FC = () => {
  return (
    <Defer depend={[MainScreenSubRouter, I18n]}>
      <MainScreenSidebarSubrouter>
        <SubRoute icon={'play'} to={MainScreenPage.PLAY}>
          <PlaySubscreen />
        </SubRoute>
        {/*<SubRoute icon={'cubes'} to={MainScreenPage.INSTANCES}>*/}
        {/*  <Defer depend={[InstanceStore, GameProfileService, PopupService]} fallback={<LoadingScreen />}>*/}
        {/*    <InstancesSubscreen />*/}
        {/*  </Defer>*/}
        {/*</SubRoute>*/}
        {/*<SubRoute icon={'download'} to={MainScreenPage.VERSIONS}>*/}
        {/*  <Defer depend={GameProfileService}>*/}
        {/*    <VersionsSubscreen />*/}
        {/*  </Defer>*/}
        {/*</SubRoute>*/}
        <SubRoute icon={'terminal'} to={MainScreenPage.CONSOLE}>
          <JournalSubscreen />
        </SubRoute>
        <SubRoute icon={'gear'} to={MainScreenPage.SETTINGS}></SubRoute>
        <SubRoute icon={'puzzle-piece'} to={MainScreenPage.COMPONENTS} debug>
          <Components />
        </SubRoute>
        <SubRoute icon={'circle-notch'} to={MainScreenPage.LOGS} debug>
          <Defer depend={[DebugService]}>
            <Logs />
          </Defer>
        </SubRoute>
      </MainScreenSidebarSubrouter>
    </Defer>
  )
}
