import { FC, useCallback } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faMinus } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'

interface WindowButtonProps {
  type: 'close' | 'toggle' | 'minimize'
  danger?: boolean
  action?: () => void
}

interface ButtonProps {
  danger?: boolean
}

const Button = styled.div<ButtonProps>`
  width: 22px;
  height: 22px;
  border-radius: ${({ theme }) => theme.shape.radius[0]};
  font-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.grayscale[2]};
  transition: color, background-color ${({ theme }) => theme.transition.time};
  &:hover {
    background-color: ${({ theme, danger }) =>
      danger ? theme.palette.red.default : theme.palette.back.shades[3]};
    color: ${({ theme }) => theme.palette.front.default};
  }
`

export const WindowButton: FC<WindowButtonProps> = ({
  type,
  action,
  danger,
}) => {
  const Icon = useCallback(() => {
    switch (type) {
      case 'close':
        return <FontAwesomeIcon icon={faXmark} />
      case 'toggle':
        return <FontAwesomeIcon icon={faSquare} />
      case 'minimize':
        return <FontAwesomeIcon icon={faMinus} />
      default:
        return <></>
    }
  }, [type])
  return (
    <Button onClick={action} danger={danger}>
      <Icon />
    </Button>
  )
}
