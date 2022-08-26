import { FC } from 'react'
import {
  MainScreenPage,
  MainScreenSidebarSubrouter,
  MainScreenSubRouter,
  SubRoute,
} from './MainScreenSubRouter'
import { Defer } from 'mobmarch'
import { Text } from 'components/micro/Text'

export const Main: FC = () => {
  return (
    <Defer depend={MainScreenSubRouter}>
      <MainScreenSidebarSubrouter>
        <SubRoute icon={'play'} to={MainScreenPage.PLAY}>
          <Text>123</Text>
        </SubRoute>
        <SubRoute icon={'terminal'} to={MainScreenPage.CONSOLE}>
          <Text>456</Text>
        </SubRoute>
      </MainScreenSidebarSubrouter>
    </Defer>
  )
}
