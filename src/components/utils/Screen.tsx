import styled from 'styled-components'
import { FC } from 'react'
import { Preloader } from 'components/micro/Preloader'

export const Screen = styled.div`
  width: 100%;
  height: 100%;
`

const StyledLoadingScreen = styled(Screen)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoadingScreen: FC = () => (
  <StyledLoadingScreen>
    <Preloader />
  </StyledLoadingScreen>
)
