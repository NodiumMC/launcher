const fonts = import.meta.glob('./assets/*.mabry.woff2', { eager: true })

export const mabryFontFaces = Object.entries(fonts).map(([path, { default: url }]: any) => () => ({
  '@font-face': {
    fontFamily: 'mabry',
    src: `url(${url}) format('woff2')`,
    fontWeight: path.split('/').at(-1)?.split('-')[0].slice(0, 3) ?? '400',
    fontStyle: path.split('/').at(-1)?.split('-')[1] ? 'italic' : 'normal',
    fontDisplay: 'swap'
  },
}))
