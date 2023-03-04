import { ShadesRecord } from './utils'

export interface Palette {
  // Appearance
  background: ShadesRecord
  foreground: ShadesRecord
  // Accent
  primary: ShadesRecord
  secondary: ShadesRecord
  tertiary: ShadesRecord
  // Semantic
  error: ShadesRecord
  warning: ShadesRecord
  success: ShadesRecord
  // Other
}
