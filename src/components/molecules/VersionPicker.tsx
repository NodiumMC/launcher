import styled, { useTheme } from 'styled-components'
import { ReactNode, useMemo, useState } from 'react'
import { PublicVersion } from 'core/providers/types'
import { SquareGroupSwitcher } from 'components/molecules/SquareGroupSwitcher'
import { SupportedProviders } from 'core/providers'
import { Text } from 'components/atoms/Text'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { inputValue } from 'utils'
import { mix } from 'polished'
import { ColoredTag } from 'components/atoms/ColoredTag'
import { Pair } from 'components/utils/Pair'
import { useDebounce } from 'use-debounce'

export interface LargePickerProps<T> extends ExtraProps.Styled {
  providers: Array<{
    label: T
    id: SupportedProviders
  }>
  versions: PublicVersion[]
  provider: SupportedProviders
  onProviderChange: (provider: SupportedProviders) => void
  version: string
  onVersionChange: (version: string) => void
  invalid?: boolean
}

const Container = styled.div<{ invalid?: boolean }>`
  display: flex;
  border-radius: ${({ theme }) => theme.radius()};
  gap: ${({ theme }) => theme.space()};
  border: 2px solid ${({ theme, invalid }) => (invalid ? theme.palette.red : 'transparent')};
`

const VersionsContainer = styled.div`
  border-radius: ${({ theme }) => theme.radius()};
  background-color: ${({ theme }) => theme.master.shade(0.03)};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const VersionList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.master.shade()};
  border-radius: ${({ theme }) => theme.radius()};
  flex-grow: 1;
  height: 0;
  overflow-y: scroll;
`

interface VersionProps {
  selected?: boolean
}

const Version = styled.div<VersionProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
  padding: 3px ${({ theme }) => theme.space()};
  border-radius: ${({ theme }) => theme.radius()};
  background-color: ${({ selected, theme }) =>
    selected ? mix(0.2, theme.accent.primary, theme.master.back) : 'transparent'};
  border-left: 2px solid ${({ selected, theme }) => (selected ? theme.accent.primary : 'transparent')};
  color: ${({ selected, theme }) => (selected ? theme.accent.primary : 'inherit')};
  cursor: pointer;
`

const VersionName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const SearchInput = styled.input`
  width: 100%;
  height: 38px;
  padding: 0 ${({ theme }) => theme.space()} 0 ${({ theme }) => theme.space(8)};
`

const InputWrapper = styled.div`
  position: relative;
`

const Placeholder = styled.div`
  position: absolute;
  padding: ${({ theme }) => theme.space(2)};
  top: 50%;
  translate: 0 -50%;
  color: ${({ theme }) => theme.master.shade(0.3)};
  &:after {
    position: absolute;
    right: 0;
    top: 50%;
    translate: 0 -50%;
    height: 50%;
    width: 1px;
    background-color: ${({ theme }) => theme.master.shade(0.1)};
    content: '';
  }
`

const Fetching = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const VersionPicker = <T extends ReactNode>({
  versions,
  providers,
  provider,
  onProviderChange,
  version,
  onVersionChange,
  ...props
}: LargePickerProps<T>) => {
  const theme = useTheme()
  const [search, setSearch] = useState('')
  const [searchedb] = useDebounce(search, 1000)

  const filtered = useMemo(() => versions.filter(v => v.providers.includes(provider)), [versions, provider])
  const searched = useMemo(() => filtered.filter(v => (search ? v.name.includes(search) : true)), [searchedb, filtered])

  return (
    <Container {...props}>
      <SquareGroupSwitcher options={providers} value={provider} onChange={onProviderChange} vertical />
      <VersionsContainer>
        <InputWrapper>
          <SearchInput value={search} onChange={inputValue(setSearch)} />
          <Placeholder>
            <FontAwesomeIcon icon={'magnifying-glass'} />
          </Placeholder>
        </InputWrapper>
        {filtered.length > 0 ? (
          <VersionList>
            {searched.length > 0 ? (
              searched.map(v => (
                <Version
                  key={`${provider}-${v.id}`}
                  selected={v.id === version}
                  onClick={() => onVersionChange?.(v.id)}
                >
                  <VersionName>
                    <Text weight={'bold'}>{v.name}</Text>
                    <Text size={8} shade={'high'}>
                      {v.id}
                    </Text>
                  </VersionName>
                  <Pair>
                    {v.isRelease && <ColoredTag color={theme.palette.green}>Release</ColoredTag>}
                    {v.isSnapshot && <ColoredTag color={theme.palette.magenta}>Snapshot</ColoredTag>}
                    {v.isOld && <ColoredTag color={theme.palette.red}>Old</ColoredTag>}
                    {v.latest && <ColoredTag color={theme.palette.cyan}>Latest</ColoredTag>}
                  </Pair>
                </Version>
              ))
            ) : (
              <Fetching>
                <Text shade={'high'}>Ничего не найдено</Text>
              </Fetching>
            )}
          </VersionList>
        ) : (
          <Fetching>
            <Text shade={'high'}>Подождите немного, возможно скоро всё будет</Text>
          </Fetching>
        )}
      </VersionsContainer>
    </Container>
  )
}
