// CONTEXT7 SOURCE: /testing-library/react-testing-library - React Testing Library patterns for form testing
// TESTING REASON: Comprehensive testing of revenue-critical consultation booking form for enterprise-grade reliability

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { ConsultationBookingForm } from '../consultation-booking-form'

// CONTEXT7 SOURCE: /testing-library/react-testing-library - Mock fetch API for form submission testing
// MOCK REASON: Isolate form submission logic from external API dependencies
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('ConsultationBookingForm', () => {
  beforeEach(() => {
    mockFetch.mockClear()
    // CONTEXT7 SOURCE: /testing-library/react-testing-library - Mock successful CSRF token response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'mock-csrf-token-123' })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Form Rendering', () => {
    it('renders all required form fields', () => {
      render(<ConsultationBookingForm />)
      
      // CONTEXT7 SOURCE: /testing-library/react-testing-library - Screen queries for form field testing
      expect(screen.getByLabelText(/parent.*guardian.*name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/student.*name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email.*address/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/phone.*number/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/academic.*level/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/subjects.*required/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /book.*confidential.*consultation/i })).toBeInTheDocument()
    })

    it('displays royal endorsement badge', () => {
      render(<ConsultationBookingForm />)
      expect(screen.getByText(/royal.*family.*endorsed/i)).toBeInTheDocument()
    })

    it('shows discretion notice for premium service assurance', () => {
      render(<ConsultationBookingForm />)
      expect(screen.getByText(/complete.*confidentiality/i)).toBeInTheDocument()
      expect(screen.getByText(/highest.*standards.*discretion/i)).toBeInTheDocument()
    })
  })

  describe('Form Validation', () => {
    it('validates required parent name field', async () => {
      const user = userEvent.setup()
      render(<ConsultationBookingForm />)
      
      const submitButton = screen.getByRole('button', { name: /book.*confidential.*consultation/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/parent.*name.*must.*be.*at.*least.*2.*characters/i)).toBeInTheDocument()
      })
    })

    it('validates parent name format (letters, spaces, hyphens, apostrophes only)', async () => {
      const user = userEvent.setup()
      render(<ConsultationBookingForm />)
      
      const parentNameInput = screen.getByLabelText(/parent.*guardian.*name/i)
      await user.type(parentNameInput, 'John123')
      
      const submitButton = screen.getByRole('button', { name: /book.*confidential.*consultation/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/parent.*name.*can.*only.*contain.*letters/i)).toBeInTheDocument()
      })
    })

    it('validates email format', async () => {
      const user = userEvent.setup()
      render(<ConsultationBookingForm />)
      
      const emailInput = screen.getByLabelText(/email.*address/i)
      await user.type(emailInput, 'invalid-email')
      
      const submitButton = screen.getByRole('button', { name: /book.*confidential.*consultation/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/please.*enter.*valid.*email.*address/i)).toBeInTheDocument()
      })
    })

    it('validates phone number format', async () => {
      const user = userEvent.setup()
      render(<ConsultationBookingForm />)
      
      const phoneInput = screen.getByLabelText(/phone.*number/i)
      await user.type(phoneInput, 'abc123')
      
      const submitButton = screen.getByRole('button', { name: /book.*confidential.*consultation/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/phone.*number.*contains.*invalid.*characters/i)).toBeInTheDocument()
      })
    })

    it('validates student name field', async () => {
      const user = userEvent.setup()
      render(<ConsultationBookingForm />)
      
      const submitButton = screen.getByRole('button', { name: /book.*confidential.*consultation/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/student.*name.*must.*be.*at.*least.*2.*characters/i)).toBeInTheDocument()
      })
    })

    it('validates subjects field is required', async () => {
      const user = userEvent.setup()
      render(<ConsultationBookingForm />)
      
      const submitButton = screen.getByRole('button', { name: /book.*confidential.*consultation/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/please.*specify.*subjects.*needed/i)).toBeInTheDocument()
      })
    })
  })

  describe('Form Submission', () => {
    const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
      // CONTEXT7 SOURCE: /testing-library/react-testing-library - User event simulation for comprehensive form testing
      await user.type(screen.getByLabelText(/parent.*guardian.*name/i), 'Elizabeth Windsor')
      await user.type(screen.getByLabelText(/student.*name/i), 'Prince William')
      await user.type(screen.getByLabelText(/email.*address/i), 'enquiries@royalfamily.gov.uk')
      await user.type(screen.getByLabelText(/phone.*number/i), '020 7930 4832')
      
      // Academic level selection
      await user.click(screen.getByLabelText(/academic.*level/i))
      await user.click(screen.getByText(/primary.*years.*1-6/i))
      
      await user.type(screen.getByLabelText(/subjects.*required/i), 'Mathematics, English Literature')
      
      // Timescale selection
      await user.click(screen.getByLabelText(/timescale.*tutoring.*support/i))
      await user.click(screen.getByText(/within.*week/i))
      
      // Contact preference
      await user.click(screen.getByLabelText(/preferred.*contact.*method/i))
      await user.click(screen.getByText(/either.*method/i))
      
      // Service level
      await user.click(screen.getByLabelText(/service.*level.*budget/i))
      await user.click(screen.getByText(/elite.*service/i))
    }

    it('submits form with valid data successfully', async () => {
      const user = userEvent.setup()
      
      // Mock successful form submission
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      })
      
      render(<ConsultationBookingForm />)
      
      await fillValidForm(user)
      
      const submitButton = screen.getByRole('button', { name: /book.*confidential.*consultation/i })
      await user.click(submitButton)
      
      // Wait for success state
      await waitFor(() => {
        expect(screen.getByText(/consultation.*request.*received/i)).toBeInTheDocument()
      })
      
      // Verify API call was made with correct data
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': 'mock-csrf-token-123'
          },
          body: expect.stringContaining('Elizabeth Windsor')
        })
      })
    })

    it('shows loading state during submission', async () => {
      const user = userEvent.setup()
      
      // Mock delayed response
      mockFetch.mockImplementationOnce(
        () => new Promise(resolve => setTimeout(() => resolve({ ok: true }), 100))
      )
      
      render(<ConsultationBookingForm />)
      await fillValidForm(user)
      
      const submitButton = screen.getByRole('button', { name: /book.*confidential.*consultation/i })
      await user.click(submitButton)
      
      // Verify loading state
      expect(screen.getByText(/submitting.*request/i)).toBeInTheDocument()
      expect(submitButton).toBeDisabled()
    })

    it('handles CSRF token fetch failure gracefully', async () => {
      const user = userEvent.setup()
      
      // Mock CSRF token fetch failure
      mockFetch.mockReset()
      mockFetch.mockRejectedValueOnce(new Error('Network error'))
      
      render(<ConsultationBookingForm />)
      await fillValidForm(user)
      
      const submitButton = screen.getByRole('button', { name: /book.*confidential.*consultation/i })
      await user.click(submitButton)
      
      // Form should still be functional (will fail on submit but shouldn't crash)
      expect(submitButton).toBeInTheDocument()
    })

    it('includes CSRF token in submission headers', async () => {
      const user = userEvent.setup()
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      })
      
      render(<ConsultationBookingForm />)
      await fillValidForm(user)
      
      const submitButton = screen.getByRole('button', { name: /book.*confidential.*consultation/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/contact', 
          expect.objectContaining({
            headers: expect.objectContaining({
              'x-csrf-token': 'mock-csrf-token-123'
            })
          })
        )
      })
    })
  })

  describe('Success State', () => {
    it('displays success message with royal branding', async () => {
      const user = userEvent.setup()
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      })
      
      render(<ConsultationBookingForm />)
      await fillValidForm(user)
      
      const submitButton = screen.getByRole('button', { name: /book.*confidential.*consultation/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/consultation.*request.*received/i)).toBeInTheDocument()
        expect(screen.getByText(/royal.*family.*endorsed.*service/i)).toBeInTheDocument()
        expect(screen.getByText(/contact.*you.*within.*24.*hours/i)).toBeInTheDocument()
      })
    })

    it('allows submitting another enquiry from success state', async () => {
      const user = userEvent.setup()
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      })
      
      render(<ConsultationBookingForm />)
      await fillValidForm(user)
      
      const submitButton = screen.getByRole('button', { name: /book.*confidential.*consultation/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/consultation.*request.*received/i)).toBeInTheDocument()
      })
      
      // Click "Submit Another Enquiry" button
      const anotherEnquiryButton = screen.getByRole('button', { name: /submit.*another.*enquiry/i })
      await user.click(anotherEnquiryButton)
      
      // Should return to form view
      expect(screen.getByLabelText(/parent.*guardian.*name/i)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper form labelling for screen readers', () => {
      render(<ConsultationBookingForm />)
      
      // All inputs should have accessible labels
      expect(screen.getByLabelText(/parent.*guardian.*name/i)).toHaveAttribute('id', 'parentName')
      expect(screen.getByLabelText(/student.*name/i)).toHaveAttribute('id', 'studentName')
      expect(screen.getByLabelText(/email.*address/i)).toHaveAttribute('id', 'email')
      expect(screen.getByLabelText(/phone.*number/i)).toHaveAttribute('id', 'phone')
    })

    it('provides proper ARIA labels for select fields', () => {
      render(<ConsultationBookingForm />)
      
      const academicLevelSelect = screen.getByLabelText(/academic.*level/i)
      expect(academicLevelSelect).toHaveAttribute('aria-label', 'Select academic level')
      
      const timescaleSelect = screen.getByLabelText(/timescale.*tutoring.*support/i)
      expect(timescaleSelect).toHaveAttribute('aria-label', 'Select timescale for tutoring support')
    })

    it('announces form validation errors to screen readers', async () => {
      const user = userEvent.setup()
      render(<ConsultationBookingForm />)
      
      const submitButton = screen.getByRole('button', { name: /book.*confidential.*consultation/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        const errorMessages = screen.getAllByText(/must.*be.*at.*least/i)
        errorMessages.forEach(error => {
          expect(error).toBeInTheDocument()
          expect(error).toHaveClass('text-red-600') // Visual error indication
        })
      })
    })
  })

  describe('Compact Mode', () => {
    it('renders with reduced padding in compact mode', () => {
      render(<ConsultationBookingForm compact={true} />)
      
      const cardHeader = screen.getByText(/book.*your.*confidential.*consultation/i).closest('[class*="CardHeader"]')
      expect(cardHeader).toHaveClass('pb-4')
    })
  })

  describe('Royal Client Standards', () => {
    it('maintains premium language and branding throughout', () => {
      render(<ConsultationBookingForm />)
      
      // Premium language indicators
      expect(screen.getByText(/confidential.*consultation/i)).toBeInTheDocument()
      expect(screen.getByText(/personalised.*consultation/i)).toBeInTheDocument()
      expect(screen.getByText(/complete.*discretion/i)).toBeInTheDocument()
      expect(screen.getByText(/elite.*service/i)).toBeInTheDocument()
    })

    it('emphasises royal endorsement throughout user journey', () => {
      render(<ConsultationBookingForm />)
      
      // Royal branding should be prominent
      expect(screen.getByText(/royal.*family.*endorsed/i)).toBeInTheDocument()
      
      // Crown icons should be present
      const crownIcons = document.querySelectorAll('[class*="lucide-crown"]')
      expect(crownIcons.length).toBeGreaterThan(0)
    })
  })
})