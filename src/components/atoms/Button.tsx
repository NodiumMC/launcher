import styled, { css } from 'styled-components'
import { build, styield } from 'styield'
import { ComponentPropsWithRef, forwardRef } from 'react'
import { Size } from 'components/types'
import { pick } from 'theme'
import { Preloader } from 'components/atoms/Preloader'

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'tertiary-gray'
  | 'tertiary-color'
  | 'link-gray'
  | 'link-color'

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  disabled?: boolean
  variant?: ButtonVariant
  destructive?: boolean
  only?: boolean
  size?: Size
  fetching?: boolean
}

export const StyledButton = styled.button<ButtonProps>(
  ({ theme, variant = 'default', destructive, only, size = 'md', disabled }) =>
    build(
      styield
        .display('flex')
        .alignItems('center')
        .justifyContent('center')
        .borderRadius(theme.radius())
        .gap(theme.space())
        .boxSizing('border-box')
        .transition('all .2s')
        .userSelect('none')
        .borderWidth('2px')
        .borderStyle('solid')
        .ifNot(disabled, styield.cursor('pointer'))
        .switch(size, {
          sm: styield
            .var('size', '30px')
            .fontSize('0.825rem')
            .var('padding', `0 ${theme.space(2)}`),
          lg: styield
            .var('size', '42px')
            .fontSize('1.15rem')
            .var('padding', `0 ${theme.space(4)}`),
          default: styield
            .var('size', '38px')
            .fontSize('1rem')
            .var('padding', `0 ${theme.space(3)}`),
        })
        .height.var('size')
        .if(only, styield.width.var('size'), styield.padding.var('padding'))
        .lineHeight('0px')
        .switch(variant, {
          primary() {
            const color = destructive ? theme.palette.red : theme.accent.primary
            const lighted = pick(color, 600)
            return styield.color(theme.master.back).if(
              disabled,
              styield
                .var('disabled-color', pick(theme.master.front, 100))
                .background.var('disabled-color')
                .borderColor.var('disabled-color'),
              styield
                .backgroundColor(color)
                .borderColor(color)
                .selector('&:hover', styield.backgroundColor(lighted).borderColor(lighted))
                .selector('&:focus', styield.boxShadow(css`0 0 0 4px ${pick(color, 50)}`)),
            )
          },
          secondary() {
            const color = destructive ? theme.palette.red : theme.accent.primary
            return styield.if(
              disabled,
              styield
                .var('color', pick(color, 25))
                .backgroundColor.var('color')
                .borderColor.var('color')
                .color(pick(color, 300)),
              styield
                .var('color', pick(color, 50))
                .backgroundColor.var('color')
                .borderColor.var('color')
                .color(color)
                .selector(
                  '&:hover',
                  styield
                    .var('color', pick(color, 60))
                    .backgroundColor.var('color')
                    .borderColor.var('color')
                    .color(pick(color, 600)),
                )
                .selector('&:focus', styield.boxShadow(css`0px 0px 0px 4px ${pick(color, 25)}`)),
            )
          },
          'tertiary-gray': true,
          'tertiary-color'() {
            const color = destructive
              ? theme.palette.red
              : variant === 'tertiary-gray'
              ? theme.palette.gray
              : theme.accent.primary
            return styield
              .borderColor('transparent')
              .if(
                disabled,
                styield.color(pick(color, 300)),
                styield
                  .color(pick(color, 500))
                  .selector('&:hover', styield.color(pick(color, 600)).background(pick(color, 50))),
              )
          },
          'link-gray': true,
          'link-color'() {
            const color = destructive
              ? theme.palette.red
              : variant === 'link-gray'
              ? theme.palette.gray
              : theme.accent.primary
            return styield
              .borderWidth('0px')
              .padding('0px')
              .height('auto')
              .if(
                disabled,
                styield.color(pick(color, 300)),
                styield.color(pick(color, 600)).selector('&:hover', styield.color(pick(color, 700))),
              )
          },
          default() {
            const color = destructive ? theme.palette.red : theme.palette.gray
            return styield.if(
              disabled,
              styield.borderColor(pick(color, 50)).color(pick(color, 100)),
              styield
                .borderColor(pick(color, 300))
                .color(pick(color, 700))
                .var('color', pick(color, 50))
                .selector('&:hover', styield.backgroundColor.var('color'))
                .selector('&:focus', styield.boxShadow(`0 0 0 4px ${styield.var('color')}`)),
            )
          },
        })
        .if(variant.match(/^(primary|secondary|default)$/), styield.boxShadow('0px 1px 2px rgba(16, 24, 40, 0.05)')),
    ),
)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ fetching, children, ...props }, ref) => (
  <StyledButton {...props} disabled={fetching || props.disabled} ref={ref}>
    {fetching && <Preloader />}
    {children}
  </StyledButton>
))
