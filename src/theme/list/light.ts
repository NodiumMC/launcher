import { dark } from 'theme/list'
import { Theme } from 'theme/type'

export const light: Theme = {
  ...dark,
  master: {
    ...dark.master,
    back: dark.master.front,
    front: dark.master.back,
  },
}
