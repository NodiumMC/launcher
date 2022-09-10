import mojang from 'assets/img/minecraft-mojang.png'
import fabric from 'assets/img/minecraft-fabric.png'

export const VersionProvider = {
  mojang: 'Mojang',
  fabric: 'Fabric',
}

export type SupportedProviders = keyof typeof VersionProvider

export const ProviderIcon: Record<SupportedProviders, string> = {
  mojang,
  fabric,
}
