import { FC } from 'react'
import { Screen } from 'components/utils/Screen'
import styled from 'styled-components'
import { JournalViewer } from 'screens/Main/JournalSubscreen/JournalViewer'

const Page = styled(Screen)`
  display: flex;
  flex-direction: column;
`

export const JournalSubscreen: FC = () => {
  return (
    <Page>
      <JournalViewer lines={[]} />
    </Page>
  )
}
