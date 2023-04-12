import { Schema } from '@theme/types'
import { useTheme as useEmotionTheme } from '@emotion/react'

export * from '@emotion/styled'
export * from '@emotion/react'
export { cx } from '@emotion/css'
export * from 'styled-system'
export { type Theme } from '@emotion/react'
export * from './combine'

export * from './prop-tools'
export * from './style-fn'

export { default as styled } from '@emotion/styled'

export function useTheme() {
  return useEmotionTheme() as Schema
}
