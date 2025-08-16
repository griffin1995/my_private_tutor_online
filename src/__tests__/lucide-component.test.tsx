// CONTEXT7 SOURCE: /testing-library/react-testing-library - Component testing with external icon library
// TESTING REASON: Verify Lucide React mocking is working correctly in Jest tests
// CONTEXT7 SOURCE: /jestjs/jest - Icon library mocking patterns for testing

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Import with explicit mocking
import * as LucideIcons from 'lucide-react'

// Component that uses Lucide React icons
const IconTestComponent = () => {
  const { Crown, Star, CheckCircle } = LucideIcons
  
  return (
    <div>
      <Crown data-testid="crown-icon" />
      <Star data-testid="star-icon" />
      <CheckCircle data-testid="check-icon" />
      <span>Component with icons</span>
    </div>
  )
}

describe('Lucide React Icon Testing', () => {
  it('should render icons correctly with mocks', () => {    
    render(<IconTestComponent />)
    
    // Test that our mocked icons are rendered as SVGs with correct test IDs
    expect(screen.getByTestId('crown-icon')).toBeInTheDocument()
    expect(screen.getByTestId('star-icon')).toBeInTheDocument()
    expect(screen.getByTestId('check-icon')).toBeInTheDocument()
    
    // Test that the text content is present
    expect(screen.getByText('Component with icons')).toBeInTheDocument()
    
    // Test that the mocked icons have the correct properties
    const crownIcon = screen.getByTestId('crown-icon')
    expect(crownIcon).toHaveAttribute('aria-label', 'Crown')
    expect(crownIcon.tagName.toLowerCase()).toBe('svg')
    expect(crownIcon).toHaveClass('lucide lucide-crown')
  })
})