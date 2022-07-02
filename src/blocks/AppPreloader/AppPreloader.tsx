import { FC } from 'react'
import styled from 'styled-components'
import { Empty } from '../../components/utils/Empty'
import { Preloader } from '../../components/ui/Preloader'
import { usePreloader } from '../../hooks/useService'
import { Observer } from '../../store/ObserverComponent'
import { animated, useTransition } from 'react-spring'

const AppPreloaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.back};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 100px;
  transition: background-color, ${({ theme }) => theme.transition.time};
`

const Title = styled.div`
  font-size: 100px;
  font-family: ${({ theme }) => theme.fonts.title};
  font-weight: 600;
  font-style: italic;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  user-select: none;
  position: relative;
  z-index: 1;
`

const SubTitle = styled(Title)`
  font-size: 22px;
  font-weight: normal;
  font-style: normal;
`

const Titles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AbsolutePreloader = styled(Preloader)`
  position: absolute;
  top: 50%;
  transform: translate(-40px, -50%);
`

const Stage = styled.div`
  position: relative;
  color: ${({ theme }) => theme.colors.mid};
`

export const AppPreloader: FC = Observer(() => {
  const { inProcess, currentTaskName } = usePreloader()
  const transition = useTransition(inProcess, {
    from: { opacity: -1, scale: 3 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: -1, scale: 3 },
    config: {
      duration: 100
    }
  })

  return transition((style, item) => (item && <AppPreloaderWrapper as={animated.div} style={style}>
    <Empty />
    <Titles>
      <Title>Minecraft</Title>
      <SubTitle>Nodium Launcher</SubTitle>
    </Titles>
    <Stage><AbsolutePreloader />{currentTaskName}</Stage>
  </AppPreloaderWrapper>))
})
