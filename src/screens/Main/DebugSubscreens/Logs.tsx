import { FC, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Screen } from 'components/utils/Screen'
import { Observer } from 'mobmarch'
import { DelogService, LogLine } from 'debug'
import { CommandPrompt, execute } from 'debug/commander'
import { container } from 'tsyringe'

const Page = styled(Screen)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space()};
`

const LogsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  width: 100%;
  flex-grow: 1;
  overflow-y: scroll;
  border-radius: ${({ theme }) => theme.radius()};
  scroll-behavior: smooth;
`

export const Logs: FC = Observer(() => {
  const delog = container.resolve(DelogService)
  const latest = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (latest.current) latest.current.scrollTop = latest.current.scrollHeight
  })

  return (
    <Page>
      <LogsContainer ref={latest}>
        {delog.logs.map(v => (
          <LogLine line={v} key={v.id} />
        ))}
      </LogsContainer>
      <CommandPrompt send={execute} />
    </Page>
  )
})
