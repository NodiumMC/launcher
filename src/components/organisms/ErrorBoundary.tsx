import { error } from 'debug'
import { PureComponent } from 'react'
import { ReportService } from 'debug/report.service'
import { CrashOverlay } from 'components/organisms/CrashOverlay'
import { container } from 'tsyringe'

export class ErrorBoundary extends PureComponent<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(err: Error) {
    error(err)
    container.resolve(ReportService).report(err)
  }

  render() {
    if (this.state.hasError) {
      return <CrashOverlay />
    }

    return this.props.children
  }
}
