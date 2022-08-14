import { FC } from 'react'
import styled from 'styled-components'
import preloader from 'assets/img/preloader.gif'
import { Styled } from 'utils/UtilityProps'

const PreloaderImg = styled.img`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: absolute;
  top: 0;
  left: 0;
  filter: brightness(35%);
`

const Blured = styled(PreloaderImg)`
  filter: blur(10px);
  opacity: 0.5;
`

const Wrapper = styled.div`
  width: calc(1270px / 30);
  height: calc(666px / 30);
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
