import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'
import { error, log } from 'debug'

export const updateApp = async () => {
  try {
    const { shouldUpdate, manifest } = await checkUpdate()
    log('Update manifest:', manifest)
    if (shouldUpdate) {
      await installUpdate()
      await relaunch()
    }
  } catch (e) {
    error(`Failed to check update: ${e}`)
  }
}
