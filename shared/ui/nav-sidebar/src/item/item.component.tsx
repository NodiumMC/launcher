import { styled } from '@lmpx/styled'
import { FC } from 'react'
import { ItemProps } from './item.interface'
import { styles } from './styles'
import { ActiveBar } from './active-bar'

const ItemElement = styled.div<Pick<ItemProps, 'isActive' | 'blurry'>>(styles)

export const Item: FC<ItemProps> = props => {
  const { icon, isActive, onClick, blurry } = props

  return (
    <ItemElement isActive={isActive} onClick={onClick} blurry={blurry}>
      <ActiveBar isActive={isActive} blurry={blurry} />
      {icon}
      {!blurry && isActive && <Item {...props} blurry />}
    </ItemElement>
  )
}
