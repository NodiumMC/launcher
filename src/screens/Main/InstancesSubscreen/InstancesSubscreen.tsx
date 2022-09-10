import { FC, useCallback, useState } from 'react'
import { Observer, useModule } from 'mobmarch'
import styled from 'styled-components'
import { Screen } from 'components/utils/Screen'
import { InstanceItem } from './InstanceItem'
import { InstanceStore } from 'minecraft/InstanceStore.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Text } from 'components/micro/Text'
import { GameProfileService } from 'core/services/GameProfile.service'
import { transition } from 'style'

const Page = styled(Screen)`
  display: flex;
  gap: 6px;
  flex-direction: column;
  overflow-y: scroll;
  min-height: 100%;
  width: auto;
`

const AddNewButton = styled.button`
  border: 1px solid ${({ theme }) => theme.palette.back.shades[0]};
  border-radius: ${({ theme }) => theme.shape.radius[0]};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${transition()}
  flex-shrink: 0;
  &:hover {
    background-color: ${({ theme }) => theme.palette.back.shades[0]};
  }
  &[disabled] {
    cursor: not-allowed;
  }
`

export const InstancesSubscreen: FC = Observer(() => {
  const istorage = useModule(InstanceStore)
  const profileService = useModule(GameProfileService)
  const [creating, setCreating] = useState(false)

  const create = useCallback(() => {
    setCreating(true)
    istorage
      .New()
      .catch(/* TODO: add notify #NDML-2 */)
      .finally(() => setCreating(false))
  }, [istorage, profileService])

  return (
    <Page>
      {istorage.sorted.map(v => (
        <InstanceItem instance={v} key={v.settings.name} />
      ))}
      <AddNewButton disabled={creating} onClick={create}>
        <Text shade={'high'} size={'l'}>
          <FontAwesomeIcon icon={'plus'} />
        </Text>
      </AddNewButton>
    </Page>
  )
})
