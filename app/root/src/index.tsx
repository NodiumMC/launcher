import { FC } from 'react'
import { withProviders } from '@app/providers'
import { ApplicationRenderMode, WebsiteRenderMode } from '@shared/env'

const App: FC = () => {
  return (
    <div>
      <WebsiteRenderMode>
        Website renderer
      </WebsiteRenderMode>
      <ApplicationRenderMode>
        Application renderer
      </ApplicationRenderMode>
    </div>
  )
}

export default withProviders(App)
