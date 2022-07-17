export const darkTheme = {
  colors: {
    front: '#f8faff',
    frontShade: '#e3e6ec',
    back: '#151718',
    backShade: '#25282a',
    mid: '#676773',
    gray: '#9c9cab',
    danger: '#ff5050',
    warn: '#fff791',
    ok: '#bfff50',
    ambient: '#343442',
    accent: '#7458f5',
    console: [
      '#000',
      '#ff5050',
      '#bfff50',
      '#ffdc50',
      '#55F',
      '#F5F',
      '#5FF',
      '#AAA',
      '#555',
      '#ff245d',
      '#80ff2c',
      '#ffcf11',
      '#6237ff',
      '#d231ff',
      '#00ff8b',
      '#FFF'
    ],
  },
  fonts: {
    interact: 'GTEestiProText',
    title: 'Tomorrow',
    text: 'Rubik',
  },
  transition: {
    time: '.3s',
  },
  gradients: {
    primary: 'linear-gradient(327deg, rgb(255, 176, 176) 0%, rgb(255, 137, 224) 50%, rgb(163, 71, 255) 100%)',
    accent: 'linear-gradient(45deg, #8468ff, #e69bff)'
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
    accent: darkTheme.colors.accent,
    console: [
      '#ffffff',
      '#ff5050',
      '#4fb000',
      '#e3df00',
      '#55F',
      '#F5F',
      '#00b2ff',
      '#AAA',
      '#555',
      '#ff245d',
      '#80ff2c',
      '#ffcf11',
      '#6237ff',
      '#d231ff',
      '#00ff8b',
      '#000000'
    ],
  },
  fonts: darkTheme.fonts,
  transition: darkTheme.transition,
  gradients: darkTheme.gradients,
}

export type ThemeType = typeof darkTheme
