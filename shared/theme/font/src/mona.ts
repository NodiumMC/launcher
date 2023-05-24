import font from './assets/Mona-Sans.woff2'

export const monaFontFace = () => ({
  '@font-face': {
    fontFamily: 'Mona Sans',
    src: `
          url('${font}') format('woff2 supports variations'),
          url('${font}') format('woff2-variations')`,
  },
})
