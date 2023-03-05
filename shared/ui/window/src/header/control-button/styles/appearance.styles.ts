import { ifProp, StyleFn } from '@style/tools'
import { ControlButtonProps } from '../control-button.interface'

export const defaultAppearanceStyles: StyleFn = ({ theme }) => ({
  fontSize: '13px',
  color: theme.palette.foreground._400,
  ':hover': {
    color: theme.palette.primary._500,
  },
})

export const destructiveAppearanceStyles = ifProp<ControlButtonProps, StyleFn>(
  props => props?.isDestructive,
  ({ theme }) => ({
    ':hover': {
      color: theme.palette.error._500,
    },
  }),
)
