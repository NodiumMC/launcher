import { FC } from 'react'
import { useTheme } from 'styled'
import { Column, Row } from '@ui/layout'

interface HomeLayoutProps<T = FC<any>> {
  User: T
  Skin: T
  Main: T
  Play: T
  Options: T
}

export const HomeLayout: FC<HomeLayoutProps> = ({ Play, Main, User, Options, Skin }) => {
  const theme = useTheme()

  return (
    <Row p={theme.space.md} gap={theme.space.md} height='100%' width='100%'>
      <Column gap={theme.space.md} width='250px'>
        <User />
        <Skin flexGrow='1' />
      </Column>
      <Column flexGrow='1' gap={theme.space.md}>
        <Main flexGrow='1' />
        <Row gap={theme.space.md}>
          <Play flexGrow='1' />
          <Options />
        </Row>
      </Column>
    </Row>
  )
}
