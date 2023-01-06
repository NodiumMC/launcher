import { error } from 'debug'
import { PureComponent } from 'react'
import { CrashOverlay } from 'components/organisms/CrashOverlay'
import { container } from 'tsyringe'
import { ReportModule } from 'debug/report.module'

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
    container.resolve(ReportModule).report(err)
  }

  render() {
    if (this.state.hasError) {
      return <CrashOverlay />
    }

    return this.props.children
  }
}
