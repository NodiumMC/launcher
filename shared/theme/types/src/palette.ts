import type { Palette as PaletteBuilder } from '@theme/builder'

export type Palette = PaletteBuilder<
  'background' | 'foreground' | 'gray' | 'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'success'
>
