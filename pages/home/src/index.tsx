import { FC } from 'react'
import { Row } from '@ui/layout'
import { Button } from '@ui/button'
import { CloseWindowIcon, MaximizeWindowIcon } from '@ui/icons'

export const HomePage: FC = () => (
  <Row style={{ gap: '6px' }} p={6}>
    <Button>
      <MaximizeWindowIcon />
      <span>Defaultich</span>
    </Button>
    <Button variant={'secondary'}>
      <CloseWindowIcon />
      <span>Close</span>
    </Button>
  </Row>
)
