import { FC } from 'react'
import styled from 'styled-components'
import { Img } from 'components/utils/Img'
import { linearGradient } from 'polished'
import { Text } from 'components/micro/Text'
import { transition } from 'style'
import { Grow } from 'components/utils/Grow'
import { Pair } from 'components/utils/Pair'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LauncherProfile } from 'minecraft/LauncherProfile'
import { Observer } from 'mobmarch'

export interface VersionItemProps {
  profile: LauncherProfile
}

const Pane = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  inset: 0;
  translate: 0 30px;
  width: 100%;
  height: 100%;
  z-index: 1;
  padding: 40px 6px 6px;
  line-height: 10px;
  ${transition()}
  background: ${({ theme }) =>
    linearGradient({
      colorStops: ['transparent', theme.master.shade(0.15), theme.master.shade(0.15)],
      toDirection: 'to bottom',
    })};
`

const StyledVersionItem = styled.div`
  display: flex;
  width: 120px;
  height: 100px;
  border: 1px solid ${({ theme }) => theme.master.shade()};
  border-radius: ${({ theme }) => theme.radius()};
  position: relative;
  overflow: hidden;

  &:hover ${Pane} {
    translate: 0 0;
  }
`

const Icon = styled(Img)`
  position: absolute;
  inset: 50%;
  width: 70%;
  height: 70%;
  translate: -50% -50%;
  object-fit: contain;
`

const Action = styled.button<{ deleteButton?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  height: 20px;
  flex-grow: ${({ deleteButton }) => +!deleteButton};
  border-radius: ${({ theme }) => theme.radius()};
  background: ${({ theme, deleteButton }) => (deleteButton ? theme.palette.red : theme.accent.primary)};
  cursor: pointer;
`

const StyledMicroProgress = styled.div`
  width: 100%;
  height: 5px;
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${transition('height')}
  ${Text} {
    opacity: 0;
    color: ${({ theme }) => theme.master.back};
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.red};
    height: 20px;

    ${Text} {
      opacity: 1;
    }
  }
`

const MicroProgressInner = styled.div`
  inset: 0;
  display: block;
  position: absolute;
  height: 100%;
  ${transition('width')}

  &:hover {
    &:nth-child(1),
    &:nth-child(2) {
      opacity: 0;
    }
  }

  &:nth-child(1) {
    z-index: 1;
    background-color: ${({ theme }) => theme.palette.blue};
  }

  &:nth-child(2) {
    z-index: 2;
    background-color: ${({ theme }) => theme.palette.green};
  }
`

const MicroProgress: FC<{ progress: number } & ExtraProps.HasChildren & ExtraProps.Clickable> = ({
  progress,
  children,
  onClick,
}) => {
  return (
    <StyledMicroProgress onClick={onClick}>
      <MicroProgressInner style={{ width: `${progress}%` }} />
      <MicroProgressInner style={{ width: `${progress > 100 ? progress - 100 : 0}%` }} />
      {children}
    </StyledMicroProgress>
  )
}

export const VersionProgress: FC<VersionItemProps> = Observer(({ profile }) => {
  return (
    <MicroProgress progress={profile.progress} onClick={() => profile.abort()}>
      <Text shade={'low'}>
        <FontAwesomeIcon icon={'xmark'} />
      </Text>
    </MicroProgress>
  )
})

export const VersionItem: FC<VersionItemProps> = ({ profile }) => {
  return (
    <StyledVersionItem>
      <VersionProgress profile={profile} />
      <Icon src={profile.options.icon} />
      <Pane>
        <Text size={7}>{profile.options.name}</Text>
        <Text size={5}>{profile.options.lastVersionId}</Text>
        <Grow />
        <Pair>
          <Action deleteButton>
            <Text size={7}>
              <FontAwesomeIcon icon={'trash'} />
            </Text>
          </Action>
          <Action>
            <Text size={7}>
              <FontAwesomeIcon icon={'info'} />
            </Text>
          </Action>
        </Pair>
      </Pane>
    </StyledVersionItem>
  )
}
