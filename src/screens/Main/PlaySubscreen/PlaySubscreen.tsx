import { FC, useEffect, useState } from 'react'
import { Screen } from 'components/utils/Screen'
import { Defer, Observer, useModule } from 'mobmarch'
import styled from 'styled-components'
import { NotImplemented } from 'components/micro/NotImplemented'
import { DownloadBar } from 'screens/Main/PlaySubscreen/DownloadBar'
import { Button } from 'components/micro/Button'
import { Pair } from 'components/utils/Pair'
import { ProviderSelect } from 'screens/Main/PlaySubscreen/ProviderSelect'
import { SimpleHandler } from 'minecraft/SimpleHandler'
import { Select } from 'components/micro/Select'
import { VersionUnion } from 'core/providers/types'
import { Input } from 'components/micro/Input'
import { useCachedState } from 'hooks/useCachedState'
import { inputValue } from 'utils'
import { SquareGroupSwitcher } from 'components/micro/SquareGroupSwitcher'
import { ProviderIcon, ProviderList } from 'core/providers'

const Page = styled(Screen)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space()};
  height: 100%;
  position: relative;
`

const Nimpl = styled(NotImplemented)`
  flex-grow: 1;
`

const PlayBtn = styled(Button)`
  &[disabled] {
    filter: saturate(0);
  }
`

const PlayZone: FC = Observer(() => {
  const handler = useModule(SimpleHandler)
  const [versions, setVersions] = useState<VersionUnion[]>([])
  const [nickname, setNickname] = useCachedState('devchaotic', '00_nickname', 'Player')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    handler.versions().then(v => {
      setVersions(v.filter(v => v.isRelease && !v.isOld))
    })
  }, [])

  return (
    <>
      <Pair>
        <Input placeholder={'Никнейм'} onChange={inputValue(setNickname)} value={nickname} disabled={loading} />
        <Select<string>
          disabled={loading}
          width={'200px'}
          menuPlacement={'top'}
          options={versions.map(v => {
            return {
              value: v.id,
              label: v.name,
            }
          })}
          onChange={v => (handler.version = versions.find(l => l.id === v) ?? null)}
          value={handler?.version?.id ?? undefined}
        />
        <SquareGroupSwitcher
          disabled={loading}
          options={[
            { id: 'vanilla', label: ProviderIcon.vanilla },
            { id: 'fabric', label: ProviderIcon.fabric },
            { id: 'forge', label: ProviderIcon.forge },
            { id: 'quilt', label: ProviderIcon.quilt },
          ]}
          value={handler.provider}
          disoptions={ProviderList.filter(v => !handler.version?.providers.includes(v))}
          onChange={value => (handler.provider = value)}
        />
        <PlayBtn
          primary
          fetching={loading}
          icon={'bolt'}
          disabled={!handler.version}
          onClick={() => {
            if (loading) return
            setLoading(true)
            handler.go(nickname).subscribe(value => {
              if (value.done) setLoading(false)
              if (value.progress) setProgress(value.progress)
            })
          }}
        >
          Играть
        </PlayBtn>
      </Pair>
      <DownloadBar prepare={0} value={loading ? progress : 0} style={{ position: 'absolute', bottom: '-6px' }} />
    </>
  )
})

export const PlaySubscreen: FC = Observer(() => {
  return (
    <Page>
      <Nimpl />
      <Defer depend={SimpleHandler}>
        <PlayZone />
      </Defer>
    </Page>
  )
})
