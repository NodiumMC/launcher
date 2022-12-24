import { FC } from 'react'
import { LogEvent } from 'core/logging'
import styled from 'styled-components'
import { mix } from 'polished'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface LinesProps {
  event: LogEvent
}

const Line = styled.div<Partial<LogEvent>>`
  font-family: IBMPlexMono, 'JetBrains Mono', monospace;
  background-color: ${({ level, theme }) =>
    level === 'ERROR'
      ? mix(0.2, theme.palette.red, theme.master.back)
      : level === 'WARN'
      ? mix(0.2, theme.palette.yellow, theme.master.back)
      : 'transparent'};
  color: ${({ level, theme }) =>
    level === 'ERROR' ? theme.palette.red : level === 'WARN' ? theme.palette.yellow : theme.master.front};
  padding: 3px ${({ theme }) => theme.space()};
  font-size: ${({ theme }) => theme.size(7)};
  font-weight: 100;
  white-space: pre-wrap;
  word-break: break-all;
  border-radius: ${({ theme }) => theme.radius()};
`

const Icon = styled(FontAwesomeIcon)`
  padding-right: ${({ theme }) => theme.space()};
  width: 12px;
`

const Thread = styled.span`
  padding: 0 4px;
`

const Throwable = styled.div``

export const Event: FC<LinesProps> = ({ event }) => {
  return (
    <Line level={event.level}>
      <Icon icon={event.level === 'ERROR' ? 'xmark' : event.level === 'WARN' ? 'triangle-exclamation' : 'info'} />
      <Thread>[{event.thread}]</Thread>
      {event.message}
      {event.throwable && <Throwable>{event.throwable}</Throwable>}
    </Line>
  )
}
