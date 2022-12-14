import { FC, useEffect, useState } from 'react'
import { Screen } from 'components/utils/Screen'
import styled from 'styled-components'
import { NotImplemented } from 'components/micro/NotImplemented'
import { DownloadBar } from 'screens/Main/PlaySubscreen/DownloadBar'
import { Button } from 'components/micro/Button'
import { Pair } from 'components/utils/Pair'
import { SimpleHandler } from 'minecraft/SimpleHandler'
import { Select } from 'components/micro/Select'
import { VersionUnion } from 'core/providers/types'
import { Input } from 'components/micro/Input'
import { inputValue } from 'utils'
import { SquareGroupSwitcher } from 'components/micro/SquareGroupSwitcher'
import { ProviderIcon, ProviderList } from 'core/providers'
import { main } from 'storage'
import { InstanceStore } from 'minecraft/InstanceStore.service'
import { useMod } from 'hooks/useMod'
import { observer } from 'mobx-react'

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

const PlayZone: FC = observer(() => {
  const handler = useMod(SimpleHandler)
  const [versions, setVersions] = useState<VersionUnion[]>([])
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
        <Input
          placeholder={'Никнейм'}
          onChange={inputValue<string>(nick => (main.local_nickname = nick))}
          value={main.local_nickname}
          disabled={loading}
        />
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
            handler.go(main.local_nickname).subscribe(value => {
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

const Instances: FC = observer(() => {
  const istore = useMod(InstanceStore)
  return <div>{istore.instances.map(v => v.name)}</div>
})

export const PlaySubscreen: FC = observer(() => {
  return (
    <Page>
      <Instances />
    </Page>
  )
})
