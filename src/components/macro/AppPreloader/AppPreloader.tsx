import { FC } from 'react'
import styled from 'styled-components'
import { Empty } from '../../utils/Empty'
import { Preloader } from '../../micro/Preloader'
import { animated, useTransition } from 'react-spring'
import { ProgressBar } from '../../micro/ProgressBar'
import { font } from 'components/utils/Font'
import { Observer, useModule } from 'mobmarch'
import { Preloader as PreloaderService } from 'preload'

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
  z-index: 50;
`

const Title = styled.div`
  font-size: 100px;
  ${({ theme }) => font(theme.fonts.title)}
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

const StageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  position: relative;
`

const StagedProgressBar = styled(ProgressBar)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 40px);
`

export const AppPreloader: FC = Observer(() => {
  const { inProcess, pre, progressActive, progress, currentTaskName } =
    useModule(PreloaderService)
  const transition = useTransition(inProcess, {
    from: { opacity: 1, scale: 3 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: -1, scale: 3 },
    config: {
      duration: 100,
    },
  })
  const progressHide = useTransition(progressActive, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
  })

  return transition(
    (style, item) =>
      item && (
        <AppPreloaderWrapper as={animated.div} style={style}>
          <Empty />
          <Titles>
            <Title>Minecraft</Title>
            <SubTitle>Nodium Launcher</SubTitle>
          </Titles>
          <StageWrapper>
            <Stage>
              <AbsolutePreloader />
              {currentTaskName}
            </Stage>
            {progressHide(
              (style, item) =>
                item && (
                  <StagedProgressBar value={progress} pre={pre} total={100} />
                ),
            )}
          </StageWrapper>
        </AppPreloaderWrapper>
      ),
  )
})
