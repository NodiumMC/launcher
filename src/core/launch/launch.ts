import { readVersionFile } from 'core'
import { compileArguments, VersionedLaunchOptions } from 'core'
import { spawn } from 'native/shell'
import { extendExecutable, join } from 'native/path'
import { exists } from 'native/filesystem'
import { w } from 'debug'

export interface LaunchOptions {
  vid: string
  javaExecutable?: string | ((major: number) => Awaitable<string | undefined>)
  javaArgs?: string[]
  minecraftArgs?: string[]
  gameDir: string
  gameDataDir: string
  alloc?: number
  clientDir: string
  username: string
  uuid?: string
  accessToken?: string
  windowHeight?: number
  windowWidth?: number
}

export const launch = async (options: LaunchOptions) => {
  const versionFilePath = join(options.clientDir, `${options.vid}.json`)
  if (!(await exists(versionFilePath))) throw new Error(`There is no version ${options.vid}`)
  const version = await readVersionFile(versionFilePath)
  const vlaunch: VersionedLaunchOptions = { ...options, version }
  const args = compileArguments(vlaunch)
  const jvme =
    typeof options.javaExecutable === 'function'
      ? await options.javaExecutable(version.javaVersion.majorVersion)
      : options.javaExecutable
  if (jvme && !(await exists(extendExecutable(jvme))))
    w(t => t.missing_jvm_executable, `JVM Executable missing: ${extendExecutable(jvme)}`)
  return spawn(jvme ?? 'java', args, options.gameDir)
}
