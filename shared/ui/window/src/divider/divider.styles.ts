import { StyleFn } from '@style/tools'

export const styles: StyleFn = ({ theme }) => ({
  width: '100%',
  height: '1px',
  backgroundColor: theme.palette.foreground._50,
  maskImage: 'linear-gradient(90deg, transparent, white, transparent)',
})
