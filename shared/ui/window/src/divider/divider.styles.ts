import { StyleFn } from '@styled/tools'

export const styles: StyleFn = ({ theme }) => ({
  width: '100%',
  height: '1px',
  backgroundColor: theme.palette.gray._50,
  maskImage: 'linear-gradient(90deg, transparent, white, transparent)',
  transitionProperty: 'backgroundColor',
  transitionDuration: theme.time.default,
})
