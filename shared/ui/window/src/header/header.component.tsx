import { Bordered } from '../bordered'
import { styled } from '@lmpx/styled'
import { styles } from './header.styles'

export const Header = styled(Bordered)(styles)

Header.defaultProps = {
  sides: ['bottom'],
  gridArea: 'title',
}
