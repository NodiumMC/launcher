import { FC } from 'react'
import { Select } from 'components/micro/Select'
import styled from 'styled-components'

const Styled = styled(Select)`
  width: 128px;
`

export const VersionSelector: FC = () => {
  return (
    <Styled
      menuPlacement={'top'}
      options={[
        {
          value: '1.19.1',
          label: '1.19.1',
        },
      ]}
    />
  )
}
