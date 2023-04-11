import { FC } from 'react'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { faMinus as solidMinus, faXmark as solidXmark, faHouse } from '@fortawesome/free-solid-svg-icons'
import { faSquare as regularSquare } from '@fortawesome/free-regular-svg-icons'

type IconFC = FC<Omit<FontAwesomeIconProps, 'icon'>>

export const CloseWindowIcon: IconFC = props => <FontAwesomeIcon {...props} icon={solidXmark} />
export const MinimizeWindowIcon: IconFC = props => <FontAwesomeIcon {...props} icon={solidMinus} />
export const MaximizeWindowIcon: IconFC = props => <FontAwesomeIcon {...props} icon={regularSquare} />
export const HomeIcon: IconFC = props => <FontAwesomeIcon {...props} icon={faHouse} />
