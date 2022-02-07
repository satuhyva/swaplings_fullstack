
import { render, screen } from '@testing-library/react'
import Home from '../../pages/index'

describe('HomePage', () => {
  it('renders and contains the app name SWAPLINGS', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /swaplings/i,
    })

    expect(heading).toBeInTheDocument()
  })
})