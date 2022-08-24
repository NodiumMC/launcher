import styled from 'styled-components'

export interface AnsiProps {
  escape: number
}

export const Ansi = styled.span<AnsiProps>`
  white-space: pre !important;
  color: ${({ escape, theme }) => {
    switch (escape) {
      case 30:
        return theme.palette.console[0]
      case 31:
        return theme.palette.console[1]
      case 32:
        return theme.palette.console[2]
      case 33:
        return theme.palette.console[3]
      case 34:
        return theme.palette.console[4]
      case 35:
        return theme.palette.console[5]
      case 36:
        return theme.palette.console[6]
      case 37:
        return theme.palette.console[7]
      case 90:
        return theme.palette.console[8]
      case 91:
        return theme.palette.console[9]
      case 92:
        return theme.palette.console[10]
      case 93:
        return theme.palette.console[11]
      case 94:
        return theme.palette.console[12]
      case 95:
        return theme.palette.console[13]
      case 96:
        return theme.palette.console[14]
      case 97:
        return theme.palette.console[15]
      default:
        return theme.palette.console[15]
    }
  }};
  font-weight: ${({ escape }) => (escape === 1 ? 'bold' : 'normal')};
  font-style: ${({ escape }) => (escape === 3 ? 'italic' : 'normal')};
  text-decoration: ${({ escape }) => (escape === 4 ? 'underline' : 'none')};
  transition: all ${({ theme }) => theme.transition.time};
`
