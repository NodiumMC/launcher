export const darkTheme = {
  colors: {
    front: '#fcf6ff',
    frontShade: '#ede8ef',
    back: '#15151b',
    backShade: '#24242d',
    mid: '#676773',
    gray: '#9c9cab',
    danger: '#ff5050',
    warn: '#ffdc50',
    ok: '#bfff50',
    ambient: '#343442',
    accent: '#b2a2f6'
  },
  fonts: {
    interact: 'GTEestiProText',
    title: 'Tomorrow',
    text: 'Rubik'
  },
  transition: {
    time: '.3s',
  },
  gradients: {
    primary: 'linear-gradient(327deg, rgb(255, 176, 176) 0%, rgb(255, 137, 224) 50%, rgb(163, 71, 255) 100%)',
  },
}

export const lightTheme: ThemeType = {
  colors: {
    front: darkTheme.colors.back,
    frontShade: darkTheme.colors.backShade,
    back: darkTheme.colors.front,
    backShade: darkTheme.colors.frontShade,
    mid: '#9b989d',
    gray: darkTheme.colors.gray,
    danger: darkTheme.colors.danger,
    warn: darkTheme.colors.warn,
    ok: darkTheme.colors.ok,
    ambient: '#d3ccd5',
    accent: darkTheme.colors.accent
  },
  fonts: darkTheme.fonts,
  transition: darkTheme.transition,
  gradients: darkTheme.gradients,
}

export type ThemeType = typeof darkTheme
