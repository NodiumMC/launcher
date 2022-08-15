import { render, screen } from '@testing-library/react'

describe('Jest test', () => {
  it('@testing-library', () => {
    render(<div>Hello World</div>)
    expect(screen.queryByText('Hello World')).toBeInTheDocument()
  })
})
