import { ShadesRecord } from './utils'

export interface Palette {
  // Appearance
  background: string
  foreground: string
  gray: ShadesRecord
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
