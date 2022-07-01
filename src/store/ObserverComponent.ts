import { observer } from 'mobx-react'
import React from 'react'

export const Observer = <T>(component: React.FC<T>) =>
  observer(component)
