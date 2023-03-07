import { ifProp, StyleFn } from '@styled/tools'
import { ControlButtonProps } from '../control-button.interface'

export const defaultAppearanceStyles: StyleFn = ({ theme }) => ({
  fontSize: '13px',
  color: theme.palette.gray._400,
  ':hover': {
    color: theme.palette.primary._500,
  },
})

export const destructiveAppearanceStyles = ifProp(
  (props: ControlButtonProps) => props.isDestructive,
  ({ theme }) => ({
    ':hover': {
      color: theme.palette.error._500,
    },
  }),
)
