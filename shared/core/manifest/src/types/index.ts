export type OsName = 'osx' | 'windows' | 'linux'
export type OsArch = string

export interface OsRule {
  name?: OsName
  version?: string
  arch?: OsArch
}

export interface Rule {
  action: 'allow' | 'disallow'
  features?: Record<string, string | number | boolean>
  os?: OsRule
}

export interface ExternalCondition {
  rules: Rule[]
}

export interface ConditionValue<T> {
  rules: Rule[]
  value: T
}

export type ArgumentsConditionValue = ConditionValue<string | string[]>

export type Argument = string | ArgumentsConditionValue

export interface ManifestArguments {
  game: Argument[]
  jvm: Argument[]
}

export interface AssetIndexArtifact {
  id: string
  sha1: string
  size: number
  totalSize: number
  url: string
}

export interface JavaVersion {
  component: string
  majorVersion: number
}

export interface UrlArtifact {
  url: string
}

export interface SizedArtifact extends UrlArtifact {
  size: number
}

export interface BaseArtifact extends SizedArtifact {
  id: string
}

export interface Downloads {
  client: SizedArtifact
  server: SizedArtifact
}

export interface ClientLogging {
  argument: string
  file: BaseArtifact
  type: string
}

export interface Logging {
  client: ClientLogging
}

export interface PartialLibrary {
  name: string
  url: string
}

export interface LibraryArtifact extends BaseArtifact {
  path: string
}

export interface LibraryDownloads {
  artifact: LibraryArtifact
}

export interface Library extends ExternalCondition {
  name: string
  downloads: LibraryDownloads
}

export interface Classifiers {
  'native-linux'?: LibraryArtifact
  'native-osx'?: LibraryArtifact
  'native-windows'?: LibraryArtifact
}

export interface LibraryClassifiers {
  artifact: LibraryArtifact
  classifiers: Classifiers
}

export interface LibraryNatives {
  linux?: 'natives-linux'
  osx?: 'natives-osx'
  windows?: 'natives-windows'
}

export interface NativeLibrary extends ExternalCondition {
  name: string
  downloads: LibraryClassifiers
  natives: LibraryNatives
}

export type ManifestLibrary = PartialLibrary | Library | NativeLibrary

export interface Manifest {
  arguments: ManifestArguments
  assetIndex: AssetIndexArtifact
  assets: string
  complianceLevel: number
  downloads: Downloads
  id: string
  javaVersion: JavaVersion
  libraries: ManifestLibrary[]
  logging: Logging
  mainClass: string
  minimumLauncherVersion: number
  releaseTime: string
  time: string
  type: string
}

export interface ManifestLegacy {
  assetIndex: AssetIndexArtifact
  assets: string
  complianceLevel: number
  downloads: Downloads
  javaVersion: JavaVersion
  libraries: ManifestLibrary[]
  logging: Logging
  mainClass: string
  minecraftArguments: string
  minimumLauncherVersion: number
  releaseTime: string
  time: string
  type: string
}

