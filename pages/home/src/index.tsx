import { FC } from 'react'
import { Box } from '@ui/layout'
import { useTheme } from 'styled'
import { HomeLayout } from './home-layout.component'

const Placeholder: FC = props => {
  const theme = useTheme()

  return <Box backgroundColor={theme.palette.gray._50} {...props} />
}

export const HomePage: FC = () => (
  <HomeLayout User={Placeholder} Skin={Placeholder} Main={Placeholder} Play={Placeholder} Options={Placeholder} />
)
