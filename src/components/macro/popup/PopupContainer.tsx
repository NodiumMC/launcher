import { FC } from 'react'
import { Observer, useModule } from 'mobmarch'
import { PopupService } from 'notifications'
import { Popup } from 'components/macro/popup/Popup'
import { PopupWrapper } from 'components/macro/popup/PopupWrapper'

export const PopupContainer: FC = Observer(() => {
  const popup = useModule(PopupService)
  return (
    <>
      {Object.entries(popup.popups).map(([id, pup]) => (
        <PopupWrapper close={pup.close} key={id}>
          <Popup {...pup} />
        </PopupWrapper>
      ))}
    </>
  )
})
