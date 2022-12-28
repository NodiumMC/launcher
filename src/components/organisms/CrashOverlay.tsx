import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Text } from 'components/atoms/Text'
import { ReportService } from 'debug/report.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { parse } from 'stack-trace'
import { transition } from 'style'
import { useMod } from 'hooks/useMod'
import { observer } from 'mobx-react'
import { useI18N } from 'hooks'

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  background-color: ${({ theme }) => theme.master.back};
  color: ${({ theme }) => theme.palette.red};
  border-radius: ${({ theme }) => theme.radius()};
  padding: ${({ theme }) => `${theme.space(10)} ${theme.space(20)}`};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 6px solid ${({ theme }) => theme.palette.red};
`

const Header = styled.div``

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
`

const Actions = styled.div``

const Progress = styled.div`
  width: 100%;
  height: 30px;
  border-radius: ${({ theme }) => theme.radius()};
  border: 2px solid ${({ theme }) => theme.palette.red};
`

const ProgressInner = styled.div.attrs<ExtraProps.Value<number>>(({ value }) => ({
  style: {
    width: `${value}%`,
  },
}))<ExtraProps.Value<number>>`
  height: 100%;
  background-color: ${({ theme }) => theme.palette.red};
  ${transition('width')}
`

export const CrashOverlay: FC = observer(() => {
  const report = useMod(ReportService)
  const i18n = useI18N()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!report.reported) return
    if (progress > 100) window.location.reload()
    setTimeout(() => setProgress(progress + 1), 300)
  }, [report.reported, progress])

  if (!report.reported) return <></>

  return (
    <StyledOverlay>
      <Header>
        <Title>
          <Text size={25}>
            <FontAwesomeIcon icon={'circle-minus'} />
          </Text>
          <Text weight={'bold'} size={30} interaction>
            {report.cause?.name ?? 'Unknown'}
          </Text>
        </Title>
        <Text block interaction>
          {report.cause?.message}
        </Text>
      </Header>
      <Text>
        {report.cause &&
          parse(report.cause).map((s, i) => (
            <Text block key={i} interaction>
              at {s.getFunctionName()} on {s.getFileName()}:{s.getLineNumber()}:{s.getColumnNumber()}
            </Text>
          ))}
      </Text>
      <Actions>
        <Text interaction>{i18n.translate.other.launcher_crashed}</Text>
      </Actions>
      <Progress>
        <ProgressInner value={progress} />
      </Progress>
    </StyledOverlay>
  )
})
