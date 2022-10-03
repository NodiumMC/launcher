import React from 'react'
import inject from 'flinject'
import { ErrorBoundary } from 'debug/ErrorBoundary'

React.createElement = inject(React.createElement, ({ target }, type, props, ...children) => {
  return target(type, props, ...children.map((v, i) => <ErrorBoundary key={i}>{v}</ErrorBoundary>))
})
