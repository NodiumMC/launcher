import { FC, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Screen } from 'components/utils/Screen'
import { Observer, useDeferredModule } from 'mobmarch'
import { DelogService } from 'debug'
import { LogLine } from 'debug'
import { CommandPrompt, execute } from 'debug/commander'

const Page = styled(Screen)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space()};
`

const LogsContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow-y: scroll;
  border-radius: ${({ theme }) => theme.radius()};
  scroll-behavior: smooth;
`

export const Logs: FC = Observer(() => {
  const [, delog] = useDeferredModule(DelogService)
  const latest = useRef<HTMLDivElement>(null)
  const [command, setCommand] = useState('')

  useEffect(() => {
    if (latest.current) latest.current.scrollTop = latest.current.scrollHeight
  })

  return (
    <Page>
      <LogsContainer ref={latest}>
        {delog?.logs.map(v => (
          <LogLine line={v} key={v.id} />
        ))}
      </LogsContainer>
      <CommandPrompt value={command} onChange={setCommand} send={execute} />
    </Page>
  )
})
