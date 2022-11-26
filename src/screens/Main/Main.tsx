import { FC } from 'react'
import { MainScreenPage, MainScreenSidebarSubrouter, MainScreenSubRouter, SubRoute } from './MainScreenSubRouter'
import { Defer } from 'mobmarch'
import { PlaySubscreen } from 'screens/Main/PlaySubscreen'
import { I18n } from 'i18n'
import { Components, Logs } from './DebugSubscreens'
import { DebugService } from 'debug'
import { JournalSubscreen } from 'screens/Main/JournalSubscreen/JournalSubscreen'
import { BlakeMapService } from 'minecraft/BlakeMap.service'
import { CentralConfig } from 'storage'
import { SettingsSubscreen } from 'screens/Main/SettingsSubscreen/SettingsSubscreen'
import { MinecraftJournal } from 'minecraft/MinecraftJournal.service'

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
          <Defer depend={CentralConfig}>
            <SettingsSubscreen />
          </Defer>
        </SubRoute>
        <SubRoute icon={'puzzle-piece'} to={MainScreenPage.COMPONENTS} debug>
          <Components />
        </SubRoute>
        <SubRoute icon={'circle-notch'} to={MainScreenPage.LOGS} debug>
          <Defer depend={[DebugService, BlakeMapService]}>
            <Logs />
          </Defer>
        </SubRoute>
      </MainScreenSidebarSubrouter>
    </Defer>
  )
}
