import { FC } from 'react'
import { withProviders } from '@app/providers'
import { Routes } from '@app/routes'
import { Window } from '@ui/window'

const App: FC = () => {
  return (
    <Window>
      <Routes />
    </Window>
  )
}

export default withProviders(App)
