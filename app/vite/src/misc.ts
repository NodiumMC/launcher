import { UserConfig } from 'vite'

export const miscOptions = {
  define: {
    'import.meta.vitest': 'undefined',
  },
  envPrefix: ['VITE_', 'TAURI_'],
  clearScreen: false,
} satisfies UserConfig
