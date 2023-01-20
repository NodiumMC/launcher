import { IPopup } from '.'
import { FC, useMemo, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck,
  faCircleInfo,
  faCircleQuestion,
  faCircleXmark,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import { Text } from 'components/atoms/Text'
import { Button } from 'components/atoms/Button'
import { isPromise } from 'utils/promise'
import { observer } from 'mobx-react'
import { rgba } from 'polished'

const Popuup = styled.div`
  width: 580px;
  max-height: 90%;
  background-color: ${({ theme }) => theme.master.back};
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  padding: 24px;
  position: relative;
  transition: all ${({ theme }) => theme.transition.time};
  gap: 20px;
  border: 2px solid ${({ theme }) => theme.master.shade()};
  border-radius: ${({ theme }) => theme.radius(2)};
`

const Icon = styled.div<Pick<IPopup, 'level'>>`
  font-size: 42px;
  width: 50px;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  color: ${({ theme, level }) => {
    switch (level) {
      case 'ok':
        return theme.palette.green
      case 'warn':
        return theme.palette.yellow
      case 'error':
        return theme.palette.red
      case 'question':
        return theme.accent.primary
      case 'info':
        return theme.accent.primary
    }
  }};
  svg {
    border-radius: 50%;
    box-shadow: 0 0 0 6px
      ${({ theme, level }) => {
        switch (level) {
          case 'ok':
            return rgba(theme.palette.green, 0.2)
          case 'warn':
            return rgba(theme.palette.yellow, 0.2)
          case 'error':
            return rgba(theme.palette.red, 0.2)
          case 'question':
          case 'info':
            return rgba(theme.accent.primary, 0.2)
        }
      }};
  }
  transition: background-color ${({ theme }) => theme.transition.time};
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space(2)};
  flex-grow: 1;
  align-items: flex-end;
  margin-top: 24px;
`

const DescriptionContainer = styled.div`
  overflow-y: scroll;
  flex-grow: 1;
`

const Description = styled(Text)`
  white-space: pre-wrap;
  word-break: break-word;
  overflow: scroll;
  user-select: initial;
`

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 6px;
`

export const Popup: FC<IPopup> = observer(({ level, actions, title, description, close }) => {
  const icon = useMemo(
    () =>
      level === 'ok' ? (
        <FontAwesomeIcon icon={faCircleCheck} />
      ) : level === 'warn' ? (
        <FontAwesomeIcon icon={faExclamationTriangle} />
      ) : level === 'question' ? (
        <FontAwesomeIcon icon={faCircleQuestion} />
      ) : level === 'info' ? (
        <FontAwesomeIcon icon={faCircleInfo} />
      ) : (
        <FontAwesomeIcon icon={faCircleXmark} />
      ),
    [level],
  )
  const [waiting, setWaiting] = useState(false)
  return (
    <Popuup>
      <Icon level={level}>{icon}</Icon>
      <DataContainer>
        <Text size={15} weight={'bold'}>
          {title}
        </Text>
        <DescriptionContainer>
          {typeof description !== 'object' ? <Description shade={'low'}>{description}</Description> : description}
        </DescriptionContainer>
        <Actions>
          {actions.map(({ label, action, isPrimary, isDanger }, index) => (
            <Button
              key={index}
              onClick={() => {
                const result = action?.(close!)
                if (isPromise(result)) {
                  setWaiting(true)
                  result.finally(() => setWaiting(false))
                }
              }}
              variant={isPrimary ? 'primary' : 'default'}
              destructive={isDanger}
              fetching={waiting}
            >
              {label}
            </Button>
          ))}
        </Actions>
      </DataContainer>
    </Popuup>
  )
})
