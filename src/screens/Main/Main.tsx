import { FC } from 'react'
import { MainScreenPage, MainScreenSidebarSubrouter, MainScreenSubRouter, SubRoute } from './MainScreenSubRouter'
import { Defer } from 'mobmarch'
import { PlaySubscreen } from 'screens/Main/PlaySubscreen'
import { I18n } from 'i18n'
import { Components, Logs } from './DebugSubscreens'
import { JournalSubscreen } from 'screens/Main/JournalSubscreen/JournalSubscreen'
import { SettingsSubscreen } from 'screens/Main/SettingsSubscreen/SettingsSubscreen'
import { MinecraftJournal } from 'minecraft/MinecraftJournal.service'
import { DebugService } from 'debug'

export const Main: FC = () => {
  return (
    <Defer depend={[MainScreenSubRouter, I18n]}>
      <MainScreenSidebarSubrouter>
        <SubRoute icon={'play'} to={MainScreenPage.PLAY}>
          <PlaySubscreen />
        </SubRoute>
        <SubRoute icon={'terminal'} to={MainScreenPage.CONSOLE}>
          <Defer depend={MinecraftJournal}>
            <JournalSubscreen />
          </Defer>
        </SubRoute>
        <SubRoute icon={'gear'} to={MainScreenPage.SETTINGS}>
          <SettingsSubscreen />
        </SubRoute>
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
