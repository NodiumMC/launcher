import { FC } from 'react'
import { IntlProvider } from '@intl/provider'

export const withIntl = (component: FC) => () => <IntlProvider>{component({})}</IntlProvider>
