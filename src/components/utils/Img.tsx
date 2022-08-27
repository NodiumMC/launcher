import { FC } from 'react'
import { Styled } from 'utils/UtilityProps'
import placeholder from 'assets/img/placeholder.png'

export const Img: FC<JSX.IntrinsicElements['img'] & Styled> = props => (
  <img alt={''} {...props} src={props.src ?? placeholder} />
)
