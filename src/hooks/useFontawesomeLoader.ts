import { useOnce } from 'hooks/useOnce'
import { loadFAIcons } from 'utils/loadIcons'

export const useFontawesomeLoader = () => useOnce(loadFAIcons)
