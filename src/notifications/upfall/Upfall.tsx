import styled from 'styled-components'
import type { Upfall } from '.'
import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Text } from 'components/micro/Text'
import { Observer, useModule } from 'mobmarch'
import { UpfallService } from 'notifications/upfall/Upfall.service'
import { animated, useTransition } from 'react-spring'
import { mix, rgba } from 'polished'
import { useOnce } from 'hooks'

const Icon = styled.div`
  display: flex;
  height: 80%;
  justify-content: center;
  align-items: center;
  padding-right: 12px;
  border-right: 1px solid ${({ theme }) => theme.master.shade()};
`

const UpfallItemStyled = styled.div.attrs<Pick<Upfall, 'type'>>(
  ({ theme, type }) => ({
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
  }),
)<Pick<Upfall, 'type'> & { typecolor?: string }>`
  display: flex;
  gap: 12px;
  padding: 6px 12px;
  max-width: 400px;
  min-width: 60px;
  min-height: 36px;
  align-items: center;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.1);
  border: 1px solid
    ${({ typecolor, type, theme }) =>
      type === 'default' ? theme.master.shade() : typecolor};
  border-radius: ${({ theme }) => theme.radius()};

  &,
  ${Text} {
    color: ${({ typecolor, type, theme }) =>
      type === 'default' ? theme.master.front : typecolor};
  }

  ${Icon} {
    border-color: ${({ typecolor, theme, type }) =>
      type === 'default' ? theme.master.shade() : rgba(typecolor!, 0.3)};
  }

  background: ${({ theme, typecolor }) =>
    mix(0.2, typecolor!, theme.master.back)};
`

export const UpfallItem: FC<{ upfall: Upfall; key: string } & ExtraProps.Styled> = ({
  upfall: { content, type, icon, remove },
  style,
}) => {
  useOnce(() => {
    setTimeout(remove, content.length * 200)
  })

  return (
    <UpfallItemStyled type={type} as={animated.div} style={style}>
      <Icon>
        <FontAwesomeIcon
          icon={
            icon ?? type === 'ok'
              ? 'check'
              : type === 'warn'
              ? 'warning'
              : type === 'error'
              ? 'xmark'
              : 'info'
          }
        />
      </Icon>
      <Text>{content}</Text>
    </UpfallItemStyled>
  )
}

const Container = styled.div`
  position: fixed;
  inset: 0;
  left: 50%;
  translate: -50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  z-index: 100;
  pointer-events: none;
  padding-top: 36px;
`

export const UpfallConatiner: FC = Observer(() => {
  const upfall = useModule(UpfallService)

  const transitions = useTransition(upfall.list, {
    keys: item => item.id,
    from: {
      opacity: 0,
      y: -100,
      maxHeight: 0,
      minHeight: 0,
      padding: '0px 12px',
      margin: '-4px 0',
    },
    enter: {
      opacity: 1,
      y: 0,
      maxHeight: 300,
      minHeight: 36,
      padding: '6px 12px',
      margin: '0px 0',
    },
    leave: {
      opacity: 0,
      y: -100,
      maxHeight: 0,
      minHeight: 0,
      padding: '0px 12px',
      margin: '-4px 0',
    },
  })

  return (
    <Container>
      {transitions((style, item) => (
        <UpfallItem upfall={item} key={item.id} style={style} />
      ))}
    </Container>
  )
})
