import { type FC } from 'react'
import { MinecraftVersionListItem, $versions, syncWithLocalVersionsFx } from '@entities/minecraft-version'
import { useStore } from 'effector-react'
import { suspend } from 'suspend-react'

export const MinecraftVersions: FC = () => {
  const versions = useStore($versions)

  suspend(syncWithLocalVersionsFx, [])

  return (
    <div>
      {versions.map((version) => (
        <MinecraftVersionListItem {...version} />
      ))}
    </div>
  )
}
