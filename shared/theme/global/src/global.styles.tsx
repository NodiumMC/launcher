import { Global } from '@emotion/react'
import { css } from '@emotion/react'

const inline = css`
  html,
  body {
    width: 100%;
    height: 100%;
    font-size: 14px;
  }

  img,
  button {
    user-select: none;
  }

  *::-webkit-scrollbar {
    display: none;
  }
`

export const GlobalStyles = () => <Global styles={inline} />
