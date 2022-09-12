import styled from 'styled-components'
import type { Upfall } from '.'
import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Text } from 'components/micro/Text'
import { Observer, useModule } from 'mobmarch'
import { UpfallService } from 'notifications/upfall/Upfall.service'
import { animated, useTransition } from 'react-spring'
import { mix, rgba } from 'polished'
import { Styled } from 'utils/UtilityProps'
import { useOnce } from 'hooks'

const Icon = styled.div`
  display: flex;
  height: 80%;
  justify-content: center;
  align-items: center;
  padding-right: 12px;
  border-right: 1px solid ${({ theme }) => theme.palette.back.shades[0]};
`

const UpfallItemStyled = styled.div.attrs<Pick<Upfall, 'type'>>(
  ({ theme, type }) => ({
    typecolor: (() => {
      switch (type) {
        default:
          return theme.palette.back.default
        case 'ok':
          return mix(
            0.7,
            theme.palette.green.default,
            theme.palette.front.default,
          )
        case 'warn':
          return mix(
            0.7,
            theme.palette.yellow.default,
            theme.palette.front.default,
          )
        case 'error':
          return mix(
            0.7,
            theme.palette.red.default,
            theme.palette.front.default,
          )
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
      type === 'default' ? theme.palette.back.shades[0] : typecolor};
  border-radius: ${({ theme }) => theme.shape.radius[0]};

  &,
  ${Text} {
    color: ${({ typecolor, type, theme }) =>
      type === 'default' ? theme.palette.front.default : typecolor};
  }

  ${Icon} {
    border-color: ${({ typecolor, theme, type }) =>
      type === 'default' ? theme.palette.back.shades[0] : rgba(typecolor!, 0.3)};
  }

  background: ${({ theme, typecolor }) =>
    mix(0.2, typecolor!, theme.palette.back.default)};
`

export const UpfallItem: FC<{ upfall: Upfall; key: string } & Styled> = ({
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
