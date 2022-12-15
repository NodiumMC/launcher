import { FC, ReactElement, ReactNode, useMemo } from 'react'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import { Sidebar } from 'screens/Main/Sidebar'
import styled from 'styled-components'
import { Screen } from 'components/utils/Screen'
import { MainScreenPage } from './types'
import { MainScreenSubRouter } from 'screens/Main/MainScreenSubRouter/MainScreenSubRouter.service'
import { transition } from 'style'
import { useDebugMode } from 'hooks'
import { useMod } from 'hooks/useMod'
import { observer } from 'mobx-react'

interface SubrouteProps extends ExtraProps.HasChildren<ReactNode> {
  icon: IconName
  to: MainScreenPage
  debug?: boolean
}

const Wrapper = styled(Screen)`
  display: flex;
  gap: 6px;
`

const FixedSidebar = styled(Sidebar)`
  flex-shrink: 0;
`

const Content = styled.div`
  flex-grow: 1;
  position: relative;
`

const Page = styled.div<{ position: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(calc(${({ position }) => position} * (110% + 6px)));
  ${transition('transform')}
`

export const SubRoute: FC<SubrouteProps> = () => <></>
export const MainScreenSidebarSubrouter: FC<Required<ExtraProps.HasChildren<Array<ReactElement<SubrouteProps>>>>> =
  observer(({ children }) => {
    const debug = useDebugMode()
    const items = useMemo(() => children.filter(v => !v.props.debug || debug).map(v => v.props), [debug])
    const subrouter = useMod(MainScreenSubRouter)
    return (
      <Wrapper>
        <FixedSidebar
          items={items.map((v, i) => ({
            ...v,
            id: i,
            onChange: id => subrouter.locate(id),
          }))}
          selected={subrouter.location}
        />
        <Content>
          {items.map(({ children, to, debug }, i) => (
            <Page key={to} position={i - subrouter.location}>
              {debug ? subrouter.location === to && children : children}
            </Page>
          ))}
        </Content>
      </Wrapper>
    )
  })
