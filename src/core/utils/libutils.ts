import { Artifact, Library, PartialLib } from 'core'
import { os } from 'core'
import { isRuled, ParseRules } from 'core'
import { fetch } from '@tauri-apps/api/http'
import { join } from 'native/path'
import { NonNullFilter } from 'utils/filters'
import { Resource } from 'network'

export const isNativeLibrary = (lib: Library) => !!lib.natives

export const nativeArtifact = (lib: Library) => {
  const native = lib?.natives?.[os]
  return native && lib.downloads?.classifiers?.[native]
}

export const compileLibArtifacts = (libs: Library[]): [libs: Artifact[], natives: Artifact[]] => {
  const ruledLibs = libs.filter(lib => (isRuled(lib) ? ParseRules(lib).allow : true))
  const nlibs = ruledLibs.filter(lib => isNativeLibrary(lib))
  return [
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    ruledLibs.filter(v => v.downloads?.artifact).map(v => v.downloads?.artifact!),
    nlibs.map(nativeArtifact).filter(NonNullFilter),
  ]
}

export const compileLibraries = (libs: Library[], gameDataDir: string, clientDir: string): Resource[] => {
  const librariesPath = join(gameDataDir, 'libraries')
  const [dlibs, natives] = compileLibArtifacts(libs)
  return [
    ...dlibs.map(v => ({
      ...v,
      local: join(librariesPath, v.path),
    })),
    ...natives.map(v => ({
      ...v,
      local: join(clientDir, 'natives', libFile(v.path)),
    })),
  ]
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
    }).then(res => +res.headers['content-length'])
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
    throw new Error('Failed to populate library for reason: ' + e)
  }
}
