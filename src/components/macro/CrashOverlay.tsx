import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Text } from 'components/micro/Text'
import { Observer, useModule } from 'mobmarch'
import { ReportService } from 'debug/report.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { parse } from 'stack-trace'
import { transition } from 'style'

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

export const CrashOverlay: FC = Observer(() => {
  const report = useModule(ReportService)
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
        <Text interaction>
          Лаунчер упал с критической ошибкой. Подождите пока составляется отчёт об ошибке, после чего лаунчер
          перезагрузится. Попытайтесь понять, что вызвало ошибку и сообщите об этом разработчику или администрации
        </Text>
      </Actions>
      <Progress>
        <ProgressInner value={progress} />
      </Progress>
    </StyledOverlay>
  )
})
