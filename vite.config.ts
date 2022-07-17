import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import swc from 'unplugin-swc'

export default defineConfig({
  plugins: [react(), swc.vite()],
  server: {
    port: 3000,
  }
})
