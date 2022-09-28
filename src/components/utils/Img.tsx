import { FC } from 'react'
import placeholder from 'assets/img/placeholder.png'

export const Img: FC<JSX.IntrinsicElements['img'] & ExtraProps.Styled> = props => (
  <img alt={''} {...props} src={props.src ?? placeholder} />
)
