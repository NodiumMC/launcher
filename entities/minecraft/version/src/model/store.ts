import { createEffect, createStore, combine } from 'effector'
import type { MinecraftVersion } from './types'
import { fetchLocalMinecraftVersions, saveMinecraftVersions } from '../lib'

export const $versions = createStore<MinecraftVersion[]>([])

export const syncWithLocalVersionsFx = createEffect(() => fetchLocalMinecraftVersions())
export const saveVersionsFx = createEffect(() => saveMinecraftVersions($versions.getState()))

export const $pending = combine(saveVersionsFx.pending, syncWithLocalVersionsFx.pending, (a, b) => a || b)

$versions.on(syncWithLocalVersionsFx.doneData, (_, versions) => versions)
