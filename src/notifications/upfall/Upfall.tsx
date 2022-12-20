import styled from 'styled-components'
import type { Upfall } from '.'
import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Text } from 'components/micro/Text'
import { UpfallService } from 'notifications/upfall/Upfall.service'
import { mix, rgba } from 'polished'
import { useOnce } from 'hooks'
import { AnimatePresence, motion } from 'framer-motion'
import { useMod } from 'hooks/useMod'
import { observer } from 'mobx-react'

const Icon = styled.div`
  display: flex;
  height: 80%;
  justify-content: center;
  align-items: center;
  padding-right: 12px;
  border-right: 1px solid ${({ theme }) => theme.master.shade()};
`

const UpfallItemStyled = styled(motion.div).attrs<Pick<Upfall, 'type'>>(({ theme, type }) => ({
  typecolor: (() => {
    switch (type) {
      default:
        return theme.master.back
      case 'ok':
        return mix(0.7, theme.palette.green, theme.master.front)
      case 'warn':
        return mix(0.7, theme.palette.yellow, theme.master.front)
      case 'error':
        return mix(0.7, theme.palette.red, theme.master.front)
    }
  })(),
}))<Pick<Upfall, 'type'> & { typecolor?: string }>`
  display: flex;
  gap: 12px;
  padding: 8px 12px;
  max-width: 400px;
  min-width: 60px;
  min-height: 38px;
  align-items: center;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ typecolor, type, theme }) => (type === 'default' ? theme.master.shade() : typecolor)};
  border-radius: ${({ theme }) => theme.radius()};

  &,
  ${Text} {
    color: ${({ typecolor, type, theme }) => (type === 'default' ? theme.master.front : typecolor)};
  }

  ${Icon} {
    border-color: ${({ typecolor, theme, type }) =>
      type === 'default' ? theme.master.shade() : rgba(typecolor!, 0.3)};
  }

  background: ${({ theme, typecolor }) => mix(0.2, typecolor!, theme.master.back)};
`

export const UpfallItem: FC<{ upfall: Upfall; key: string } & ExtraProps.Styled> = ({
  upfall: { content, type, icon, remove },
}) => {
  useOnce(() => {
    setTimeout(remove, content.length * 200)
  })

  return (
    <UpfallItemStyled
      type={type}
      initial={{
        opacity: 0,
        y: -100,
        maxHeight: 0,
        minHeight: 0,
        padding: '0px 12px',
        margin: '-4px 0',
      }}
      animate={{
        opacity: 1,
        y: 0,
        maxHeight: 300,
        minHeight: 38,
        padding: '8px 12px',
        margin: '0px 0',
      }}
      exit={{
        opacity: 0,
        y: -100,
        maxHeight: 0,
        minHeight: 0,
        padding: '0px 12px',
        margin: '-4px 0',
      }}
    >
      <Icon>
        <FontAwesomeIcon
          icon={icon ?? type === 'ok' ? 'check' : type === 'warn' ? 'warning' : type === 'error' ? 'xmark' : 'info'}
        />
      </Icon>
      <Text>{content}</Text>
    </UpfallItemStyled>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  z-index: 100;
  pointer-events: none;
  padding-top: 36px;
`

export const UpfallConatiner: FC = observer(() => {
  const upfall = useMod(UpfallService)

  return (
    <Container>
      <AnimatePresence>
        {upfall.list.map(item => (
          <UpfallItem upfall={item} key={item.id} />
        ))}
      </AnimatePresence>
    </Container>
  )
})
