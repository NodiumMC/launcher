import { Global } from '@lmpx/styled'
import { FC } from 'react'
import { mabryFontFaces } from './mabry'

console.log(mabryFontFaces.map(f => f()))

export const FontStyles: FC = () => <Global styles={[...mabryFontFaces]} />
