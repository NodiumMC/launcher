import { FC } from 'react'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import {
  faMinus as solidMinus,
  faXmark as solidXmark,
  faBoltLightning,
  faDownload,
} from '@fortawesome/free-solid-svg-icons'
import { faSquare as regularSquare } from '@fortawesome/free-regular-svg-icons'

type IconFC = FC<Omit<FontAwesomeIconProps, 'icon'>>

export const FaSolidXMarkIcon: IconFC = props => <FontAwesomeIcon {...props} icon={solidXmark} />
export const FaSolidMinusIcon: IconFC = props => <FontAwesomeIcon {...props} icon={solidMinus} />
export const FaRegularSquareIcon: IconFC = props => <FontAwesomeIcon {...props} icon={regularSquare} />
export const FaSolidBoltLightningIcon: IconFC = props => <FontAwesomeIcon {...props} icon={faBoltLightning} />
export const FaSolidDownloadIcon: IconFC = props => <FontAwesomeIcon {...props} icon={faDownload} />
