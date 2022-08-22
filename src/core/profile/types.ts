export interface LauncherProfile {
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
  attached?: string
}

export interface NodiumUserProdfile {
  accessToken: string
  nid: string
}

export interface LauncherProfiles {
  profiles: Record<string, LauncherProfile>
}
