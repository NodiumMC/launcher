import { FC } from 'react'
import { withProviders } from '@app/providers'
import { Routes } from '@app/routes'

const App: FC = () => {
  return (
    <div>
      <Routes />
    </div>
  )
}

export default withProviders(App)
