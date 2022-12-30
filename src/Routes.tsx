import { FC } from 'react'
import { Route, Routes as DOMRoutes } from 'react-router-dom'
import { Main } from 'screens/Main'
import { About } from 'screens/About'

export const Routes: FC = () => (
  <DOMRoutes>
    <Route path={'/'} element={<Main />} />
    <Route path={'/about'} element={<About />} />
  </DOMRoutes>
)
