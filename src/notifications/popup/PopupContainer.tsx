import { FC } from 'react'
import { PopupService } from 'notifications'
import { PopupWrapper } from '.'
import { useMod } from 'hooks/useMod'
import { observer } from 'mobx-react'
import { AnimatePresence } from 'framer-motion'

export const PopupContainer: FC = observer(() => {
  const popup = useMod(PopupService)
  return (
    <AnimatePresence>
      {Object.entries(popup.entries).map(([id, [Pup, props]]) => (
        <PopupWrapper
          key={id}
          initial={{ y: -1000, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 1000, opacity: 0 }}
        >
          <Pup {...props} />
        </PopupWrapper>
      ))}
    </AnimatePresence>
  )
})
