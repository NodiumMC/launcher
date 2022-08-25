import { FC } from 'react'
import { Route, Routes as DOMRoutes } from 'react-router-dom'
import { Main } from 'screens/Main'

export const Routes: FC = () => (
  <DOMRoutes>
    <Route path={'/'} element={<Main />} />
  </DOMRoutes>
)
