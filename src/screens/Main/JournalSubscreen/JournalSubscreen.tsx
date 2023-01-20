import { FC, useEffect, useRef, useState } from 'react'
import { Screen } from 'components/utils/Screen'
import styled from 'styled-components'
import { useMod } from 'hooks/useMod'
import { observer } from 'mobx-react'
import { Text } from 'components/atoms/Text'
import { mix } from 'polished'
import { Event } from './Event'
import { Button } from 'components/atoms/Button'
import { useI18N } from 'hooks'
import { InstancesModule } from 'minecraft/instances'
import { InstanceModule } from 'minecraft/instance'
import { Scrollbar } from 'components/utils/Scrollbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

const LinesContainer = styled(Scrollbar)`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius()};
  flex-grow: 1;
  padding: ${({ theme }) => theme.space()};
  overflow-y: scroll;
  gap: 1px;
  scroll-behavior: smooth;
`

const Placeholder = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ClearButtonWrapper = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.space()};
  right: 64px;
`

const ClearButton = styled(Button)`
  position: fixed;
`

export const JournalSubscreen: FC = observer(() => {
  const istore = useMod(InstancesModule)
  const i18n = useI18N(t => t.journal)
  const [instance, setInstance] = useState<InstanceModule | undefined>(undefined)
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInstance(istore.moreLastUsed)
  }, [istore.instances])

  useEffect(() => {
    if (container.current) container.current.scrollTop = container.current.scrollHeight
  }, [instance, instance?.logs])

  return (
    <Page>
      <InstanceSelectorContainer>
        {istore.instances.map(i => (
          <Instance key={i.uniqueId} onClick={() => setInstance(i)} active={i === instance}>
            <Text max={180} weight={'thin'}>
              {i.displayName}
            </Text>
          </Instance>
        ))}
      </InstanceSelectorContainer>
      <LinesContainer ref={container}>
        {(instance?.logs?.length ?? 0) > 0 ? (
          <>
            {instance?.logs?.map?.((ll, idx) => (
              <Event key={idx} event={ll} />
            ))}
            <ClearButtonWrapper>
              <ClearButton variant={'tertiary-gray'} onClick={() => instance?.clearLogs()}>
                <FontAwesomeIcon icon={'trash'} />
              </ClearButton>
            </ClearButtonWrapper>
          </>
        ) : (
          <Placeholder>
            <Text shade={'high'}>{i18n.no_logs}</Text>
          </Placeholder>
        )}
      </LinesContainer>
    </Page>
  )
})
