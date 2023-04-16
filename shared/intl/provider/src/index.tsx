import { FC, PropsWithChildren } from 'react'
import { $locale } from '@intl/store'
import { IntlProvider as Provider } from 'react-intl'
import * as langs from '@intl/langs'
import { useStore } from 'effector-react'

export const IntlProvider: FC<PropsWithChildren> = ({ children }) => {
  const locale = useStore($locale)

  const messages = langs[locale as keyof typeof langs] as any

  return (
    <Provider locale={locale} defaultLocale='ru' messages={messages}>
      {children}
    </Provider>
  )
}
