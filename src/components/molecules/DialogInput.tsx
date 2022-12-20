import { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { open, OpenDialogOptions } from '@tauri-apps/api/dialog'
import { Input } from 'components/atoms/Input'
import { Button } from 'components/atoms/Button'

export interface DialogInputProps extends Omit<OpenDialogOptions, 'multiple'>, ExtraProps.DataInput<string> {
  disabled?: boolean
  icon?: ReactNode
}

const Styled = styled.div`
  display: flex;
`

const View = styled(Input)`
  flex-grow: 1;
  border-right: 0;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
`

const Btn = styled(Button)`
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
`

export const DialogInput: FC<DialogInputProps> = ({ disabled, icon, value, onChange, ...props }) => {
  return (
    <Styled>
      <View readOnly value={value} />
      <Btn
        disabled={disabled}
        square
        noShadow
        primary
        onClick={async () => {
          const selected = await open(props)
          if (selected !== null && !Array.isArray(selected)) onChange?.(selected)
        }}
      >
        {icon}
      </Btn>
    </Styled>
  )
}
