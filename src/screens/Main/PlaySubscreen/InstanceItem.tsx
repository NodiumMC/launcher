import { FC, useCallback, useRef } from 'react'
import { Instance } from 'minecraft/Instance'
import styled from 'styled-components'
import { Text } from 'components/micro/Text'
import { Img } from 'components/utils/Img'
import { Button } from 'components/micro/Button'
import { transition } from 'style'
import { useMod } from 'hooks/useMod'
import { UpfallService } from 'notifications'
import { observer } from 'mobx-react'
export interface InstanceItemProps {
  instance: Instance
}

const Actions = styled.div`
  opacity: 0;
  align-items: center;
  gap: ${({ theme }) => theme.space()};
  ${transition('opacity')}
`

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: ${({ theme }) => theme.space(2)};
  border-radius: ${({ theme }) => theme.radius()};
  &:hover {
    ${Actions} {
      opacity: 1;
    }
  }
`

const Image = styled(Img)`
  height: 36px;
  aspect-ratio: 1 / 1;
  border-radius: ${({ theme }) => theme.radius()};
  background-color: ${({ theme }) => theme.master.shade()};
`

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
`

const Progress = styled.svg`
  position: absolute;
  right: ${({ theme }) => theme.space(2)};
  height: 36px;
  width: 36px;
  z-index: -1;
  margin-top: -1px;
  margin-right: 1px;
  path {
    stroke: ${({ theme }) => theme.accent.primary};
    stroke-dasharray: 133;
    stroke-dashoffset: 133;
    ${transition('stroke-dashoffset')}
  }
`

export const InstanceItem: FC<InstanceItemProps> = observer(({ instance }) => {
  const progress = useRef<SVGPathElement | null>(null)
  const upfall = useMod(UpfallService)

  const setProgress = useCallback(
    (value: number) => {
      if (!progress.current) return
      progress.current.style.strokeDashoffset = value.map(0, 100, 133, 0).toString()
    },
    [progress],
  )

  const launch = useCallback(() => {
    instance.launch().subscribe({
      error(err) {
        upfall.drop('error', `Failed to launch: ${err}`)
      },
    })
  }, [])

  const kill = useCallback(() => {
    if (instance.child) instance.stop()
  }, [])

  const handle = useCallback(() => {
    if (instance.child) kill()
    else if (!instance.isInstalled) {
      instance.install().subscribe({
        next(value) {
          setProgress(value)
        },
        error(err) {
          upfall.drop('error', `Failed to install: ${err?.message ?? err}`)
        },
        complete() {
          setProgress(0)
          launch()
        },
      })
    } else launch()
  }, [setProgress])

  return (
    <Container>
      <NameContainer>
        <Image />
        <Text weight={900} size={14}>
          {instance.name}
        </Text>
      </NameContainer>
      <Actions>
        <Button icon={'gear'} square outlined={false} />
        <Button
          icon={instance.busy ? undefined : !instance.child ? (instance.isInstalled ? 'play' : 'download') : 'stop'}
          primary
          danger={!!instance.child}
          square
          fetching={instance.busy}
          onClick={handle}
        />
      </Actions>
      <Progress width="38" height="38" version="1.1" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
        <path
          ref={progress}
          x={1}
          y={1}
          width={36}
          height={36}
          d={'m7 1h24a6 6 45 0 1 6 6v24a6 6 135 0 1-6 6h-24a6 6 45 0 1-6-6v-24a6 6 135 0 1 6-6z'}
          fill={'none'}
          strokeWidth={'2'}
        />
      </Progress>
    </Container>
  )
})