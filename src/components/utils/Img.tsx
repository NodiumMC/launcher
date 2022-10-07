import { FC } from 'react'
import placeholder from 'assets/img/placeholder.png'
import styled from 'styled-components'

const StyledImg = styled.img`
  object-fit: contain;
`

export const Img: FC<JSX.IntrinsicElements['img'] & ExtraProps.Styled> = props => (
  <StyledImg alt={''} {...(props as object)} src={props.src ?? placeholder} />
)
