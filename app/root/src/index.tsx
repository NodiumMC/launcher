import { FC } from 'react'
import { withProviders } from '@app/providers'
import { Routes } from '@app/routes'
import { Window } from '@ui/window'
import { NavSidebar } from '@ui/nav-sidebar'
import { FaSolidBoltLightningIcon, FaSolidDownloadIcon } from '@ui/icons'

const App: FC = () => (
  <Window
    sidebar={
      <NavSidebar
        topItems={[
          {
            path: '/',
            icon: <FaSolidBoltLightningIcon />,
          },
          {
            path: '/downloads',
            icon: <FaSolidDownloadIcon />,
          },
        ]}
        bottomItems={[]}
      />
    }
  >
    <Routes />
  </Window>
)

export default withProviders(App)
