import { styled, useTheme } from '@lmpx/styled'
import { FC } from 'react'
import { Bordered } from '../bordered'

const LogoElement = styled.svg()

LogoElement.defaultProps = {
  viewBox: '0 0 64 64',
  xmlns: 'http://www.w3.org/2000/svg',
  height: '100%',
  width: '100%',
}

export const Logo: FC = (props) => {
  const theme = useTheme()

  return (
    <Bordered sides={['bottom', 'right']} gridArea='logo' {...props}>
      <LogoElement {...props}>
        <path
          d='m14.4 42.2v-20.3l17.6-10.2 17.6 10.2v20.3l-17.6 10.2-17.6-10.2 35.2-20.3v20.3l-35.2-20.3 17.6-10.2v40.6z'
          fill='none'
          stroke={theme.palette.gray100}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
      </LogoElement>
    </Bordered>
  )
}
