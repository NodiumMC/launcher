import styled from 'styled-components'

export interface AnsiProps {
  escape: number
}

export const Ansi = styled.span<AnsiProps>`
  white-space: pre !important;
  color: ${({ escape, theme }) => {
    switch (escape) {
      case 30:
        return theme.colors.console[0]
      case 31:
        return theme.colors.console[1]
      case 32:
        return theme.colors.console[2]
      case 33:
        return theme.colors.console[3]
      case 34:
        return theme.colors.console[4]
      case 35:
        return theme.colors.console[5]
      case 36:
        return theme.colors.console[6]
      case 37:
        return theme.colors.console[7]
      case 90:
        return theme.colors.console[8]
      case 91:
        return theme.colors.console[9]
      case 92:
        return theme.colors.console[10]
      case 93:
        return theme.colors.console[11]
      case 94:
        return theme.colors.console[12]
      case 95:
        return theme.colors.console[13]
      case 96:
        return theme.colors.console[14]
      case 97:
        return theme.colors.console[15]
      default:
        return theme.colors.console[15]
    }
  }};
  font-weight: ${({ escape }) => (escape === 1 ? 'bold' : 'normal')};
  font-style: ${({ escape }) => (escape === 3 ? 'italic' : 'normal')};
  text-decoration: ${({ escape }) => (escape === 4 ? 'underline' : 'none')};
  transition: all ${({ theme }) => theme.transition.time};
`
