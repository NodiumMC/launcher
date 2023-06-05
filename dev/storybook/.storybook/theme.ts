import { create } from '@storybook/theming'
import darkSchema from '@theme/dark-schema'
import lightSchema from '@theme/light-schema'

const base = {
  appBorderRadius: 6,
  fontBase: 'Mabry, "JetBrains Mono", sans-serif',
  fontCode: 'Mabry, "JetBrains Mono", monospace',
  inputBorderRadius: 6,
  brandTitle: 'Nodium Launcher',
  brandTarget: '_self',
}

export const dark = create({
  ...base,

  base: 'dark',

  colorPrimary: darkSchema.palette.primary._500,
  colorSecondary: darkSchema.palette.primary._500,

  // UI
  appBg: darkSchema.palette.background,
  appContentBg: darkSchema.palette.background,
  appBorderColor: darkSchema.palette.gray._100,

  // Text colors
  textColor: darkSchema.palette.foreground,
  textInverseColor: darkSchema.palette.background,

  // Toolbar default and active colors
  barTextColor: darkSchema.palette.foreground,
  barSelectedColor: darkSchema.palette.primary._500,
  barBg: darkSchema.palette.background,

  // Form colors
  inputBg: darkSchema.palette.background,
  inputBorder: darkSchema.palette.gray._100,
  inputTextColor: darkSchema.palette.foreground,
})

export const light = create({
  ...base,

  base: 'dark',

  colorPrimary: lightSchema.palette.primary._500,
  colorSecondary: lightSchema.palette.primary._500,

  // UI
  appBg: lightSchema.palette.background,
  appContentBg: lightSchema.palette.background,
  appBorderColor: lightSchema.palette.gray._100,

  // Text colors
  textColor: lightSchema.palette.foreground,
  textInverseColor: lightSchema.palette.background,

  // Toolbar default and active colors
  barTextColor: lightSchema.palette.foreground,
  barSelectedColor: lightSchema.palette.primary._500,
  barBg: lightSchema.palette.background,

  // Form colors
  inputBg: lightSchema.palette.background,
  inputBorder: lightSchema.palette.gray._100,
  inputTextColor: lightSchema.palette.foreground,
})
