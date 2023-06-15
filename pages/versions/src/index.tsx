import { type FC, Suspense } from 'react'
import { MinecraftVersions } from '@widgets/minecraft-versions'

export const VersionsPage: FC = () => (
  <div>
    <Suspense>
      <MinecraftVersions />
    </Suspense>
  </div>
)
