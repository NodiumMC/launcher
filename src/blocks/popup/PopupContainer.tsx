import { FC, useMemo } from 'react'
import { Observer } from '../../store/ObserverComponent'
import { usePopup } from '../../hooks/useService'
import { useTransition } from 'react-spring'

export const PopupContainer: FC = Observer(() => {
  const { popups } = usePopup()
  const transition = useTransition(Object.values(popups), {
    from: { scale: 2, opacity: 0 },
    enter: { scale: 1, opacity: 1 },
    leave: { scale: 0, opacity: 0 },
  })
  return <>
    {transition((style, item) => {
      // item.props.style = style
      return item
    })}
  </>
})
