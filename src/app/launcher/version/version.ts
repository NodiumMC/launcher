import { readJsonFile } from 'app/filesystem/utils'

export type OSType = 'osx' | 'windows' | 'linux' | 'unknown'
export type ArchType = string
export type NativesType =
  | 'javadoc'
  | 'natives-linux'
  | 'natives-windows'
  | 'natives-macos'
  | 'natives-osx'

export interface Rule {
  action: 'allow' | 'disallow'
  features?: Record<string, boolean>
  os?: {
    name?: OSType
    arch?: ArchType
    version?: string
  }
}

export interface RuleContainer {
  rules: Rule[]
  value?: string | string[]
}

export type ArgumentsArray = (string | RuleContainer)[]

export interface AssetIndex {
  id: string
  sha1: string
  size: number
  totalSize: number
  url: string
}

export interface DownloadItem {
  sha1: string
  size: number
  url: string
}

export interface Artifact {
  path: string
  sha1?: string
  size: number
  url: string
}

export interface Library {
  name?: string
  url?: string
  natives?: Partial<Record<OSType, NativesType>>
  downloads?: {
    artifact: Artifact
    classifiers?: Partial<Record<NativesType, Artifact>>
  }
  extract?: {
    exclude?: string[]
  }
  rules?: Rule[]
  value?: string | string[]
}

export interface PartialLib {
  name: string
  url: string
}

export interface Logging {
  client: ClientLogging
}

export interface MojangFile {
  id: string
  sha1: string
  size: number
  url: string
}

export interface ClientLogging {
  argument: string
  file: MojangFile
  type: string
}

export interface VersionFile {
  arguments: {
    game: ArgumentsArray
    jvm: ArgumentsArray
  }
  assetIndex: AssetIndex
  assets: string
  complianceLevel: number
  downloads: {
    client: DownloadItem
    client_mappings?: DownloadItem
    server: DownloadItem
    server_mappings?: DownloadItem
    windows_server?: DownloadItem
  }
  id: string
  javaVersion: {
    component: string
    majorVersion: number
  }
  libraries: Library[]
  logging: Logging
  mainClass: string
  minimumLauncherVersion: number
  releaseTime: string
  time: string
  type: 'release' | 'snapshot' | 'modified'
  minecraftArguments?: string
}

export const mergeVersions = (...versions: VersionFile[]) => {
  const origin = { ...versions[0] }
  const next = versions.slice(1)
  const last = versions[versions.length - 1]
  if (!next) return origin
  origin.mainClass = last.mainClass
  origin.type = last.type
  origin.arguments.jvm.push(...versions.map(v => v.arguments.jvm).flat())
  origin.arguments.game.push(...versions.map(v => v.arguments.game).flat())
  origin.libraries.push(...versions.map(v => v.libraries).flat())
  return origin
}

export const readVersionFile = async (path: string): Promise<VersionFile> =>
  readJsonFile(path)
