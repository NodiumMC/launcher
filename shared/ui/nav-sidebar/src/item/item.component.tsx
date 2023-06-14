import { styled } from '@lmpx/styled'
import { FC } from 'react'
import { ItemProps } from './item.interface'
import { styles } from './styles'

const ItemElement = styled.div<Pick<ItemProps, 'isActive'>>(styles)

export const Item: FC<ItemProps> = (props) => {
  const { icon, isActive, onClick } = props

  return (
    <ItemElement isActive={isActive} onClick={onClick}>
      {icon}
    </ItemElement>
  )
}
