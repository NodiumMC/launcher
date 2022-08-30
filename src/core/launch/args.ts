import { ArgumentsArray, VersionFile } from 'core'
import { ParseRules } from 'core'
import { LaunchOptions } from 'core'
import { delimiter, join } from '@tauri-apps/api/path'
import { getVersion } from '@tauri-apps/api/app'
import { compileClasspath } from 'core'

const rulifyArgumnets = async (args: ArgumentsArray): Promise<ArgumentsArray> =>
  args.filterAsync(
    async arg =>
      typeof arg === 'string' ||
      (await ParseRules(arg, ['has_custom_resolution']).then(r => r.allow)),
  )

const flatArguments = async (args: ArgumentsArray): Promise<string[]> => {
  const stringArgs = await args.mapAsync(async arg =>
    typeof arg === 'string'
      ? [arg]
      : await ParseRules(arg).then(r => r.value ?? []),
  )
  return stringArgs.flat()
}

const placeholderifyArguments =
  (options: VersionedLaunchOptions, classPath: string) =>
  async (args: string[]): Promise<string[]> => {
    return args.mapAsync(async arg =>
      arg
        .replaceAll('${auth_player_name}', options.username)
        .replaceAll('${auth_access_token}', options.accessToken ?? 'null')
        .replaceAll(
          '${auth_uuid}',
          options.uuid ?? '00000000-0000-0000-0000-000000000000',
        )
        .replaceAll('${game_directory}', options.gameDir)
        .replaceAll('${version_name}', options.version.id)
        .replaceAll('${resolution_width}', options.windowWidth.toString())
        .replaceAll('${resolution_height}', options.windowHeight.toString())
        .replaceAll('${assets_root}', await join(options.gameDataDir, 'assets'))
        .replaceAll('${game_assets}', await join(options.gameDataDir, 'assets'))
        .replaceAll('${assets_index_name}', options.version.assets)
        .replaceAll('${version_type}', options.version.type)
        .replaceAll(
          '${natives_directory}',
          await join(options.clientDir, 'natives'),
        )
        .replaceAll('${launcher_name}', 'NodiumLauncher')
        .replaceAll('${launcher_version}', await getVersion())
        .replaceAll('${user_type}', 'mojang')
        .replaceAll('${clientid}', options.accessToken ?? 'null')
        .replaceAll(
          '${library_directory}',
          await join(options.gameDataDir, 'libraries'),
        )
        .replaceAll('${classpath}', classPath)
        .replaceAll('${classpath_separator}', delimiter),
    )
  }

export interface VersionedLaunchOptions extends LaunchOptions {
  version: VersionFile
}

export const compileArguments = async (
  options: VersionedLaunchOptions,
): Promise<string[]> => {
  const game = options.version.arguments.game ?? options.minecraftArgs
  const jvm = options.version.arguments.jvm ?? options.javaArgs
  const classPathString = await compileClasspath(
    options.vid,
    options.version,
    options.gameDataDir,
    options.clientDir,
  ).then(v => v.join(delimiter))
  const gargs = await rulifyArgumnets(game)
    .then(flatArguments)
    .then(placeholderifyArguments(options, classPathString))
  const jargs = await rulifyArgumnets(jvm)
    .then(flatArguments)
    .then(placeholderifyArguments(options, classPathString))
  return [...jargs, options.version.mainClass, ...gargs]
}
