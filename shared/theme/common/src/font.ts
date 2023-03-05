import { FontFamily } from '@theme/types'

export const main = 'Mona Sans' as const

export const font = {
  main,
  interaction: main,
  display: main,
  monospace: main,
} satisfies FontFamily
