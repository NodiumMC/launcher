import { FC } from 'react'
import { Observer, useModule } from 'mobmarch'
import { PopupService } from 'notifications'
import { Popup } from '.'
import { PopupWrapper } from '.'

export const PopupContainer: FC = Observer(() => {
  const popup = useModule(PopupService)
  return (
    <>
      {Object.entries(popup.entries).map(([id, pup]) => (
        <PopupWrapper close={pup.close} key={id}>
          <Popup {...pup} />
        </PopupWrapper>
      ))}
    </>
  )
})
