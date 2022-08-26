import { IPopup } from './PopupProps'
import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck,
  faCircleInfo,
  faCircleQuestion,
  faCircleXmark,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import { Text } from '../../micro/Text'
import { Button } from '../../micro/Button'

const Popuup = styled.div`
  width: 580px;
  height: 320px;
  background-color: ${({ theme }) => theme.palette.back.default};
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
  transition: all ${({ theme }) => theme.transition.time};
  gap: 20px;
  border: 2px solid ${({ theme }) => theme.palette.back.shades[0]};
  border-radius: ${({ theme }) => theme.shape.radius[1]};
`

const Icon = styled.div<Pick<IPopup, 'level'>>`
  font-size: 70px;
  display: flex;
  justify-content: center;
  color: ${({ theme, level }) => {
    switch (level) {
      case 'ok':
        return theme.palette.green.default
      case 'warn':
        return theme.palette.yellow.default
      case 'error':
        return theme.palette.red.default
      case 'question':
        return theme.palette.accent.default
      case 'info':
        return theme.palette.accent.default
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
  return (
    <Popuup>
      <Icon level={level}>{icon}</Icon>
      <Text as={'h4'} center bold>
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
            onClick={() => close && action(close)}
            primary={isPrimary}
            danger={isDanger}
          >
            {label}
          </Button>
        ))}
      </Actions>
    </Popuup>
  )
}
