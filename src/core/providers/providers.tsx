import vanilla from 'assets/img/minecraft-mojang.png'
import fabric from 'assets/img/minecraft-fabric.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactNode } from 'react'
import { Img } from 'components/utils/Img'

export const VersionProvider = {
  vanilla: 'Vanilla',
  fabric: 'Fabric',
  custom: 'Custom',
}

export type SupportedProviders = keyof typeof VersionProvider

export const ProviderIcon: Record<SupportedProviders, ReactNode> = {
  vanilla: <Img src={vanilla} />,
  fabric: <Img src={fabric} />,
  custom: <FontAwesomeIcon icon={'ellipsis'} />,
}
