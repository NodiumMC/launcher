import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { styles } from './fill.styles'

export const Fill = styled(motion.div)(styles)

Fill.defaultProps = {
  initial: {
    width: 0,
  },
}
