import styled from 'styled-components'

import { rgba } from 'polished'
import { motion } from 'framer-motion'

export const PopupWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(20px);
  z-index: 1000;
  border-radius: ${({ theme }) => theme.radius(2)};
  background-color: ${({ theme }) => rgba(theme.master.back, 0.6)};
  transition: background-color ${({ theme }) => theme.transition.time};
`
