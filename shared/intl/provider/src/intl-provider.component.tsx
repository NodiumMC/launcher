import { type FC } from 'react'
import { IntlProvider as Provider } from 'react-intl'
import * as langs from '@intl/langs'
import { useStore } from 'effector-react'
import { $locale } from '@config/locale'
import { IntlProviderProps } from './intl-provider.interface'

export const IntlProvider: FC<IntlProviderProps> = ({ children }) => {
  const locale = useStore($locale)

  const messages = langs[locale as keyof typeof langs] as any

  return (
    <Provider locale={locale} defaultLocale='ru' messages={messages}>
      {children}
    </Provider>
  )
}
