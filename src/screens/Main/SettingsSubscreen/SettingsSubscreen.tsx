import { FC } from 'react'
import styled from 'styled-components'
import { Screen } from 'components/utils/Screen'
import { Text } from 'components/micro/Text'
import { Observer, useModule } from 'mobmarch'
import { VLabel } from 'components/micro/VLabel'
import { DialogInput } from 'components/micro/DialogInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CentralConfig } from 'storage'
import { useGameDir } from 'hooks/useAppData'

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

export const SettingsSubscreen: FC = Observer(() => {
  const config = useModule(CentralConfig)
  const gameDir = useGameDir()

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
          value={config.get('main.gameDir', gameDir)}
          onChange={dir => config.set('main.gameDir', dir)}
        />
      </VLabel>
    </Page>
  )
})