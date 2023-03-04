import { deriveDarkFromAccent, deriveLightdFromAccent } from '@theme/builder'

// Accent
export const primary = '#5297ff'
export const secondary = '#7b2eff'
export const tertiary = secondary

// Bakground, Foreground
export const dark = deriveDarkFromAccent(primary)
export const light = deriveLightdFromAccent(primary)

// Semantic
export const error = '#F04438'
export const warning = '#F79009'
export const success = '#12B76A'

// TODO: Other
