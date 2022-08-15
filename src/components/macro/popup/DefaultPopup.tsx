import { PopupProps } from './PopupProps'
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
  background-color: ${({ theme }) => theme.colors.back};
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
  transition: all ${({ theme }) => theme.transition.time};
  gap: 20px;
  border: 2px solid ${({ theme }) => theme.colors.backShade};
  border-radius: 10px;
`

export interface PopupAction {
  label: string
  action: (close: () => void) => void
  isPrimary?: boolean
  isDanger?: boolean
}

export enum DefaultPupupAction {
  CLOSE,
  OK,
}

export interface DefaultPopupProps extends PopupProps {
  level: 'ok' | 'warn' | 'error' | 'question' | 'info'
  title: string
  description: string
  actions: PopupAction[]
}

const Icon = styled.div<Pick<DefaultPopupProps, 'level'>>`
  font-size: 70px;
  display: flex;
  justify-content: center;
  color: ${({ theme, level }) => {
    switch (level) {
      case 'ok':
        return theme.colors.ok
      case 'warn':
        return theme.colors.warn
      case 'error':
        return theme.colors.danger
      case 'question':
        return theme.colors.accent
      case 'info':
        return theme.colors.accent
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

export const DefaultPopup: FC<DefaultPopupProps> = ({
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
      <Text as={'h4'} ns center bold>
        {title}
      </Text>
      <Text pre shade center ns>
        {description}
      </Text>
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
