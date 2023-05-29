import { combine, ifNotProp, ifProp, variants, StyleFn } from '@lmpx/styled'
import { ButtonProps } from '../button.interface'

const base: StyleFn = ({ theme }) => ({
  fontFamily: theme.font.interaction,
  fontWeight: '600',
})

const primaryDefault: StyleFn = ({ theme }) => ({
  backgroundColor: theme.palette.primary._500,
  color: theme.palette.background,
})

const primaryNotDisabled: StyleFn = ({ theme }) => ({
  ':hover': {
    backgroundColor: theme.palette.primary._600,
  },
})

const primaryDestructive: StyleFn = ({ theme }) => ({
  backgroundColor: theme.palette.error._500,
  ':hover': {
    backgroundColor: theme.palette.error._600,
  },
})

const primaryDisabled: StyleFn = ({ theme }) => ({
  backgroundColor: theme.palette.gray._200,
})

const secondaryDefault: StyleFn = ({ theme }) => ({
  backgroundColor: theme.palette.gray._100,
  color: theme.palette.gray._700,
})

const secondaryNotDisabled: StyleFn = ({ theme }) => ({
  ':hover': {
    backgroundColor: theme.palette.gray._50,
  },
})

const secondaryDestructive: StyleFn = ({ theme }) => ({
  color: theme.palette.error._500,
  backgroundColor: theme.palette.error._100,
  ':hover': {
    backgroundColor: theme.palette.error._50,
  },
})

export const secondaryDisabled: StyleFn = ({ theme }) => ({
  backgroundColor: theme.palette.gray._25,
  color: theme.palette.gray._200,
})

const primary = combine(
  primaryDefault,
  ifProp((props: ButtonProps) => props.disabled, primaryDisabled),
  ifNotProp((props: ButtonProps) => props.disabled, primaryNotDisabled),
  ifProp((props: ButtonProps) => props.destructive, primaryDestructive),
)

const secondary = combine(
  secondaryDefault,
  ifProp((props: ButtonProps) => props.disabled, secondaryDisabled),
  ifNotProp((props: ButtonProps) => props.disabled, secondaryNotDisabled),
  ifProp((props: ButtonProps) => props.destructive, secondaryDestructive),
)

export const appearanceStyles = combine(
  base,
  variants((props: ButtonProps) => props.variant, { primary, secondary }),
)
