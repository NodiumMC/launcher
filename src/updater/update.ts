import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'
import { TODO } from 'utils/todo'

export const updateApp = async () => {
  try {
    const { shouldUpdate } = await checkUpdate()
    if (shouldUpdate) {
      await installUpdate()
      await relaunch()
    }
  } catch (e) {
    TODO()
  }
}
