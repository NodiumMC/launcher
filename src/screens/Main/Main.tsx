import { FC } from 'react'
import { MainScreenPage, MainScreenSidebarSubrouter, SubRoute } from './MainScreenSubRouter'
import { PlaySubscreen } from 'screens/Main/PlaySubscreen'
import { Components, Logs } from './DebugSubscreens'
import { JournalSubscreen } from 'screens/Main/JournalSubscreen/JournalSubscreen'
import { SettingsSubscreen } from 'screens/Main/SettingsSubscreen/SettingsSubscreen'

export const Main: FC = () => {
  return (
    <MainScreenSidebarSubrouter>
      <SubRoute icon={'play'} to={MainScreenPage.PLAY}>
        <PlaySubscreen />
      </SubRoute>
      <SubRoute icon={'terminal'} to={MainScreenPage.CONSOLE}>
        <JournalSubscreen />
      </SubRoute>
      <SubRoute icon={'gear'} to={MainScreenPage.SETTINGS}>
        <SettingsSubscreen />
      </SubRoute>
      <SubRoute icon={'puzzle-piece'} to={MainScreenPage.COMPONENTS} debug>
        <Components />
      </SubRoute>
      <SubRoute icon={'circle-notch'} to={MainScreenPage.LOGS} debug>
        <Logs />
      </SubRoute>
      {/*<SubRoute icon={'user'} to={MainScreenPage.USER}>*/}
      {/*  */}
      {/*</SubRoute>*/}
    </MainScreenSidebarSubrouter>
  )
}
