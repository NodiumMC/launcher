import { FC } from 'react'
import { Screen } from 'components/utils/Screen'
import { Text } from 'components/micro/Text'
import { Observer } from 'mobmarch'

export const PlaySubscreen: FC = Observer(() => {
  return (
    <Screen>
      <Text pre style={{ fontSize: '11px' }}>123</Text>
    </Screen>
  )
})
