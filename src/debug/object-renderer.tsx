import { FC, Fragment, ReactNode, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Text } from 'components/micro/Text'
import { mix } from 'polished'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { parse } from 'stack-trace'

export interface Property {
  type: 'default' | 'symbol' | 'hidden'
  key: string
  value: any
}

const revealProperties = (target: any): Property[] => {
  const props: Property[] = []
  Reflect.ownKeys(target).forEach(key => {
    const descriptor = Reflect.getOwnPropertyDescriptor(target, key)
    if (typeof key === 'string' && ['caller', 'callee', 'arguments'].includes(key)) return
    props.push({
      type: typeof key === 'symbol' ? 'symbol' : 'default',
      key: typeof key === 'symbol' ? key.description ?? 'symbol' : key,
      value: descriptor?.value,
    })
  })
  return props
}

const isPrimitive = (target: any) => {
  return !target || (typeof target !== 'object' && typeof target !== 'function')
}

const isEmptyObject = (target: any) => {
  for (const _ in target) return false
  return true
}

const previewArray = (array: any[], ellipsis = false) => {
  const comma = (i: number) => i < array.length - 1
  return array.map((v, i) => (
    <Fragment key={i}>
      {isPrimitive(v) ? (
        <ObjectRenderer target={v} />
      ) : Array.isArray(v) ? (
        v.length < 0 ? (
          <TypeTint>{'[...]'}</TypeTint>
        ) : (
          <TypeTint>{'[]'}</TypeTint>
        )
      ) : isEmptyObject(v) ? (
        <TypeTint>{'{...}'}</TypeTint>
      ) : (
        <TypeTint>{'{}'}</TypeTint>
      )}
      {comma(i) && <TypeShadow pre>, </TypeShadow>}
      {!comma(i) && ellipsis && <TypeTint pre>, ...</TypeTint>}
    </Fragment>
  ))
}

const previewObject = (object: any) => {
  const length = Object.keys(object).length
  const ellipsis = length > 10
  const comma = (i: number) => i < length - 1
  return Object.entries(object)
    .slice(0, 10)
    .map(([key, value], i) => (
      <Fragment key={i}>
        <TypeCyan>{key}</TypeCyan>
        <TypeTint pre>: </TypeTint>
        {isPrimitive(value) ? (
          <ObjectRenderer target={value} />
        ) : Array.isArray(value) ? (
          value.length < 0 ? (
            <TypeTint>{'[...]'}</TypeTint>
          ) : (
            <TypeTint>{'[]'}</TypeTint>
          )
        ) : isEmptyObject(value) ? (
          <TypeTint>{'{...}'}</TypeTint>
        ) : (
          <TypeTint>{'{}'}</TypeTint>
        )}
        {comma(i) && <TypeShadow pre>, </TypeShadow>}
        {!comma(i) && ellipsis && <TypeTint pre>, ...</TypeTint>}
      </Fragment>
    ))
}

export interface ObjectRendererProps {
  target: any
  name?: ReactNode
}

export const Container = styled.span`
  margin-left: ${({ theme }) => theme.space(2)};
`

const TypeBlue = styled(Text)`
  color: ${({ theme }) => mix(0.2, theme.master.front, theme.palette.blue)};
`

const TypeYellow = styled(Text)`
  color: ${({ theme }) => mix(0.2, theme.master.front, theme.palette.yellow)};
`

const TypeOrange = styled(Text)`
  color: ${({ theme }) => mix(0.1, theme.master.front, theme.palette.orange)};
`

const TypeCyan = styled(Text)`
  color: ${({ theme }) => mix(0.4, theme.master.front, theme.palette.cyan)};
`

const TypeAdaptive = styled(Text)`
  color: inherit;
`

const TypeShadow = styled(Text)`
  color: inherit;
  opacity: 0.5;
`

const TypeTint = styled(Text)`
  color: inherit;
  opacity: 0.5;
`

const HeaderOpen = styled.span<{ active?: boolean }>`
  position: absolute;
  left: 0;
  translate: ${({ theme }) => `calc(-100% - ${theme.space()})`};
  color: inherit;
  cursor: pointer;
  opacity: 0.5;
  svg {
    rotate: ${({ active }) => (active ? '90deg' : '0')};
    transition: rotate 0.3s;
  }
`

const Header = styled.div`
  position: relative;
  display: inline-flex;
  width: 100%;
  gap: ${({ theme }) => theme.space()};
  align-items: center;
`

const cbo = <TypeShadow>{'{'}</TypeShadow>
const cbc = <TypeShadow>{'}'}</TypeShadow>
const sbo = <TypeShadow>{'['}</TypeShadow>
const sbc = <TypeShadow>{']'}</TypeShadow>
const rbo = <TypeShadow>{'('}</TypeShadow>
const rbc = <TypeShadow>{')'}</TypeShadow>

const Children = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${({ theme }) => theme.space(3)};
  position: relative;
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 2px;
    height: 100%;
    width: 0;
    border-color: inherit;
    border-right: 1px solid;
    opacity: 0.2;
  }
`

const Entry = styled.span`
  display: inline-flex;
`

const ErrorContainer = styled.div`
  color: inherit;
  display: flex;
  flex-direction: column;
`

const ErrorStack = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${({ theme }) => theme.space(2)};
`

export const ObjectRenderer: FC<ObjectRendererProps> = ({ target, name }) => {
  const [opened, setOpened] = useState(false)
  if (typeof target === 'number' || typeof target === 'bigint')
    return (
      <Entry>
        {name}
        <TypeBlue>{Number(target)}</TypeBlue>
      </Entry>
    )
  if (typeof target === 'string')
    return (
      <Entry>
        {name}
        <TypeAdaptive>&apos;{target}&apos;</TypeAdaptive>
      </Entry>
    )
  if (typeof target === 'boolean')
    return (
      <Entry>
        {name}
        <TypeBlue>{target ? 'true' : 'false'}</TypeBlue>
      </Entry>
    )
  if (target === null)
    return (
      <Entry>
        {name}
        <TypeOrange>null</TypeOrange>
      </Entry>
    )
  if (target === undefined)
    return (
      <Entry>
        {name}
        <TypeOrange>undefined</TypeOrange>
      </Entry>
    )
  if (target instanceof Error) {
    return (
      <ErrorContainer>
        <Text pre selectable block>
          <Text selectable weight={'bold'}>
            {target.name}
          </Text>
          : {target.message}
        </Text>
      </ErrorContainer>
    )
  }
  const properties = useMemo(() => revealProperties(target), [target])
  const preview = useMemo(() => {
    if (Array.isArray(target)) {
      if (target.length === 0)
        return (
          <>
            {sbo}
            {sbc}
          </>
        )
      const slice = target.slice(0, 10)
      const isLonger = target.length > 10
      return (
        <>
          {sbo} {previewArray(slice, isLonger)} {sbc}
        </>
      )
    } else if (typeof target === 'function') {
      return (
        <>
          function {rbo}
          {rbc}
        </>
      )
    } else {
      return (
        <>
          {target?.constructor?.name} {cbo} {previewObject(target)} {cbc}
        </>
      )
    }
  }, [properties])
  return (
    <Container>
      <Header>
        <HeaderOpen active={opened} onClick={() => setOpened(!opened)}>
          <FontAwesomeIcon icon={'caret-right'} />
        </HeaderOpen>
        <TypeAdaptive>
          {name}
          {name ? <TypeTint>{preview}</TypeTint> : preview}
        </TypeAdaptive>
      </Header>
      {opened && (
        <Children>
          {properties.map((v, i) => (
            <span key={i}>
              <ObjectRenderer
                target={v.value}
                name={
                  <>
                    {v.type === 'hidden' ? (
                      <TypeShadow>{v.key}</TypeShadow>
                    ) : (
                      <TypeCyan>{v.type === 'symbol' ? `@${v.key}` : v.key}</TypeCyan>
                    )}
                    <TypeTint pre>: </TypeTint>
                  </>
                }
              />
            </span>
          ))}
        </Children>
      )}
    </Container>
  )
}
