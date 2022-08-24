import { dark } from 'theme/list'
import { Theme } from 'theme/type'

export const light: Theme = {
  ...dark,
  palette: {
    ...dark.palette,
    front: { ...dark.palette.back },
    back: { ...dark.palette.front },
  },
}
