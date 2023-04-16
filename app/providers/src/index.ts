import type { FC } from 'react'
import { withRouter } from './with-router'
import { withTheme } from './with-theme'
import { withIntl } from './with-intl'

export const withProviders = (component: FC) => withRouter(withIntl(withTheme(component)))
