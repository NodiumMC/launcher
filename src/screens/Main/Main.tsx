import { FC } from 'react'
import { lazy } from 'utils/import'
import { MainScreenPage, MainScreenSidebarSubrouter, SubRoute } from './MainScreenSubRouter'
const { PlaySubscreen } = lazy(() => import('screens/Main/PlaySubscreen'), 'PlaySubscreen')
const { JournalSubscreen } = lazy(() => import('screens/Main/JournalSubscreen/JournalSubscreen'), 'JournalSubscreen')
const { SettingsSubscreen } = lazy(() => import('screens/Main/SettingsSubscreen/SettingsSubscreen'), 'SettingsSubscreen')
const { Components } = lazy(() => import('./DebugSubscreens'), 'Components')
const { Logs } = lazy(() => import('./DebugSubscreens'), 'Logs')

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
    </MainScreenSidebarSubrouter>
  )
}
