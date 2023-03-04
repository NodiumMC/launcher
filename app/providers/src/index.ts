import type { FC } from 'react'
import { withRouter } from './with-router'
import { withRecoil } from './with-recoil'
import { withTheme } from './with-theme'

export const withProviders = (component: FC) => withRecoil(withRouter(withTheme(component)))
