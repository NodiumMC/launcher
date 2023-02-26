import { UserConfig } from 'vitest'

export const vitestConfig = {
  includeSource: ['src/**/*.{ts,tsx}'],
  setupFiles: ['@test/entrypoint'],
  environment: 'happy-dom',
  globals: true,
  coverage: {
    provider: 'istanbul',
  },
} satisfies UserConfig
