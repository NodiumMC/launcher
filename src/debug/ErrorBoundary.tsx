import { error } from 'debug'
import { ErrorInfo, PureComponent } from 'react'
import { ReportService } from 'debug/report.service'
import { container } from 'tsyringe'
import { Text } from 'components/micro/Text'

export class ErrorBoundary extends PureComponent<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(err: Error, errorInfo: ErrorInfo) {
    error(err)
    container.resolve(ReportService).report(err)
  }

  render() {
    if (this.state.hasError) {
      return <Text>ERROR</Text>
    }

    return this.props.children
  }
}
