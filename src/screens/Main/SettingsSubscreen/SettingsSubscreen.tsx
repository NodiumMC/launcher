import { FC } from 'react'
import styled from 'styled-components'
import { Screen } from 'components/utils/Screen'
import { Text } from 'components/micro/Text'
import { VLabel } from 'components/micro/VLabel'
import { DialogInput } from 'components/micro/DialogInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react'
import { useMod } from 'hooks/useMod'
import { GeneralSettings } from 'settings/GeneralSettings.service'

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

export const SettingsSubscreen: FC = observer(() => {
  const settings = useMod(GeneralSettings)
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
    </Page>
  )
})
