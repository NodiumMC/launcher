import { FC } from 'react'
import { withProviders } from '@app/providers'
import { Routes } from '@app/routes'
import { Window } from '@ui/window'
import { NavSidebar } from '@ui/nav-sidebar'
import { CloseWindowIcon, HomeIcon } from '@ui/icons'

const App: FC = () => (
  <Window
    sidebar={
      <NavSidebar
        topItems={[
          {
            path: '/',
            icon: <CloseWindowIcon />,
          },
          {
            path: '/other',
            icon: <HomeIcon />,
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
