import { defineConfig } from 'vite'
import vite from '../../app/vite'
import { vitest } from './config'

export default defineConfig({
  ...vite,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  test: vitest,
})
