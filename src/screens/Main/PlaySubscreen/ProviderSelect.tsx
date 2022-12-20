import { FC } from 'react'
import { ProviderIcon, SupportedProviders, VersionProvider } from 'core/providers'
import { Select } from 'components/molecules/Select'

export const ProviderSelect: FC<ExtraProps.DataInput<SupportedProviders>> = props => (
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
        label: ProviderIcon[value as SupportedProviders],
      }))}
  />
)
