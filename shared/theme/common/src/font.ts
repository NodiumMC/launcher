import { FontFamily } from '@theme/types'

export const main = 'mabry' as const

export const font = {
  main,
  interaction: main,
  display: main,
  monospace: main,
} satisfies FontFamily
