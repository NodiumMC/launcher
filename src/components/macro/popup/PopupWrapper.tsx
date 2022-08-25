import { Children, cloneElement, FC, isValidElement } from 'react'
import styled from 'styled-components'
import { HasChildren, Styled } from 'utils/UtilityProps'
import { animated } from 'react-spring'
import { rgba } from 'polished'
import { IPopup } from 'components/macro/popup/PopupProps'

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
  border-radius: ${({ theme }) => theme.shape.radius[1]};
  background-color: ${({ theme }) => rgba(theme.palette.back.default, 0.6)};
  transition: background-color ${({ theme }) => theme.transition.time};
`

export const PopupWrapper: FC<
  { close: IPopup['close'] } & HasChildren & Styled
> = ({ close, children, style }) => {
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
