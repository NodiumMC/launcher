import { FC } from 'react'
import { ProviderIcon, SupportedProviders, VersionProvider } from 'core/client-providers'
import { Img } from 'components/utils/Img'
import { Select } from 'components/micro/Select'

export const ProviderSelect: FC<ExtraProps.Changeable<SupportedProviders>> = props => (
  <Select
    {...props}
    mini
    menuPlacement={'top'}
    square
    unique={'provider'}
    options={Object.entries(VersionProvider)
      .reverse()
      .map(([value]) => ({
        value,
        label: <Img src={ProviderIcon[value as SupportedProviders]} />,
      }))}
  />
)
