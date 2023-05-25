import type { Schema } from './index'

import '@emotion/react'

declare module '@emotion/react' {
  interface Theme extends Schema {}
}

export * from './index'
