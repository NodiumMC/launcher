import { FC } from 'react'
import styled from 'styled-components'
import { useI18N } from 'hooks'
import { Text } from 'components/micro/Text'
import { observer } from 'mobx-react'

const Styled = styled.div`
  border-radius: ${({ theme }) => theme.radius()};
  background-color: ${({ theme }) => theme.master.shade()};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const NotImplemented: FC<JSX.IntrinsicElements['div']> = observer(({ children, ...props }) => {
  const i18n = useI18N()

  return (
    <Styled {...(props as object)}>
      <Text interaction size={25} weight={'bold'}>
        {children ?? i18n.translate.not_implemented}
      </Text>
    </Styled>
  )
})
