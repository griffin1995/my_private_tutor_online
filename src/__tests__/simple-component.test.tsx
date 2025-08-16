// CONTEXT7 SOURCE: /testing-library/react-testing-library - Basic React component testing patterns
// TESTING REASON: Verify Jest + React Testing Library infrastructure is working correctly
// CONTEXT7 SOURCE: /vercel/next.js - Next.js component testing with Jest setup

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Simple test component
const SimpleComponent = ({ title }: { title: string }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>This is a simple test component</p>
    </div>
  )
}

describe('Simple Component Test Infrastructure', () => {
  it('should render a simple component correctly', () => {
    render(<SimpleComponent title="Test Title" />)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title')
    expect(screen.getByText('This is a simple test component')).toBeInTheDocument()
  })

  it('should handle different props', () => {
    render(<SimpleComponent title="Different Title" />)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Different Title')
  })
})