import { readJsonFile } from 'native/filesystem'

export type OSType = 'osx' | 'windows' | 'linux' | 'unknown'
export type ArchType = string
export type NativesType = 'javadoc' | 'natives-linux' | 'natives-windows' | 'natives-macos' | 'natives-osx'

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

export type ArgumentsArray = (string | RuleContainer)[] | string

export interface AssetInfo {
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
  client?: ClientLogging
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
  assetIndex: AssetInfo
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
  mavenFiles?: Library[]
  logging: Logging
  mainClass: string
  minimumLauncherVersion: number
  releaseTime: string
  time: string
  type: 'release' | 'snapshot' | 'modified'
  minecraftArguments?: string
  inheritsFrom?: string
}

export interface ForgeProfile {
  libraries: Library[]
}

export const mergeVersions = (first: VersionFile, second: VersionFile) => {
  const origin = { ...first, ...second }
  origin.libraries = [...(first.libraries ?? []), ...(second.libraries ?? [])]
  origin.mavenFiles = [...(first.mavenFiles ?? []), ...(second.mavenFiles ?? [])]
  if (origin.arguments) {
    origin.arguments.jvm = [...(first.arguments?.jvm ?? []), ...(second.arguments?.jvm ?? [])]
    origin.arguments.game = [...(first.arguments?.game ?? []), ...(second.arguments?.game ?? [])]
  }
  return origin
}

export const readVersionFile = async (path: string): Promise<VersionFile> => readJsonFile(path)
