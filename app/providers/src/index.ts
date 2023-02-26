import type { FC } from 'react'
import { withRouter } from './with-router'

export const withProviders = (component: FC) => withRouter(component)
