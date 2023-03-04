import type { FC } from 'react'
import { ThemeProvider } from '@theme/provider'

export const withTheme = (component: FC) => () => <ThemeProvider>{component({})}</ThemeProvider>
