import { FC } from 'react'
import { Route, Routes as DomRoutes } from 'react-router-dom'
import { HomePage } from '@pages/home'

export const Routes: FC = () => (
  <DomRoutes>
    <Route index element={<HomePage />} />
  </DomRoutes>
)
