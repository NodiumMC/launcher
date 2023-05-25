import { defineConfig } from 'vite'
import vite from '../../app/vite'
import { vitest } from './config'

export default defineConfig({
  ...vite,
  // @ts-ignore
  test: vitest,
})
