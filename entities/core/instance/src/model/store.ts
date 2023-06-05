import { createStore } from 'effector'
import { Instance } from './types'

export const $instances = createStore<Instance[]>([])
