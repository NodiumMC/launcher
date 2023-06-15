import { FC } from 'react'
import { Route, Routes as DomRoutes } from 'react-router-dom'
import { HomePage } from '@pages/home'
import { VersionsPage } from '@pages/versions'

export const Routes: FC = () => (
  <DomRoutes>
    <Route index element={<HomePage />} />
    <Route path='/versions' element={<VersionsPage />} />
  </DomRoutes>
)
