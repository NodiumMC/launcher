import { BuildOptions } from 'vite'
import { isDebug } from './debug'
import { Megabyte } from './constants'

export const buildConfig = {
  target: ['es2021', 'chrome100', 'safari13'],
  minify: !isDebug ? 'esbuild' : false,
  sourcemap: isDebug,
  chunkSizeWarningLimit: Megabyte,
} satisfies BuildOptions
