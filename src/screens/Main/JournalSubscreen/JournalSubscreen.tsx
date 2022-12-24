import { FC, useEffect, useRef, useState } from 'react'
import { Screen } from 'components/utils/Screen'
import styled from 'styled-components'
import { useMod } from 'hooks/useMod'
import { observer } from 'mobx-react'
import { InstanceStore } from 'minecraft/InstanceStore.service'
import { Text } from 'components/atoms/Text'
import { mix } from 'polished'
import { Event } from './Event'
import type { Instance as InstanceType } from 'minecraft/Instance'
import { useOnce } from 'hooks'

const Page = styled(Screen)`
  display: flex;
  gap: ${({ theme }) => theme.space()};
`

const InstanceSelectorContainer = styled.div`
  width: 200px;
  border-radius: ${({ theme }) => theme.radius()};
  background-color: ${({ theme }) => theme.master.back};
  border-right: 1px solid ${({ theme }) => theme.master.shade()};
  padding-right: ${({ theme }) => theme.size()};
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  flex-shrink: 0;
`

interface InstanceProps {
  active: boolean
}

const Instance = styled.div<InstanceProps>`
  height: 38px;
  align-items: center;
  display: flex;
  padding: 0 ${({ theme }) => theme.space(2)};
  background-color: ${({ active, theme }) =>
    active ? mix(0.2, theme.accent.primary, theme.master.back) : 'transparent'};
  border-radius: ${({ theme }) => theme.radius()};
  border-left: 2px solid ${({ active, theme }) => (active ? theme.accent.primary : 'transparent')};
  color: ${({ active, theme }) => (active ? theme.accent.primary : theme.master.front)};
`

const LinesContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius()};
  flex-grow: 1;
  padding: ${({ theme }) => theme.space()};
  overflow-y: scroll;
  gap: 1px;
  scroll-behavior: smooth;
`

export const JournalSubscreen: FC = observer(() => {
  const istore = useMod(InstanceStore)
  const [instance, setInstance] = useState<InstanceType | undefined>(undefined)
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInstance(istore.instances[0])
  }, [istore.instances])

  useEffect(() => {
    if (container.current) container.current.scrollTop = container.current.scrollHeight
  })

  return (
    <Page>
      <InstanceSelectorContainer>
        {istore.instances.map(i => (
          <Instance key={i.dirname} onClick={() => setInstance(i)} active={i === instance}>
            <Text max={180} weight={'thin'}>
              {i.displayName}
            </Text>
          </Instance>
        ))}
      </InstanceSelectorContainer>
      <LinesContainer ref={container}>
        {instance?.logs?.map?.(ll => (
          <Event key={ll.timestamp} event={ll} />
        ))}
      </LinesContainer>
    </Page>
  )
})
