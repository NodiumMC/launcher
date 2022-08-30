import { readVersionFile } from 'core'
import { compileArguments, VersionedLaunchOptions } from 'core'
import { command } from 'native/shell'
import { join } from '@tauri-apps/api/path'
import { exists } from 'native/filesystem'

export interface LaunchOptions {
  vid: string
  javaExecutable?: string
  javaArgs?: string[]
  minecraftArgs?: string[]
  gameDir: string
  gameDataDir: string
  alloc: number
  clientDir: string
  username: string
  uuid?: string
  accessToken?: string
  windowHeight: number
  windowWidth: number
}

export const launch = async (options: LaunchOptions) => {
  const versionFilePath = await join(options.clientDir, `${options.vid}.json`)
  if(!(await exists(versionFilePath))) throw new Error(`There is no version ${options.vid}`)
  const version = await readVersionFile(versionFilePath)
  const vlaunch: VersionedLaunchOptions = { ...options, version }
  const args = await compileArguments(vlaunch)
  console.log(args)
  return command(options.javaExecutable ?? 'java', args, options.gameDir)
}
