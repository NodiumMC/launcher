import styled from 'styled-components'

export interface AnsiProps {
  escape: number
}

export const Ansi = styled.span<AnsiProps>`
  white-space: pre !important;
  color: ${({ escape, theme }) => {
    switch (escape) {
      case 30:
        return theme.console[0]
      case 31:
        return theme.console[1]
      case 32:
        return theme.console[2]
      case 33:
        return theme.console[3]
      case 34:
        return theme.console[4]
      case 35:
        return theme.console[5]
      case 36:
        return theme.console[6]
      case 37:
        return theme.console[7]
      case 90:
        return theme.console[8]
      case 91:
        return theme.console[9]
      case 92:
        return theme.console[10]
      case 93:
        return theme.console[11]
      case 94:
        return theme.console[12]
      case 95:
        return theme.console[13]
      case 96:
        return theme.console[14]
      case 97:
        return theme.console[15]
      default:
        return theme.console[15]
    }
  }};
  font-weight: ${({ escape }) => (escape === 1 ? 'bold' : 'normal')};
  font-style: ${({ escape }) => (escape === 3 ? 'italic' : 'normal')};
  text-decoration: ${({ escape }) => (escape === 4 ? 'underline' : 'none')};
  transition: all ${({ theme }) => theme.transition.time};
`
