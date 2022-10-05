import { FC, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Screen } from 'components/utils/Screen'
import { Observer, useDeferredModule } from 'mobmarch'
import { DelogService, log } from 'debug'
import { LogLine } from 'debug'
import { CommandPrompt, execute } from 'debug/commander'
import { Text } from 'components/micro/Text'

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
  const [, delog] = useDeferredModule(DelogService)
  const latest = useRef<HTMLDivElement>(null)
  const [command, setCommand] = useState('')

  useEffect(() => {
    log(
      <>
        <Text weight={'bold'}>Привет путник. </Text>
        <Text>
          Ты попал в{' '}
          <Text weight={'light'} color={'red'} interaction>
            консоль_
          </Text>{' '}
          разработчика. Это очень тёмное и опасное место для тебя, но очень полезное и интересное для разработчика.
          Настоятельно <Text color={'orange'}>НЕ</Text> рекомендую вводить сюда команды без знания того как они работают
          и что делают. Ну а тебе дорогой разработчик:{' '}
          <Text color={'magenta'}>{'<<'} &quot;Hello World&quot;</Text>
        </Text>
      </>,
    )
  }, [])

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
