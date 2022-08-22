import { FC } from 'react'
import styled from 'styled-components'
import preloader from 'assets/img/preloader.svg'
import { Styled } from 'utils/UtilityProps'

const PreloaderImg = styled.img`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: absolute;
  top: 0;
  left: 0;
  animation: spin 0.5s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Blured = styled(PreloaderImg)`
  filter: blur(10px);
  opacity: 0.5;
`

const Wrapper = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
`

export const Preloader: FC<Styled> = ({ className }) => {
  return (
    <Wrapper className={className}>
      <PreloaderImg src={preloader} />
      <Blured src={preloader} />
    </Wrapper>
  )
}
