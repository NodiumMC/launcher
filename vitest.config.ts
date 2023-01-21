import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ['src/**/*.{ts,tsx}'],
    setupFiles: ['reflect-metadata', 'src/extra/jsutils'],
    environment: 'happy-dom',
    globals: true,
    coverage: {
      provider: 'istanbul',
    },
  },
})
