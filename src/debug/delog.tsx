import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { Text } from 'components/micro/Text'
import { ObjectRenderer } from 'debug'
import { toJS } from 'mobx'
import { mix } from 'polished'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { transition } from 'style'
import ms from 'pretty-ms'

export type DelogType = 'default' | 'warn' | 'error' | 'time'

export interface DelogLine {
  type: DelogType
  id: number
  args: any[]
  time?: number
  delta?: number
}

export interface LogLineProps {
  line: DelogLine
}

const Container = styled.div.attrs<{ type: DelogType }>(({ theme, type }) => {
  const clr = () => {
    switch (type) {
      default:
        return theme.master.front
      case 'warn':
        return theme.palette.yellow
      case 'error':
        return theme.palette.red
      case 'time':
        return theme.palette.blue
    }
  }
  return {
    color: clr(),
  }
})<{ type: DelogType }>`
  color: ${({ color, theme }) => mix(0.2, theme.master.front, color!)};
  background-color: ${({ color, theme }) =>
    color !== theme.master.front
      ? mix(0.2, color!, theme.master.back)
      : theme.master.back};
  display: flex;
  padding: ${({ theme }) => theme.space(1)};
  ${transition('color, background-color')}
  &:first-child {
    border-top-left-radius: ${({ theme }) => theme.radius()};
    border-top-right-radius: ${({ theme }) => theme.radius()};
  }
  &:last-child {
    border-bottom-left-radius: ${({ theme }) => theme.radius()};
    border-bottom-right-radius: ${({ theme }) => theme.radius()};
  }
`

const IconWrapper = styled.div`
  width: ${({ theme }) => theme.space(5)};
  flex-shrink: 0;
`

const Content = styled(Text).attrs(() => ({
  pre: true,
}))`
  flex-grow: 1;
`

const Time = styled(Text)`
  color: ${({ theme }) => mix(0.2, theme.master.front, theme.accent.primary)};
  font-weight: bold;
`

const Delta = styled(Text)<{ sign?: boolean }>`
  color: ${({ sign, theme }) =>
    sign
      ? mix(0.2, theme.master.front, theme.palette.green)
      : mix(0.2, theme.master.front, theme.palette.red)};
`

export const LogLine: FC<LogLineProps> = ({ line }) => {
  const icon = useMemo(
    () =>
      line.type === 'warn' ? (
        <FontAwesomeIcon icon={'exclamation-triangle'} />
      ) : line.type === 'default' ? (
        <FontAwesomeIcon icon={'circle-info'} />
      ) : line.type === 'time' ? (
        <FontAwesomeIcon icon={'stopwatch'} />
      ) : (
        <FontAwesomeIcon icon={'xmark'} />
      ),
    [line],
  )
  return (
    <Container type={line.type}>
      <IconWrapper>{icon}</IconWrapper>
      <Content pre>
        {line.args.map(arg =>
          typeof arg === 'string' ? arg : <ObjectRenderer target={toJS(arg)} />,
        )}
        {line.time && (
          <Time pre> {ms(line.time, { millisecondsDecimalDigits: 1 })}</Time>
        )}
        {line.delta !== undefined && line.delta !== 0 && (
          <Delta pre sign={line.delta <= 0}>
            {'  '}
            {line.delta > 0 && '+'}
            {ms(line.delta, { millisecondsDecimalDigits: 1 })}
          </Delta>
        )}
      </Content>
    </Container>
  )
}
