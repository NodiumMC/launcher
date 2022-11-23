import { FC, useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { normalizeColor } from 'utils'

export interface JournalViewerProps {
  lines: string[]
}

export const Container = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.space(2)};
  flex-direction: column;
  font-family: 'Fira Code', sans-serif;
  overflow-y: auto;
  scroll-behavior: smooth;
`

export interface JournalLine {
  time: string
  thread: string
  level: string
  content: string
}

interface PrefixedProps {
  color?: string
  opacity?: boolean
  bold?: boolean
}

const Prefixed = styled.span<PrefixedProps>`
  display: inline-flex;
  gap: 6px;
  align-items: center;
  padding: 0 6px;
  opacity: ${({ opacity }) => (opacity ? '0.65' : '1')};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: ${({ color }) => (color ? normalizeColor(color) : color)};
  svg {
    font-size: 0.7rem;
  }
`

const TextLine = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
  font-family: inherit;
`

const Colored = styled.span<{ color: string }>`
  color: ${({ color }) => normalizeColor(color)};
`

const Line: FC<{ line: JournalLine }> = ({ line: { time, thread, level, content } }) => {
  const theme = useTheme()
  const color = level === 'ERROR' ? theme.palette.red : level === 'WARN' ? theme.palette.yellow : theme.master.front

  return (
    <TextLine>
      <Prefixed opacity color={theme.master.front}>{time}</Prefixed>
      <Prefixed color={theme.palette.orange}>
        <FontAwesomeIcon icon={'bolt'} />
        {thread}
      </Prefixed>
      <Prefixed color={color}>
        <FontAwesomeIcon icon={level === 'ERROR' ? 'xmark' : level === 'WARN' ? 'triangle-exclamation' : 'info'} />
        {level}
      </Prefixed>
      <Colored color={color}>{content}</Colored>
    </TextLine>
  )
}

export const JournalViewer: FC<JournalViewerProps> = ({ lines }) => {
  const parsed: JournalLine[] = useMemo(
    () =>
      lines.map(line => {
        const [, time, thread, level, content] =
          line.match(/^\[(.+?)]\s\[([A-z0-9-_\s]+)?\/?([A-z0-9-_\s]*)]:\s(.+)/s) ?? []
        return { time, thread, level, content }
      }),
    [lines],
  )

  return (
    <Container>
      {parsed.map((v, i) => (
        <Line key={i} line={v} />
      ))}
    </Container>
  )
}
