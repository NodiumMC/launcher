import styled, { useTheme } from 'styled-components'
import { ReactNode, useMemo, useState } from 'react'
import { PublicVersion } from 'core/providers/types'
import { SquareGroupSwitcher } from 'components/molecules/SquareGroupSwitcher'
import { SupportedProviders } from 'core/providers'
import { Text } from 'components/atoms/Text'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { inputValue } from 'utils'
import { mix } from 'polished'
import { Badge } from 'components/atoms/Badge'
import { Pair } from 'components/utils/Pair'
import { useDebounce } from 'use-debounce'
import { observer } from 'mobx-react'
import { useI18N } from 'hooks'
import { Checkbox } from 'components/atoms/Checkbox'
import { Scrollbar } from 'components/utils/Scrollbar'

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

const VersionList = styled(Scrollbar)`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.master.shade()};
  border-radius: ${({ theme }) => theme.radius()};
  flex-grow: 1;
  height: calc(38px * 5);
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

const FilterIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  outline: none;
`

const FilterControls = styled.div`
  display: none;
  gap: ${({ theme }) => theme.space(5)};
`

const FilterContainer = styled.div`
  position: absolute;
  padding: ${({ theme }) => theme.space(2)};
  gap: ${({ theme }) => theme.space(2)};
  height: 100%;
  right: 0;
  align-items: center;
  top: 50%;
  translate: 0 -50%;
  display: flex;
  flex-direction: row;
  font-size: 20px;
  &:focus-within ${FilterControls} {
    display: flex;
  }
`

const CheckboxLabel = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space(2)};
`

export const VersionPicker = observer(
  <T extends ReactNode>({
    versions,
    providers,
    provider,
    onProviderChange,
    version,
    onVersionChange,
    ...props
  }: LargePickerProps<T>) => {
    const theme = useTheme()
    const i18n = useI18N(t => t.minecraft.versions)
    const [search, setSearch] = useState('')
    const [searchedb] = useDebounce(search, 1000)

    const [snapshotCheckbox, setSnapshotCheckbox] = useState(false)
    const filtered = useMemo(() => versions.filter(v => v.providers.includes(provider)), [versions, provider])
    const searchedAndFiltered = useMemo(() => {
      const searchedandFiltered = filtered.filter(v => (snapshotCheckbox ? true : !v.isSnapshot))
      return searchedandFiltered.filter(v => (search ? v.name.includes(search) : true))
    }, [searchedb, filtered, snapshotCheckbox])

    return (
      <Container {...props}>
        <SquareGroupSwitcher
          options={providers}
          value={provider}
          onChange={onProviderChange}
          vertical
          disoptions={[]}
        />
        <VersionsContainer>
          <InputWrapper>
            <FilterContainer tabIndex={0}>
              <FilterControls tabIndex={0}>
                <CheckboxLabel>
                  <Checkbox onChange={setSnapshotCheckbox} checked={snapshotCheckbox} />
                  <Text>{i18n.snapshots}</Text>
                </CheckboxLabel>
              </FilterControls>
              <FilterIcon tabIndex={0} icon={'filter'} color={theme.master.shade(0.3)} />
            </FilterContainer>
            <SearchInput value={search} onChange={inputValue(setSearch)} />
            <Placeholder>
              <FontAwesomeIcon icon={'magnifying-glass'} />
            </Placeholder>
          </InputWrapper>
          {filtered.length > 0 ? (
            <VersionList>
              {searchedAndFiltered.length > 0 ? (
                searchedAndFiltered.map(v => (
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
                      {v.isRelease && <Badge color={theme.palette.green}>{i18n.release_type}</Badge>}
                      {v.isSnapshot && <Badge color={theme.palette.magenta}>{i18n.snapshot_type}</Badge>}
                      {v.latest && <Badge color={theme.palette.cyan}>{i18n.latest_type}</Badge>}
                    </Pair>
                  </Version>
                ))
              ) : (
                <Fetching>
                  <Text shade={'high'}>{i18n.not_found}</Text>
                </Fetching>
              )}
            </VersionList>
          ) : (
            <Fetching>
              <Text shade={'high'}>{i18n.fetching_versions}</Text>
            </Fetching>
          )}
        </VersionsContainer>
      </Container>
    )
  },
)
