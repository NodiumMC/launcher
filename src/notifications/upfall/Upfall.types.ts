import { IconName } from '@fortawesome/fontawesome-svg-core'

export interface Upfall {
  id: string
  type: 'default' | 'ok' | 'error' | 'warn'
  content: string
  icon?: IconName
  remove: () => void
}
