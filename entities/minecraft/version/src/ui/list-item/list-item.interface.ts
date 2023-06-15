import type { ReleaseType } from '@entities/minecraft-version'

export interface ListItemProps {
  id: string
  displayName: string
  icon: string
  type: ReleaseType
}
