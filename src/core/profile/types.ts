export interface LauncherProfileJSON {
  lastUsed?: string
  lastVersionId: string
  created: string
  name: string
  icon?: string
  type: 'latest-release' | 'custom' | 'latest-snapshot' | 'release' | 'snapshot'
  gameDir?: string
  javaDir?: string
  javaArgs?: string
  minecraftArgs?: string
  ready: boolean
}

export interface LauncherProfiles {
  profiles: Record<string, LauncherProfileJSON>
}
