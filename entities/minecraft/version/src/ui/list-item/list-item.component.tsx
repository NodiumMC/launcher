import { type FC } from 'react'
import type { ListItemProps } from './list-item.interface'

export const ListItem: FC<ListItemProps> = ({ type, id, displayName, icon }) => (
  <div>
    <div>{displayName}</div>
  </div>
)
