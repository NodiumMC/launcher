import { FC } from 'react'
import { RecoilRoot } from 'recoil'

export const withRecoil = (component: FC) => () => <RecoilRoot>{component({})}</RecoilRoot>
