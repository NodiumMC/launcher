import { Shade } from '@theme/types'

export type Palette<T extends string> = {
  [P in T | `${T}${Shade}`]: string
}
