import type { Schema } from '@theme/types'
import type { InterpolationPrimitive } from '@emotion/serialize'

export type StyleFn = (props: Record<any, any> | { theme: Schema }) => InterpolationPrimitive
