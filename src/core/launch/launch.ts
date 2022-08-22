import { readVersionFile } from 'core'
import { compileArguments, VersionedLaunchOptions } from 'core'
import { command } from 'native/shell'
import { join } from '@tauri-apps/api/path'

export interface LaunchOptions {
  javaExecutable?: string
  javaArgs?: string[]
  minecraftArgs?: string[]
  gameDir: string
  gameDataDir: string
  alloc: number
  clientDir: string
  username: string
  uuid: string
  accessToken: string
  windowHeight: number
  windowWidth: number
}

export const launch = async (options: LaunchOptions) => {
  const version = await readVersionFile(
    await join(options.clientDir, 'version.json'),
  )
  const vlaunch: VersionedLaunchOptions = { ...options, version }
  const args = await compileArguments(vlaunch)
  return command(options.javaExecutable ?? 'java', args, options.gameDir)
}
