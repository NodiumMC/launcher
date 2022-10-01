import { FC } from 'react'
import styled from 'styled-components'
import { Screen } from 'components/utils/Screen'
import { Observer, useModule } from 'mobmarch'
import { DebugService } from 'debug'
import { ObjectRenderer } from 'debug/object-renderer'

const Page = styled(Screen)`
  overflow-y: scroll;
  padding: 0 20px;
`

export const Logs: FC = Observer(() => {
  const debug = useModule(DebugService)
  return (
    <Page>

    </Page>
  )
})
