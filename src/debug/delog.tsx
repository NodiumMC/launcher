import { FC, Fragment, useMemo } from 'react'
import styled from 'styled-components'
import { Text } from 'components/atoms/Text'
import { ObjectRenderer } from 'debug'
import { toJS } from 'mobx'
import { mix } from 'polished'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { transition } from 'style'
import ms from 'pretty-ms'
import { normalizeColor } from 'utils'

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
        return theme.master.shade()
      case 'warn':
        return theme.palette.yellow
      case 'error':
        return theme.palette.red
      case 'time':
        return theme.palette.blue
    }
  }
  const color = clr()
  const textColor = color !== theme.master.shade() ? normalizeColor(color!) : theme.master.front
  return {
    color: textColor,
    backgroundColor: color !== theme.master.shade() ? mix(0.2, color!, theme.master.back) : theme.master.shade(),
    borderColor: textColor,
  }
})<{ type: DelogType; backgroundColor?: string }>`
  display: flex;
  padding: ${({ theme }) => theme.space(0.6)} 0;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.radius(0.5)};
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.size(8)};
`

const Content = styled(Text).attrs(() => ({
  pre: true,
}))`
  flex-grow: 1;
`

const Time = styled(Text)`
  color: ${({ theme }) => normalizeColor(theme.accent.primary)};
  font-weight: bold;
`

const Delta = styled(Text)<{ sign?: boolean }>`
  color: ${({ sign, theme }) => (sign ? normalizeColor(theme.palette.green) : normalizeColor(theme.palette.red))};
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
      <Content pre selectable>
        {line.args.map((arg, i) => {
          if (typeof arg === 'string') {
            return (
              <Text pre selectable key={i}>
                {arg}{' '}
              </Text>
            )
          } else if (arg?.props) {
            return <Fragment key={i}>{arg}</Fragment>
          } else {
            return (
              <Fragment key={i}>
                <ObjectRenderer target={toJS(arg)} />
                {i < line.args.length - 1 && ' '}
              </Fragment>
            )
          }
        })}
        {line.time && (
          <Time pre selectable>
            {' '}
            {ms(line.time, { millisecondsDecimalDigits: 1 })}
          </Time>
        )}
        {line.delta !== undefined && line.delta !== 0 && (
          <Delta selectable pre sign={line.delta <= 0}>
            {'  '}
            {line.delta > 0 && '+'}
            {ms(line.delta, { millisecondsDecimalDigits: 1 })}
          </Delta>
        )}
      </Content>
    </Container>
  )
}
