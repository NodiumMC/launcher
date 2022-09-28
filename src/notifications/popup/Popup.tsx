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
import { Text } from 'components/micro/Text'
import { Button } from 'components/micro/Button'
import { isPromise } from 'utils/promise'

const Popuup = styled.div`
  width: 580px;
  height: 320px;
  background-color: ${({ theme }) => theme.master.back};
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
  transition: all ${({ theme }) => theme.transition.time};
  gap: 20px;
  border: 2px solid ${({ theme }) => theme.master.shade()};
  border-radius: ${({ theme }) => theme.radius(2)};
`

const Icon = styled.div<Pick<IPopup, 'level'>>`
  font-size: 70px;
  display: flex;
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
  transition: background-color ${({ theme }) => theme.transition.time};
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  flex-grow: 1;
  align-items: flex-end;
`

export const Popup: FC<IPopup> = ({
  level,
  close,
  actions,
  title,
  description,
}) => {
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
      <Text size={15} center weight>
        {title}
      </Text>
      {typeof description !== 'object' ? (
        <Text pre shade={'medium'} center>
          {description}
        </Text>
      ) : (
        description
      )}
      <Actions>
        {actions.map(({ label, action, isPrimary, isDanger }, index) => (
          <Button
            key={index}
            onClick={() => {
              const result = action(close)
              if (isPromise(result)) {
                setWaiting(true)
                result.finally(() => (setWaiting(false), close()))
              } else close()
            }}
            primary={isPrimary}
            danger={isDanger}
            disabled={waiting}
          >
            {label}
          </Button>
        ))}
      </Actions>
    </Popuup>
  )
}
