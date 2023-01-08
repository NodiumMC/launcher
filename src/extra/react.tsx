import React from 'react'
import inject from 'flinject'
import { ErrorBoundary } from 'components/organisms/ErrorBoundary'

React.createElement = inject(React.createElement, ({ target }, type, props, ...children) => {
  if (typeof type !== 'function') return
  return <ErrorBoundary>{target(type, props, ...children)}</ErrorBoundary>
})
