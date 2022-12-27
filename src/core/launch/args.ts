import { ArgumentsArray, VersionFile } from 'core'
import { ParseRules } from 'core'
import { LaunchOptions } from 'core'
import { delimiter, join } from 'native/path'
import { compileClasspath } from 'core'
import { version } from 'native/app'
import { log4jArgument } from 'core/log4j'

const rulifyArgumnets = (args: ArgumentsArray): ArgumentsArray =>
  typeof args !== 'string'
    ? args.filter(arg => typeof arg === 'string' || ParseRules(arg, ['has_custom_resolution']).allow)
    : args

const flatArguments = (args: ArgumentsArray): string[] => {
  if (typeof args === 'string') return [args]
  const stringArgs = args.map(arg => (typeof arg === 'string' ? [arg] : ParseRules(arg).value ?? []))
  return stringArgs.flat()
}

const placeholderifyArguments =
  (options: VersionedLaunchOptions, classPath: string) =>
  (args: string[]): string[] => {
    return args.map(arg =>
      arg
        .replaceAll('${auth_player_name}', options.username)
        .replaceAll('${auth_access_token}', options.accessToken ?? 'null')
        .replaceAll('${auth_uuid}', options.uuid ?? '00000000-0000-0000-0000-000000000000')
        .replaceAll('${game_directory}', options.gameDir)
        .replaceAll('${version_name}', options.vid)
        .replaceAll('${resolution_width}', options.windowWidth?.toString() ?? '1280')
        .replaceAll('${resolution_height}', options.windowHeight?.toString() ?? '720')
        .replaceAll('${assets_root}', join(options.gameDataDir, 'assets'))
        .replaceAll('${game_assets}', join(options.gameDataDir, 'assets'))
        .replaceAll('${assets_index_name}', options.version.assets)
        .replaceAll('${version_type}', options.version.type)
        .replaceAll('${natives_directory}', join(options.clientDir, 'natives'))
        .replaceAll('${launcher_name}', 'NodiumLauncher')
        .replaceAll('${launcher_version}', version)
        .replaceAll('${user_type}', 'mojang')
        .replaceAll('${clientid}', options.accessToken ?? 'null')
        .replaceAll('${library_directory}', join(options.gameDataDir, 'libraries'))
        .replaceAll('${classpath}', classPath)
        .replaceAll('${classpath_separator}', delimiter),
    )
  }

const chain = (args: string[]) => {
  const result: string[] = []
  let idx = 0
  let last: string | undefined = undefined
  for (let i = 0; i < args.length; i++) {
    const current = args[i]
    const next = args[i + 1]
    if (!current.startsWith('-') && last?.startsWith('--')) {
      result[idx] = `${last}=${current}`
    } else if (next && !next.startsWith('-') && current.startsWith('--')) {
      last = current
      result[idx] = `${current}=${next}`
      i++
    } else {
      result[idx] = current
    }
    idx++
  }
  return result
}

export interface VersionedLaunchOptions extends LaunchOptions {
  version: VersionFile
}

export const compileArguments = (options: VersionedLaunchOptions): string[] => {
  const game = options.version.arguments?.game ?? options.version.minecraftArguments?.split(' ')
  const jvm = options.version.arguments?.jvm ?? ['-cp', '${classpath}', '-Djava.library.path=${natives_directory}']
  const classPathString = compileClasspath(options.vid, options.version, options.gameDataDir, options.clientDir).join(
    delimiter,
  )
  const gargs = placeholderifyArguments(options, classPathString)(flatArguments(rulifyArgumnets(game)))
  const jargs = chain(placeholderifyArguments(options, classPathString)(flatArguments(rulifyArgumnets(jvm))))
  jargs.push(log4jArgument(options.version, options.clientDir))
  return [...jargs, ...(options.javaArgs ?? []), options.version.mainClass, ...gargs, ...(options.minecraftArgs ?? [])]
}
