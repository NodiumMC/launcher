import { FC } from 'react'
import styled from 'styled-components'
import { Screen } from 'components/utils/Screen'
import { Text } from 'components/atoms/Text'
import { VLabel } from 'components/atoms/VLabel'
import { DialogInput } from 'components/molecules/DialogInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react'
import { useMod } from 'hooks/useMod'
import { GeneralSettings } from 'settings/GeneralSettings.service'
import { SquareGroupSwitcher } from 'components/molecules/SquareGroupSwitcher'
import { LangMeta, SupportedLang } from 'i18n/langs'
import { ThemeService } from 'theme'
import { SupportedTheme } from 'theme/type'
import { I18n } from 'i18n'

const Page = styled(Screen)`
  padding: 0 100px 0 100px;
`

const Split = styled(Text).attrs(() => ({
  shade: 'medium',
  block: true,
  interaction: true,
}))`
  padding: 20px 0;
  position: relative;
  font-size: ${({ theme }) => theme.size(20)} !important;

  &:after {
    content: '';
    position: absolute;
    bottom: 12px;
    width: 100%;
    height: 1px;
    display: block;
    background-color: ${({ theme }) => theme.master.shade()};
  }
`
const ContainerRow = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
  gap: 100px;
`

export const SettingsSubscreen: FC = observer(() => {
  const settings = useMod(GeneralSettings)
  const theme = useMod(ThemeService)
  const i18n = useMod(I18n)
  const changeTheme = (choosenTheme: SupportedTheme) => {
    theme.setTheme(choosenTheme)
  }
  const changeLang = (choosenLang: SupportedLang) => {
    i18n.lang = choosenLang
  }
  return (
    <Page>
      <Split>Общие настройки</Split>
      <VLabel>
        <Text shade={'high'} size={5}>
          Путь к игровым данным
        </Text>
        <DialogInput
          directory
          icon={<FontAwesomeIcon icon={'folder'} />}
          value={settings.gameDir ?? '...'}
          onChange={dir => (settings.gameDir = dir)}
        />
      </VLabel>
      <Split>Внешний вид</Split>
      <ContainerRow>
        <VLabel>
          <Text shade={'high'} size={5}>
            Язык
          </Text>
          <SquareGroupSwitcher
            options={[
              { id: 'en_US', label: LangMeta.en_US.icon },
              { id: 'ru_RU', label: LangMeta.ru_RU.icon },
            ]}
            value={i18n.lang}
            onChange={(e: SupportedLang) => changeLang(e)}
          />
        </VLabel>
        <VLabel>
          <Text shade={'high'} size={5}>
            Тема
          </Text>
          <SquareGroupSwitcher
            options={[
              { id: 'light', label: <FontAwesomeIcon icon={'sun'} /> },
              { id: 'dark', label: <FontAwesomeIcon icon={'moon'} /> },
            ]}
            value={theme.current}
            onChange={(e: SupportedTheme) => changeTheme(e)}
          />
        </VLabel>
      </ContainerRow>
    </Page>
  )
})
