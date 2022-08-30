import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { LauncherProfile } from 'core'
import { Img } from 'components/utils/Img'
import { Text } from 'components/micro/Text'
import { ColoredTag } from 'components/micro/ColoredTag'
import { linearGradient } from 'polished'

export interface VersionItemProps {
  profile: LauncherProfile
}

const VersionItemStyled = styled.div`
  display: flex;
  gap: 10px;
  height: 70px;
  padding: 5px 20px;
  align-items: center;
  position: relative;
  &:not(:last-child) {
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: 50%;
      bottom: 0;
      width: 90%;
      height: 1px;
      transform: translate(-50%);
      background-color: ${({ theme }) => theme.palette.back.shades[0]};
    }
  }
`

const VersionIcon = styled(Img)`
  height: 40px;
  width: 40px;
  border-radius: ${({ theme }) => theme.shape.radius[0]};
  //border-right: 1px solid ${({ theme }) => theme.palette.back.shades[0]};
  padding-right: 6px;
  box-sizing: content-box;
`

export const VersionItem: FC<VersionItemProps> = ({ profile }) => {
  const tagColor = useMemo(() => {
    switch (profile.type) {
      case 'custom':
        return '#73e5ff'
      case 'release':
        return '#ffc773'
      case 'snapshot':
        return '#ff5977'
      case 'latest-snapshot':
        return linearGradient({
          colorStops: ['#0080ff', '#00ffd1'],
          toDirection: '45deg',
        })
      case 'latest-release':
        return linearGradient({
          colorStops: ['#ff8800', '#ff003b'],
          toDirection: '45deg',
        })
    }
  }, [profile.type])
  return (
    <VersionItemStyled>
      <VersionIcon src={profile.icon} />
      <Text>{profile.name}</Text>
      <ColoredTag color={tagColor}>{profile.type}</ColoredTag>
    </VersionItemStyled>
  )
}
