import { FC, Fragment, ReactNode, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Text } from 'components/micro/Text'
import { mix } from 'polished'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  if (target.__proto__) {
    props.push({
      key: '[[prototype]]',
      type: 'hidden',
      value: target.__proto__,
    })
  }
  return props
}

const isPrimitive = (target: any) => {
  return !target || (typeof target !== 'object' && typeof target !== 'function')
}

const previewArray = (array: any[], ellipsis = false) => {
  const comma = (i: number) => i < array.length - 1
  return array.map((v, i) => (
    <Fragment key={i}>
      {isPrimitive(v) ? (
        <ObjectRenderer target={v} />
      ) : Array.isArray(v) ? (
        <TypeTint>{'[...]'}</TypeTint>
      ) : (
        <TypeTint>{'{...}'}</TypeTint>
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
          <TypeTint>{'[...]'}</TypeTint>
        ) : (
          <TypeTint>{'{...}'}</TypeTint>
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

const TypeGreen = styled(Text)`
  color: ${({ theme }) => mix(0.4, theme.master.front, theme.palette.green)};
`

const TypeShadow = styled(Text)`
  color: ${({ theme }) => theme.master.shade(0.1)};
  font-weight: bold;
`

const TypeTint = styled(Text)`
  color: ${({ theme }) => theme.master.shade(0.5)};
`

const HeaderOpen = styled.span<{ active?: boolean }>`
  position: absolute;
  left: 0;
  translate: ${({ theme }) => `calc(-100% - ${theme.space()})`};
  color: ${({ theme }) => theme.master.shade(0.3)};
  cursor: pointer;
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
    left: 1px;
    height: 100%;
    width: 1px;
    background-color: ${({ theme }) => theme.master.shade(0.1)};
  }
`

export const ObjectRenderer: FC<ObjectRendererProps> = ({ target, name }) => {
  const [opened, setOpened] = useState(false)
  if (typeof target === 'number' || typeof target === 'bigint')
    return (
      <>
        {name}
        <TypeBlue>{Number(target)}</TypeBlue>
      </>
    )
  if (typeof target === 'string')
    return (
      <>
        {name}
        <TypeYellow>&apos;{target}&apos;</TypeYellow>
      </>
    )
  if (typeof target === 'boolean')
    return (
      <>
        {name}
        <TypeBlue>{target ? 'true' : 'false'}</TypeBlue>
      </>
    )
  if (target === null)
    return (
      <>
        {name}
        <TypeOrange>null</TypeOrange>
      </>
    )
  if (target === undefined)
    return (
      <>
        {name}
        <TypeOrange>undefined</TypeOrange>
      </>
    )
  const properties = useMemo(() => revealProperties(target), [target])
  const preview = useMemo(() => {
    if (Array.isArray(target)) {
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
        <TypeGreen>
          {name}
          {name ? <TypeTint>{preview}</TypeTint> : preview}
        </TypeGreen>
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
                    <TypeTint pre>:{'  '}</TypeTint>
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
