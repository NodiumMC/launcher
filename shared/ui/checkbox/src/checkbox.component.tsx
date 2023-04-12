import { ChangeEventHandler } from 'react'
import { AnimatePresence } from 'framer-motion'
import { CheckboxProps } from './checkbox.interface'
import { CheckMark } from './checkmark/checkmark.component'
import { CheckboxInput } from './checkboxInput/checkboxInput.component'
import { StyledCheckbox } from './styledCheckbox/styledCheckbox.component'
import { LabelCheckbox } from './label/label.component'
import { CheckboxWrapper } from './wrapper/wrapper.component'

interface CheckboxPropsWithChecked extends CheckboxProps {
  label?: string
  value: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const Checkbox = ({ label, value, onChange }: CheckboxPropsWithChecked) =>
  label ? (
    <CheckboxWrapper>
      <CheckboxInput type='checkbox' id='myCheckbox' checked={value} onChange={onChange} />
      <StyledCheckbox htmlFor='myCheckbox' />
      <LabelCheckbox>{label}</LabelCheckbox>
    </CheckboxWrapper>
  ) : (
    <CheckboxWrapper>
      <CheckboxInput type='checkbox' id='myCheckbox' checked={value} onChange={onChange} />
      <StyledCheckbox htmlFor='myCheckbox'>
        <AnimatePresence>
          {value && <CheckMark initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
        </AnimatePresence>
      </StyledCheckbox>
    </CheckboxWrapper>
  )
