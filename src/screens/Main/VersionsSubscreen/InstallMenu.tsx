import { FC, useState } from 'react'
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

const ProviderBox = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  ${Text} {
    padding: 0 6px;
  }
`

export const InstallMenu: FC = () => {
  const [provider, setProvider] = useState<SupportedProviders | undefined>()

  const i18n = useI18N()

  return (
    <StyledMenu>
      <StyledInstallIcon />
      <Content>
        <ProviderBox>
          <ProviderSelect value={provider} onChange={setProvider} />
          <Text shade={'high'} size={'s'}>
            {provider
              ? i18n.translate.minecraft.providers[provider]
              : 'Выберите поставщика клиента'}
          </Text>
        </ProviderBox>
      </Content>
    </StyledMenu>
  )
}
