import { FC } from 'react'
import { Screen } from 'components/utils/Screen'
import styled from 'styled-components'
import { JournalViewer } from 'screens/Main/JournalSubscreen/JournalViewer'
import { MinecraftJournal } from 'minecraft/MinecraftJournal.service'
import { toJS } from 'mobx'
import { useMod } from 'hooks/useMod'
import { observer } from 'mobx-react'

const Page = styled(Screen)`
  display: flex;
  flex-direction: column;
`

export const JournalSubscreen: FC = observer(() => {
  const journal = useMod(MinecraftJournal)

  return (
    <Page>
      <JournalViewer lines={toJS(journal.lines)} />
    </Page>
  )
})
