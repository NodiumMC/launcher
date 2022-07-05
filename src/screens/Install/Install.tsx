import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { useI18N } from '../../hooks/useService'
import { Screen } from '../Screen'
import { Text } from '../../components/ui/Text'
import { LangMeta, SupportedLang } from '../../app/i18n/langs'
import { Dropdown, DropdownItem } from '../../components/ui/Dropdown'
import { Observer } from '../../store/ObserverComponent'
import { Button } from '../../components/ui/Button'

const InstallScreen = styled(Screen)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const LangSelector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`

export const Install: FC = Observer(() => {
  const i18n = useI18N()
  const langitems = useMemo(() => Object.entries(LangMeta)
    .map(([id, { label, icon }]) => ({id, label, icon} as DropdownItem)),[i18n.lang])
  return <InstallScreen>
    <Text ns as={'h1'} center>{i18n.$('install.welcome')}</Text>
    <LangSelector>
      <Text ns shade>{i18n.$('install.select_lang')}</Text>
      <Dropdown items={langitems} value={langitems.find(v => v.id === i18n.lang)} onChange={s => i18n.lang = s.id as SupportedLang}/>
    </LangSelector>
    <Button primary>{i18n.$('install.continue')}</Button>
  </InstallScreen>
})
