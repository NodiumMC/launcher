import { FC, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Text } from 'components/micro/Text'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { transition } from 'style'
import { Select } from 'components/micro/Select'
import {
  ProviderIcon,
  SupportedProviders,
  VersionProvider,
} from 'core/client-providers'
import { Pair } from 'components/utils/Pair'
import { Img } from 'components/utils/Img'
import { useI18N } from 'hooks'
import useSWR from 'swr'
import { fetcher } from 'api/swr'
import { Checkbox } from 'components/micro/Checkbox'
import { isOld, isRelease } from 'core'
import { Observer, useModule } from 'mobmarch'
import { Button } from 'components/micro/Button'
import { GameProfileService } from 'core/services/GameProfile.service'
import { Grow } from 'components/utils/Grow'

const InstallIcon: FC<ExtraProps.Styled> = props => (
  <Text shade={'high'} size={12} {...props}>
    <FontAwesomeIcon icon={'download'} />
  </Text>
)

const StyledInstallIcon = styled(InstallIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  ${transition()}
`

const Content = styled.div`
  ${transition('opacity, translate, scale')}
  opacity: 0;
  translate: 0 100%;
  scale: 1 0;
  padding: 6px;
  position: relative;
  display: flex;
  gap: 24px;
  align-items: center;
  height: 100%;
`

const StyledMenu = styled.div`
  position: relative;
  height: 40px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.master.shade()};
  border-radius: ${({ theme }) => theme.radius()};
  background-color: ${({ theme }) => theme.master.shade()};

  ${transition('height')}
  &:hover, &:focus-within {
    ${StyledInstallIcon} {
      opacity: 0;
    }

    ${Content} {
      opacity: 1;
      translate: 0 0;
      scale: 1 1;
    }

    height: 100px;
    background-color: ${({ theme }) => theme.master.back};

    &:before {
      height: 100px;
    }
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    inset: 0;
    translate: 0 -100%;
    height: 0;
    width: 100%;
    ${transition('height')}
  }
`

const ProviderSelect: FC<ExtraProps.DataInput<SupportedProviders>> = ({
  onChange,
  value,
}) => {
  return (
    <Select<SupportedProviders>
      menuPlacement={'top'}
      placeholder={'Поставщик'}
      onChange={onChange}
      value={value}
      options={Object.entries(VersionProvider).map(([value, label]) => ({
        value,
        label: (
          <Pair>
            <Img src={ProviderIcon[value as SupportedProviders]} />
            <Text>{label}</Text>
          </Pair>
        ),
      }))}
    />
  )
}

const Sqbox = styled.div`
  height: 100% !important;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

interface Version {
  value: string
  latest: boolean
  stable: boolean
  time: string
}

const VersionSelect: FC<ExtraProps.DataInput<string> & { provider?: SupportedProviders }> =
  Observer(({ provider, onChange, value }) => {
    const i18n = useI18N()

    const [snapshots, setSnapshots] = useState(false)
    const [old, setOld] = useState(false)
    const { data, error } = useSWR<Version[]>(
      `/${provider}`,
      fetcher('https://nadmelas.nodium.ru/list'),
    )

    const versions = useMemo(
      () =>
        data
          ?.filter?.(v => snapshots || isRelease(v.value))
          ?.filter?.(v => old || !isOld(v.value)),
      [data],
    )

    const options = useMemo(
      () =>
        versions?.map?.(v => ({
          value: v.value,
          label: (
            <Pair>
              <Text>{v.value}</Text>
              {v.latest && (
                <Text color={'#f3ff73'}>
                  <FontAwesomeIcon icon={'l'} />
                </Text>
              )}
              {!isRelease(v.value) && (
                <Text color={'#8400ff'}>
                  <FontAwesomeIcon icon={'s'} />
                </Text>
              )}
              {isOld(v.value) && (
                <Text color={'#93f5ff'}>
                  <FontAwesomeIcon icon={'o'} />
                </Text>
              )}
            </Pair>
          ),
        })),
      [value, data, old, snapshots],
    )

    return (
      <Sqbox>
        <Select
          onChange={onChange}
          value={value}
          isLoading={(!data && !!value) || error}
          options={options}
          menuPlacement={'top'}
          placeholder={i18n.translate.minecraft.version}
        />
        <Pair gap={'small'}>
          <Pair gap={'small'}>
            <SmallCheckbox value={snapshots} onChange={setSnapshots} />
            <Text shade={'high'} size={7}>
              {i18n.translate.minecraft.snapshots}
            </Text>
          </Pair>
          <Pair gap={'small'}>
            <SmallCheckbox value={old} onChange={setOld} />
            <Text shade={'high'} size={7}>
              {i18n.translate.minecraft.old}
            </Text>
          </Pair>
        </Pair>
      </Sqbox>
    )
  })

const SmallCheckbox = styled(Checkbox)`
  scale: 0.7;
`

const Actions = styled.div`
  width: 160px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const InstallMenu: FC = Observer(() => {
  const [provider, setProvider] = useState<SupportedProviders | undefined>()
  const [version, setVersion] = useState<string | undefined>()

  const i18n = useI18N()
  const profiles = useModule(GameProfileService)

  const already = useMemo(
    () =>
      profiles.list.some(
        v => v.options.lastVersionId === `${provider}-${version}`,
      ),
    [provider, version, profiles.list],
  )

  const install = useCallback(() => {
    if (!version || !provider) return
    profiles.New(
      provider,
      `${provider.charAt(0).toUpperCase() + provider.slice(1)} ${version}`,
      `${provider}-${version}`,
      version,
    )
  }, [version, provider, profiles.list])

  return (
    <StyledMenu>
      <StyledInstallIcon />
      <Content>
        <Sqbox>
          <ProviderSelect value={provider} onChange={setProvider} />
          <Text shade={'high'} size={7}>
            {provider
              ? i18n.translate.minecraft.providers[provider]
              : i18n.translate.minecraft.select_provider}
          </Text>
        </Sqbox>
        <VersionSelect
          value={version}
          onChange={setVersion}
          provider={provider}
        />
        <Grow />
        <Actions>
          <Button
            primary
            icon={'download'}
            disabled={already || !version || !provider}
            onClick={install}
          >
            {i18n.translate.minecraft.install}
          </Button>
          <Text shade={'high'} size={7}>
            {already
              ? i18n.translate.minecraft.already_installed
              : i18n.translate.minecraft.please_wait_install}
          </Text>
        </Actions>
      </Content>
    </StyledMenu>
  )
})
