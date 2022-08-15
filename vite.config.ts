import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import swc from 'unplugin-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths(), swc.vite()],
  server: {
    port: 3000,
  },
})
