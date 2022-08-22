import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Ansi } from './Ansi'
import { FN } from 'utils/UtilityTypes'

const AnsiHtml = styled.span`
  display: inline-block;
  font-family: 'Red Hat Mono', monospace;
  font-weight: 500;
  font-size: 11px;
  white-space: pre;
  line-height: 14px !important;
  color: ${({ theme }) => theme.colors.gray};
  transition: all ${({ theme }) => theme.transition.time};
`

const ansiRegex = /^\u001b\[(\d+)(;\d+)?m/g

export interface AnsiPair {
  escape: number
  content: string
}

interface EventEmitterLike {
  on(event: string | symbol, listener: FN): void

  off(event: string | symbol, listener: FN): void
}

export interface TtyProps {
  stdout: EventEmitterLike
  stderr?: EventEmitterLike
}

// TODO: color support and animations
export const Tty: FC<TtyProps> = ({ stdout, stderr }) => {
  const [items, setItems] = useState<string[]>([])
  useEffect(() => {
    const onData = (data: string) => {
      setItems(items => [...items, data])
    }
    stdout.on('data', onData)
    stderr?.on('data', onData)
    return () => {
      stdout.off('data', onData)
      stderr?.off('data', onData)
    }
  }, [stdout, stderr])

  return (
    <AnsiHtml>
      {items.map((item, key) => (
        <Ansi key={key} escape={97}>
          {item}
        </Ansi>
      ))}
    </AnsiHtml>
  )
}
