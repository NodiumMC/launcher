import { FC } from 'react'
import { PopupService } from 'notifications'
import { Popup } from '.'
import { PopupWrapper } from '.'
import { useMod } from 'hooks/useMod'
import { observer } from 'mobx-react'

export const PopupContainer: FC = observer(() => {
  const popup = useMod(PopupService)
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
