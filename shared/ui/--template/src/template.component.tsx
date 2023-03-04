import styled from '@emotion/styled'
import { styles } from './template.styles'
import type { TemplateProps } from './template.interface'
import { FC } from 'react'

export const TemplateElement = styled.div(styles)

export const Template: FC<TemplateProps> = ({ ...props }) => {
  return <TemplateElement>{props.justProp}</TemplateElement>
}
