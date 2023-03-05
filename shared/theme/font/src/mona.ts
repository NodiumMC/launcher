import font from './assets/Mona-Sans.woff2'
import { StyleFn } from '@style/tools'

export const monaFontFace: StyleFn = () => ({
  '@font-face': {
    fontFamily: 'Mona Sans',
    src: `
          url('${font}') format('woff2 supports variations'),
          url('${font}') format('woff2-variations')`,
  },
})
