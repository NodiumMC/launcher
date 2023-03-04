import { defineConfig } from 'vite'
import { reactSwc } from './plugins'
import { vitestConfig } from './vitest'
import { buildConfig } from './build'
import { serverConfig } from './server'
import { miscOptions } from './misc'

export default defineConfig({
  plugins: [reactSwc],
  build: buildConfig,
  server: serverConfig,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  test: vitestConfig,
  ...miscOptions,
})
