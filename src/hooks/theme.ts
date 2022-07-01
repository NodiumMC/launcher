import { useStore } from './useStore'

export const useTheme = () => useStore(s => s.theme)
