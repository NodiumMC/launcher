import { Children, cloneElement, FC, isValidElement } from 'react'
import styled from 'styled-components'
import { PopupProps } from './PopupProps'
import { HasChildren, Styled } from 'utils/UtilityProps'
import { animated } from 'react-spring'
import { rgba } from 'polished'

const Popup = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(20px);
  z-index: 1000;
  border-radius: 10px;
  background-color: ${({ theme }) => rgba(theme.colors.back, 0.6)};
  transition: background-color ${({ theme }) => theme.transition.time};
`

export const PopupBase: FC<PopupProps & HasChildren & Styled> = ({
  close,
  children,
  style,
}) => {
  const childrenWithProps = Children.map(children, child => {
    if (isValidElement(child))
      return cloneElement(child, { ...(child as any).props, close })
    return child
  })

  return (
    <Popup as={animated.div} style={style}>
      {childrenWithProps}
    </Popup>
  )
}

export const wrap = (element: JSX.Element, close: () => void) => (
  <PopupBase close={close}>{element}</PopupBase>
)
