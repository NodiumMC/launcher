/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@nodium/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  define: {
    'import.meta.vitest': 'undefined',
  },
  plugins: [react(), tsconfigPaths()],
  clearScreen: false,
  server: {
    port: 3000,
    strictPort: true,
  },
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    target: ['es2021', 'chrome100', 'safari13'],
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,
    chunkSizeWarningLimit: 1024 * 1024,
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  test: {
    includeSource: ['src/**/*.{ts,tsx}'],
    setupFiles: ['reflect-metadata', './src/extra/jsutils.ts'],
    environment: 'happy-dom',
    globals: true,
    coverage: {
      provider: 'istanbul',
    },
  },
})
