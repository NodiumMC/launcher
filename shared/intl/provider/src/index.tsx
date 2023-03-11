import { FC, PropsWithChildren } from 'react'
import { useRecoilState } from 'recoil'
import { locale as localeAtom } from '@intl/store'
import { IntlProvider as Provider } from 'react-intl'
import * as langs from '@intl/langs'

export const IntlProvider: FC<PropsWithChildren> = ({ children }) => {
  const [locale] = useRecoilState(localeAtom)

  const messages = langs[locale as keyof typeof langs] as any

  return (
    <Provider locale={locale} defaultLocale={'ru'} messages={messages}>
      {children}
    </Provider>
  )
}
