import { deriveDarkFromAccent, deriveLightdFromAccent } from '@theme/builder'

// Accent
export const primary = '#5297ff' as const
export const secondary = '#7b2eff' as const
export const tertiary = secondary

// Bakground, Foreground
export const dark = deriveDarkFromAccent(primary)
export const light = deriveLightdFromAccent(primary)

// Semantic
export const error = '#F04438' as const
export const warning = '#F79009' as const
export const success = '#12B76A' as const

// TODO: Other
