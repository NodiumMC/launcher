import type { FC } from 'react'
import { MemoryRouter } from 'react-router-dom'

export const withRouter = (component: FC) => () => <MemoryRouter>{component({})}</MemoryRouter>
