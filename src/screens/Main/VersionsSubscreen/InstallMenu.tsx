import { FC, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Text } from 'components/micro/Text'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DataInput, Styled } from 'utils/UtilityProps'
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
import { Observer } from 'mobmarch'

const InstallIcon: FC<Styled> = props => (
  <Text shade={'high'} size={'l'} {...props}>
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
`

const StyledMenu = styled.div`
  position: relative;
  height: 40px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.palette.back.shades[0]};
  border-radius: ${({ theme }) => theme.shape.radius[0]};
  background-color: ${({ theme }) => theme.palette.back.shades[0]};

  ${transition('height')}
  &:hover {
    ${StyledInstallIcon} {
      opacity: 0;
    }

    ${Content} {
      opacity: 1;
      translate: 0 0;
      scale: 1 1;
    }

    height: 100px;
    background-color: ${({ theme }) => theme.palette.back.default};

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

const ProviderSelect: FC<DataInput<SupportedProviders>> = ({
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

const VersionSelect: FC<DataInput<string> & { provider?: SupportedProviders }> =
  Observer(({ provider, onChange, value }) => {
    const i18n = useI18N()

    const [snapshots, setSnapshots] = useState(false)
    const [old, setOld] = useState(false)
    const { data, error } = useSWR<Version[]>(
      `/${provider}`,
      fetcher('https://nadmelas.nodium.ru/list'),
    )

    const options = useMemo(
      () =>
        data
          ?.filter?.(v => snapshots || isRelease(v.value))
          ?.filter?.(v => old || !isOld(v.value))
          .map?.(v => ({
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
            <Text shade={'high'} size={'s'}>
              {i18n.translate.minecraft.snapshots}
            </Text>
          </Pair>
          <Pair gap={'small'}>
            <SmallCheckbox value={old} onChange={setOld} />
            <Text shade={'high'} size={'s'}>
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

export const InstallMenu: FC = () => {
  const [provider, setProvider] = useState<SupportedProviders | undefined>()
  const [version, setVersion] = useState<string | undefined>()

  const i18n = useI18N()

  return (
    <StyledMenu>
      <StyledInstallIcon />
      <Content>
        <Sqbox>
          <ProviderSelect value={provider} onChange={setProvider} />
          <Text shade={'high'} size={'s'}>
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
      </Content>
    </StyledMenu>
  )
}
