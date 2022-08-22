import { FC } from 'react'
import { Observer, useModule } from 'mobmarch'
import { PopupService } from 'notifications'

export const PopupContainer: FC = Observer(() => {
  const popup = useModule(PopupService)
  return <>{Object.values(popup.popups)}</>
})
