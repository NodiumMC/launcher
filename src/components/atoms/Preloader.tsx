import { FC } from 'react'
import styled from 'styled-components'
import preloader from 'assets/img/preloader.svg'

const PreloaderImg = styled.svg`
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
  width: 1rem;
  height: 1rem;
  position: relative;
`

export const Preloader: FC<ExtraProps.Styled> = ({ className }) => {
  return (
    <Wrapper className={className}>
      <PreloaderImg
        xmlns="http://www.w3.org/2000/svg"
        width="256px"
        height="256px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          r="46"
          strokeDasharray="216.76989309769573 74.25663103256524"
        />
      </PreloaderImg>
    </Wrapper>
  )
}
