import { FC } from 'react'
import { Screen } from 'components/utils/Screen'
import styled from 'styled-components'
import { JournalViewer } from 'screens/Main/JournalSubscreen/JournalViewer'
import { Observer, useModule } from 'mobmarch'
import { MinecraftJournal } from 'minecraft/MinecraftJournal.service'
import { toJS } from 'mobx'

const Page = styled(Screen)`
  display: flex;
  flex-direction: column;
`

export const JournalSubscreen: FC = Observer(() => {
  const journal = useModule(MinecraftJournal)

  return (
    <Page>
      <JournalViewer lines={toJS(journal.lines)} />
    </Page>
  )
})
