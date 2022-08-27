import { FC, ReactElement, ReactNode, useMemo } from 'react'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import { HasChildren } from 'utils/UtilityProps'
import { Sidebar } from 'screens/Main/Sidebar'
import styled from 'styled-components'
import { Screen } from 'components/utils/Screen'
import { MainScreenPage } from './types'
import { useModule } from 'mobmarch'
import { MainScreenSubRouter } from 'screens/Main/MainScreenSubRouter/MainScreenSubRouter.service'
import { Observer } from 'mobmarch'
import { transition } from 'style'

interface SubrouteProps extends HasChildren<ReactNode> {
  icon: IconName
  to: MainScreenPage
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
  transform: translateY(calc(${({ position }) => position} * (100% + 6px)));
  ${transition('transform')}
`

export const SubRoute: FC<SubrouteProps> = () => <></>
export const MainScreenSidebarSubrouter: FC<
  Required<HasChildren<Array<ReactElement<SubrouteProps>>>>
> = Observer(({ children }) => {
  const items = useMemo(() => children.map(v => v.props), [])
  const subrouter = useModule(MainScreenSubRouter)
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
        {items.map(({ children, to }, i) => (
          <Page key={to} position={i - subrouter.location}>
            {children}
          </Page>
        ))}
      </Content>
    </Wrapper>
  )
})
