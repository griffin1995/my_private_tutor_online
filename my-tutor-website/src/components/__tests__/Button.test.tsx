import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    const { getByRole } = render(<Button>Click me</Button>)
    expect(getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const mockClick = jest.fn()
    
    const { getByRole } = render(<Button onClick={mockClick}>Click me</Button>)
    
    await user.click(getByRole('button'))
    expect(mockClick).toHaveBeenCalledTimes(1)
  })

  it('applies variant styles correctly', () => {
    const { rerender, getByRole } = render(<Button variant="outline">Outline</Button>)
    expect(getByRole('button')).toHaveClass('border-input')
    
    rerender(<Button variant="destructive">Destructive</Button>)
    expect(getByRole('button')).toHaveClass('bg-destructive')
  })

  it('applies size styles correctly', () => {
    const { rerender, getByRole } = render(<Button size="sm">Small</Button>)
    expect(getByRole('button')).toHaveClass('h-9')
    
    rerender(<Button size="lg">Large</Button>)
    expect(getByRole('button')).toHaveClass('h-11')
  })

  it('is disabled when disabled prop is true', () => {
    const { getByRole } = render(<Button disabled>Disabled</Button>)
    expect(getByRole('button')).toBeDisabled()
  })

  it('has correct accessibility attributes', () => {
    const { getByRole } = render(<Button aria-label="Custom label">Button</Button>)
    expect(getByRole('button')).toHaveAttribute('aria-label', 'Custom label')
  })
})