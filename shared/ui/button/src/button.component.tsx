import styled from '@emotion/styled'
import { styles } from './styles'
import { ButtonProps } from './button.interface'

export const Button = styled.button<ButtonProps>(styles)

Button.defaultProps = {
  variant: 'primary',
  size: 'md',
  destructive: false,
}
