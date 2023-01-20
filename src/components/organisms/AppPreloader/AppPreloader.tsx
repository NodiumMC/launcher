import { FC } from 'react'
import styled from 'styled-components'
import { Empty } from 'components/utils/Empty'
import { Preloader } from 'components/atoms/Preloader'
import { font } from 'style'
import { PreloaderModule } from 'preload'
import { AnimatePresence, motion } from 'framer-motion'
import { useMod } from 'hooks/useMod'
import { observer } from 'mobx-react'

const AppPreloaderWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.master.back};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 100px;
  transition: all ${({ theme }) => theme.transition.time};
  z-index: 50;
`

const Title = styled.div`
  font-size: 100px;
  ${({ theme }) => font(theme.fonts.title)}
  font-weight: 600;
  font-style: italic;
  background: ${({ theme }) => theme.accent.gradient()};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  user-select: none;
  position: relative;
  z-index: 1;
`

const SubTitle = styled(Title)`
  font-size: 22px;
  font-weight: 300;
  font-style: normal;
`

const Titles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AbsolutePreloader = styled(Preloader)`
  font-size: 1rem;
  position: absolute;
  top: 50%;
  transform: translate(-24px, -50%);
  mix-blend-mode: difference;
  color: ${({ theme }) => theme.palette.gray};
`

const Stage = styled.div`
  position: relative;
  color: ${({ theme }) => theme.master.shade(0.5)};
`

const StageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  position: relative;
`

// const StagedProgressBar = styled(ProgressBar)`
//   position: absolute;
//   top: 0;
//   left: 50%;
//   transform: translate(-50%, 40px);
// `

export const AppPreloader: FC = observer(() => {
  const { progress, taskName } = useMod(PreloaderModule)

  return (
    <AnimatePresence>
      {progress && (
        <AppPreloaderWrapper
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: -1, scale: 3 }}
          transition={{ duration: 0.1 }}
        >
          <Empty />
          <Titles>
            <Title>Minecraft</Title>
            <SubTitle>Nodium Launcher</SubTitle>
          </Titles>
          <StageWrapper>
            <Stage>
              <AbsolutePreloader />
              {taskName}
            </Stage>
          </StageWrapper>
        </AppPreloaderWrapper>
      )}
    </AnimatePresence>
  )
})
