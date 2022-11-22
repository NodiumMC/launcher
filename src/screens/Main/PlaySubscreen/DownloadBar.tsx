import { FC } from 'react'
import styled from 'styled-components'
import { transition } from 'style'

export interface DownloadBarProps {
  prepare?: number
  value?: number
}

const StyledBar = styled.div<DownloadBarProps>`
  width: 100%;
  background-color: ${({ theme }) => theme.master.shade()};
  overflow: hidden;
  position: relative;
  transform-origin: ${({ prepare = 0, value = 0 }) => (value > 50 ? 'right' : 'left')};
  transform: scaleX(${({ prepare = 0, value = 0 }) => ((value > 0 || prepare > 0) && value < 100 ? 1 : 0)});
  height: 2px;
  ${transition('transform')};
`

const Inner = styled.div.attrs<ExtraProps.Value<number>>(({ value }) => ({
  style: {
    width: `${value}%`,
  },
}))<ExtraProps.Value<number> & { p?: boolean }>`
  position: absolute;
  inset: 0;
  height: 100%;
  background-color: ${({ theme, p }) => (p ? theme.accent.primary : theme.master.shade(0.3))};
  border-radius: inherit;
  ${transition('width')};
  mask: ${({ p }) =>
    !p &&
    // eslint-disable-next-line prettier/prettier
    'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' viewBox=\'0 0 1.058 1.058\' version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000\' fill-rule=\'evenodd\' stroke-width=\'.406\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M0 0h.529v.529H0zM.529.529h.529v.529H.529z\'/%3E%3C/g%3E%3C/svg%3E")'};
`

export const DownloadBar: FC<DownloadBarProps & ExtraProps.Styled> = ({ prepare, value, ...props }) => {
  return (
    <StyledBar prepare={prepare} value={value} {...props}>
      <Inner value={prepare ?? 0} />
      <Inner value={value ?? 0} p />
    </StyledBar>
  )
}
