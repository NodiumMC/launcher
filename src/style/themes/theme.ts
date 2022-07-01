export const darkTheme = {
  colors: {
    front: '#fcf6ff',
    frontShade: '#ede8ef',
    back: '#15151b',
    backShade: '#24242d',
    mid: '#676773',
    danger: '#ff5050',
    warn: '#ffdc50',
    ok: '#bfff50',
    ambient: '#343442'
  },
  fonts: {
    interact: 'GTEestiProText'
  },
  transition: {
    time: '.3s'
  }
}

export const lightTheme: ThemeType = {
  colors: {
    front: darkTheme.colors.back,
    frontShade: darkTheme.colors.backShade,
    back: darkTheme.colors.front,
    backShade: darkTheme.colors.frontShade,
    mid: '#9b989d',
    danger: darkTheme.colors.danger,
    warn: darkTheme.colors.warn,
    ok: darkTheme.colors.ok,
    ambient: '#d3ccd5'
  },
  fonts: darkTheme.fonts,
  transition: darkTheme.transition
}

export type ThemeType = typeof darkTheme
