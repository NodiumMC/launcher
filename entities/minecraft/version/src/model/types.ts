export type ReleaseType = 'latest-release' | 'latest-snapshot' | 'release' | 'snapshot' | 'custom'

export interface MinecraftVersion {
  displayName: string
  id: string
  icon: string
  created: string
  lastUsed: string
  type: ReleaseType
}
