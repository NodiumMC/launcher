import { ComponentPropsWithRef, forwardRef } from 'react'
import styled from 'styled-components'
import { build, styield } from 'styield'
import { pick } from 'theme'

export interface CheckboxProps extends Omit<ComponentPropsWithRef<'input'>, 'onChange'> {
  disabled?: boolean
  checked?: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
}

const StyledCheckbox = styled.label<CheckboxProps>(({ theme, disabled, checked }) =>
  build(
    styield
      .display('flex')
      .alignItems('center')
      .justifyContent('center')
      .width('16px')
      .height('16px')
      .borderRadius('4px')
      .borderWidth('1px')
      .borderStyle('solid')
      .transition('all .2s')
      .if(
        checked,
        styield.if(
          disabled,
          styield.backgroundColor(pick(theme.palette.gray, 100)).borderColor(pick(theme.palette.gray, 300)),
          styield.backgroundColor(pick(theme.accent.primary, 50)).borderColor(theme.accent.primary),
        ),
        styield
          .borderColor(pick(theme.palette.gray, 300))
          .if(
            disabled,
            styield.backgroundColor(pick(theme.palette.gray, 100)),
            styield.backgroundColor(theme.master.back),
          ),
      )
      .boxShadow('0px 1px 2px rgba(16, 24, 40, 0.05)')
      .if(disabled, styield.color(pick(theme.palette.gray, 300)), styield.color(theme.accent.primary))
      .ifNot(
        disabled,
        styield
          .cursor('pointer')
          .selector(
            '&:hover',
            styield.borderColor(theme.accent.primary).backgroundColor(pick(theme.accent.primary, 100)),
          ),
      ),
  ),
)

const Input = styled.input(() => build(styield.display('none')))

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ onChange, className, style, ...props }, ref) => (
  <>
    <Input {...(props as object)} ref={ref} />
    <StyledCheckbox
      checked={props.checked}
      indeterminate={props.indeterminate}
      disabled={props.disabled}
      htmlFor={props.id}
      onClick={() => onChange?.(!props.checked)}
      className={className}
      style={style}
    >
      {props.checked &&
        (props.indeterminate ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.5 1.5" width={7.5} height={1.5}>
            <path d="m0.75 0.75h6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.864 5.743" width={7.864} height={5.743}>
            <g
              transform="translate(1.4926 2.3713)"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            >
              <path d="m1.3787 2.6213 4.2426-4.2426" />
              <path d="m-0.74264 0.5 2.1213 2.1213" />
            </g>
          </svg>
        ))}
    </StyledCheckbox>
  </>
))
