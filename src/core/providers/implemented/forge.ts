import { fetchForgeLoaders, Provider } from '..'
import { forgeVersion } from 'core/providers/endpoints'
import { Rdownload, RunzipReadSingle } from 'native/rust'
import { join } from 'native/path'
import { GAME_DIR, prepare } from 'native/filesystem'
import { ForgeProfile, Library, VersionFile } from 'core/version'
import { mapErr } from 'error'
import { FetchManifestException } from 'core/providers/exceptions'
import { cache } from 'storage'

const repo = 'https://maven.minecraftforge.net/'

const forgwWrapper = {
  name: 'io.github.zekerzhayard:forgewrapper:1.5.5',
  downloads: {
    artifact: {
      path: 'io/github/zekerzhayard/forgewrapper/1.5.5/forgewrapper-1.5.5.jar',
      url: 'https://github.com/ZekerZhayard/ForgeWrapper/releases/download/1.5.5/ForgeWrapper-1.5.5.jar',
      size: 34331,
    },
  },
}

const isModernForge = (version: VersionFile) => {
  const [major, minor] = version?.inheritsFrom?.split('.') ?? []
  return +major === 1 && +minor > 12
}

const isForgeMain = (library: Library) => library.name?.startsWith('net.minecraftforge:forge:')

export const forge: Provider = async (id: string, loader?: string): Promise<VersionFile> => {
  const cacheKey = `provider-forge-${id}-${loader}`
  // const candidate = await cache.getItem<VersionFile>(cacheKey)
  // if (candidate) return candidate
  loader ||= await fetchForgeLoaders(id).then(res => res.first)
  const jarUrl = forgeVersion.explain({
    version: id,
    loader: loader!,
  })
  const downloadPath = await prepare(join(GAME_DIR, '.forge', `forge-${id}-${loader}.jar`), true)
  try {
    await Rdownload(jarUrl, downloadPath)
    const verionJson: VersionFile = JSON.parse(await RunzipReadSingle(downloadPath, 'version.json'))
    const installerProfile: ForgeProfile = JSON.parse(await RunzipReadSingle(downloadPath, 'install_profile.json'))
    const json: VersionFile = {
      ...verionJson,
      libraries: [...verionJson.libraries, forgwWrapper],
      mavenFiles: installerProfile.libraries,
      mainClass: 'io.github.zekerzhayard.forgewrapper.installer.Main',
    }
    const mainForge = json.libraries.find(isForgeMain)
    if (mainForge) {
      const ending = isModernForge(verionJson) ? 'launcher' : 'universal'
      mainForge.name += ':' + ending
      if (mainForge.downloads) {
        mainForge.downloads.artifact.path = mainForge.downloads.artifact.path.replace('.jar', `-${ending}.jar`)
        mainForge.downloads.artifact.url = repo + mainForge.downloads.artifact.path
      }
    }
    const mavenForge = json.mavenFiles?.find(isForgeMain)
    if (mavenForge && mainForge?.downloads)
      mavenForge.downloads!.artifact.url = repo + mavenForge.downloads!.artifact.path
    const fwArgs = [
      '-Dforgewrapper.librariesDir=${library_directory}',
      `-Dforgewrapper.installer=${downloadPath}`,
      '-Dforgewrapper.minecraft=${client_path}',
    ]
    if (json.minecraftArguments) json.minecraftArguments += ` ${fwArgs.join(' ')}`
    json.arguments.jvm = [...json.arguments.jvm, ...fwArgs]
    await cache.setItem(cacheKey, json)
    return json
  } catch (e) {
    throw mapErr(FetchManifestException)(e)
  }
}
