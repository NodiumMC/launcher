import { FC } from 'react'
import styled from 'styled-components'
import { Screen } from 'components/utils/Screen'
import { Observer, useDeferredModule } from 'mobmarch'
import { DelogService } from 'debug'
import { LogLine } from 'debug'

const Page = styled(Screen)`
  overflow-y: scroll;
`

const LogsContainer = styled.div`
  width: 100%;
`

export const Logs: FC = Observer(() => {
  const [, delog] = useDeferredModule(DelogService)

  return (
    <Page>
      <LogsContainer>
        {delog?.logs.map(v => (
          <LogLine line={v} key={v.id} />
        ))}
      </LogsContainer>
    </Page>
  )
})
