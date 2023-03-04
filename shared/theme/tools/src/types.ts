import type { Schema } from '@theme/types'
import type { InterpolationPrimitive } from '@emotion/serialize'

export type StyleFn<T = Record<string, never>> = (props?: (T & { theme: Schema }) | any) => InterpolationPrimitive
