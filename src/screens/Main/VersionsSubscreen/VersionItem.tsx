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
      colorStops: [
        'transparent',
        theme.palette.back.tints[3],
        theme.palette.back.tints[3],
      ],
      toDirection: 'to bottom',
    })};
`

const StyledVersionItem = styled.div`
  display: flex;
  width: 120px;
  height: 100px;
  border: 1px solid ${({ theme }) => theme.palette.back.shades[0]};
  border-radius: ${({ theme }) => theme.shape.radius[0]};
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
  border-radius: ${({ theme }) => theme.shape.radius[0]};
  background: ${({ theme, deleteButton }) =>
    deleteButton ? theme.palette.red.default : theme.palette.accent.default};
  cursor: pointer;
`

const MicroProgress = styled.div<{ progress: number }>`
  width: 100%;
  height: 5px;
  position: absolute;
  inset: 0;
  overflow: hidden;

  &:after,
  &:before {
    content: '';
    inset: 0;
    display: block;
    position: absolute;
    height: 100%;
    ${transition('width')}
  }

  &:before {
    z-index: 1;
    width: ${({ progress }) => `${progress}%`};
    background-color: ${({ theme }) => theme.palette.blue.default};
  }

  &:after {
    z-index: 2;
    width: ${({ progress }) => `${progress > 100 ? progress - 100 : 0}%`};
    background-color: ${({ theme }) => theme.palette.green.default};
  }
`

export const VersionItem: FC<VersionItemProps> = ({ profile }) => {
  return (
    <StyledVersionItem>
      <MicroProgress progress={profile.progress} />
      <Icon src={profile.options.icon} />
      <Pane>
        <Text size={'s'}>{profile.options.name}</Text>
        <Text size={'xs'}>{profile.options.lastVersionId}</Text>
        <Grow />
        <Pair>
          <Action deleteButton>
            <Text size={'s'}>
              <FontAwesomeIcon icon={'trash'} />
            </Text>
          </Action>
          <Action>
            <Text size={'s'}>
              <FontAwesomeIcon icon={'info'} />
            </Text>
          </Action>
        </Pair>
      </Pane>
    </StyledVersionItem>
  )
}
