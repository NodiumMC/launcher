import { FC } from 'react'
import { ClassNameable } from '../../utils/UtilityProps'
import placeholder from '../../assets/img/placeholder.png'

export const Img: FC<JSX.IntrinsicElements['img'] & ClassNameable> = (props) =>
  <img {...props} src={props.src ?? placeholder}/>
