import { UserConfig } from 'vitest'

export const vitest = {
  includeSource: ['./**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  environment: 'happy-dom',
  globals: true,
  root: '../../../',
  coverage: {
    provider: 'istanbul',
  },
} satisfies UserConfig
