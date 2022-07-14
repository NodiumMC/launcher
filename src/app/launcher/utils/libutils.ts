import { Artifact, Library, PartialLib } from '../version/version'
import { os } from './os'
import { Rules } from '../version/Rule'
import { fetch } from '@tauri-apps/api/http'
import { DownloadableResource } from '../dl/download'
import { join } from '@tauri-apps/api/path'

export const isNativeLibrary = (lib: Library) => !!lib.natives

export const nativeArtifact = async (lib: Library) => {
  const native = lib?.natives?.[await os()]
  return native && lib.downloads?.classifiers?.[native]
}

export const compileLibArtifacts = async (libs: Library[]): Promise<[libs: Artifact[], natives: Artifact[]]> => {
  const ruledLibs = await Promise.all(libs.filter(async lib => lib.rules ? await Rules(lib.rules).then(v => v.allow) : true))
  const nlibs = ruledLibs.filter(lib => isNativeLibrary(lib))
  return [ruledLibs.map(v => v.downloads?.artifact!), await Promise.all(nlibs.map(async v => (await nativeArtifact(v))!)).then(v => v.filter(v => !!v))]
}

export const compileLibraries = async (libs: Library[], gameDataDir: string, clientDir: string): Promise<DownloadableResource[]> => {
  const librariesPath = await join(gameDataDir, 'libraries')
  const [dlibs, natives] = await compileLibArtifacts(libs)
  return Promise.all(dlibs.map(async v => (
    { ...v, local: await join(librariesPath, v.path) }
  )).concat(natives.map(async v => (
    { ...v, local: await join(clientDir, 'natives', libFile(v.path)) }
  ))))
}

export const libPath = (path: string): string[] => path.split('/')
export const libFile = (path: string): string => libPath(path).at(-1)!
export const isPartialLib = (lib: Library): lib is PartialLib => !lib.downloads

export const populateLib = async (plib: PartialLib): Promise<Library> => {
  try {
    const [group, artifact, version] = plib.name.split(':')
    const groupPath = group.replaceAll('.', '/')
    const artifactPath = `${groupPath}/${artifact}/${version}/${artifact}-${version}.jar`
    const artifactUrl = `${plib.url}${artifactPath}`
    const contentLength = await fetch(artifactUrl, {
      method: 'HEAD',
      timeout: 5000,
    }).then(res => +res.headers['Content-Length'])
    if (isNaN(contentLength)) throw new Error('Invalid content length')
    return {
      name: plib.name,
      downloads: {
        artifact: {
          url: artifactUrl,
          size: contentLength,
          path: artifactPath,
        },
      },
    }
  } catch (e: any) {
    throw new Error('Failed to populate library for reason: ' + e.message)
  }
}
