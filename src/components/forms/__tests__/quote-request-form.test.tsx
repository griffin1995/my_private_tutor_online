// CONTEXT7 SOURCE: /testing-library/react-testing-library - Comprehensive form testing patterns for revenue-critical components
// TESTING REASON: Complex quote request form requires thorough testing for multi-step validation, subject selection, and enterprise-grade reliability

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { QuoteRequestForm } from '../quote-request-form'

// CONTEXT7 SOURCE: /testing-library/react-testing-library - Mock fetch API for form submission testing
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('QuoteRequestForm', () => {
  beforeEach(() => {
    mockFetch.mockClear()
    // Mock CSRF token response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'mock-csrf-token-456' })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Form Rendering', () => {
    it('renders all required sections with proper headings', () => {
      render(<QuoteRequestForm />)
      
      // Check section headings
      expect(screen.getByText(/student.*information/i)).toBeInTheDocument()
      expect(screen.getByText(/educational.*needs/i)).toBeInTheDocument()
      expect(screen.getByText(/tutoring.*preferences/i)).toBeInTheDocument()
      expect(screen.getByText(/contact.*information/i)).toBeInTheDocument()
      expect(screen.getByText(/additional.*information/i)).toBeInTheDocument()
    })

    it('displays royal endorsement and premium branding', () => {
      render(<QuoteRequestForm />)
      
      expect(screen.getByText(/royal.*family.*endorsed/i)).toBeInTheDocument()
      expect(screen.getByText(/personalised.*quote/i)).toBeInTheDocument()
      expect(screen.getByText(/complete.*discretion.*confidentiality/i)).toBeInTheDocument()
    })

    it('shows all required form fields', () => {
      render(<QuoteRequestForm />)
      
      // Student Information
      expect(screen.getByLabelText(/student.*name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/student.*age.*year.*group/i)).toBeInTheDocument()
      
      // Contact Information
      expect(screen.getByLabelText(/parent.*guardian.*name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email.*address/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/phone.*number/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/postcode/i)).toBeInTheDocument()
      
      // Subject checkboxes
      expect(screen.getByText(/subjects.*required/i)).toBeInTheDocument()
      expect(screen.getByText(/mathematics/i)).toBeInTheDocument()
      expect(screen.getByText(/english.*language.*literature/i)).toBeInTheDocument()
    })

    it('displays comprehensive subject selection options', () => {
      render(<QuoteRequestForm />)
      
      // Check key subjects are available
      const subjectCheckboxes = screen.getAllByRole('checkbox')
      expect(subjectCheckboxes.length).toBeGreaterThan(10) // Should have many subject options
      
      expect(screen.getByText(/mathematics/i)).toBeInTheDocument()
      expect(screen.getByText(/sciences.*biology.*chemistry.*physics/i)).toBeInTheDocument()
      expect(screen.getByText(/modern.*languages.*french.*german.*spanish/i)).toBeInTheDocument()
      expect(screen.getByText(/classics.*latin.*greek/i)).toBeInTheDocument()
    })
  })

  describe('Student Information Validation', () => {
    it('validates required student name field', async () => {
      const user = userEvent.setup()
      render(<QuoteRequestForm />)
      
      const submitButton = screen.getByRole('button', { name: /request.*personalised.*quote/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/student.*name.*must.*be.*at.*least.*2.*characters/i)).toBeInTheDocument()
      })
    })

    it('validates student name format (letters, spaces, hyphens, apostrophes only)', async () => {
      const user = userEvent.setup()
      render(<QuoteRequestForm />)
      
      const studentNameInput = screen.getByLabelText(/student.*name/i)
      await user.type(studentNameInput, 'Student123')
      
      const submitButton = screen.getByRole('button', { name: /request.*personalised.*quote/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/student.*name.*can.*only.*contain.*letters/i)).toBeInTheDocument()
      })
    })

    it('validates student age selection', async () => {
      const user = userEvent.setup()
      render(<QuoteRequestForm />)
      
      const submitButton = screen.getByRole('button', { name: /request.*personalised.*quote/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/please.*select.*student.*age/i)).toBeInTheDocument()
      })
    })

    it('allows optional current school field', async () => {
      const user = userEvent.setup()
      render(<QuoteRequestForm />)
      
      const currentSchoolInput = screen.getByLabelText(/current.*school.*optional/i)
      await user.type(currentSchoolInput, 'Eton College')
      
      expect(currentSchoolInput).toHaveValue('Eton College')
    })
  })

  describe('Subject Selection', () => {
    it('validates at least one subject is selected', async () => {
      const user = userEvent.setup()
      render(<QuoteRequestForm />)
      
      const submitButton = screen.getByRole('button', { name: /request.*personalised.*quote/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/please.*select.*at.*least.*one.*subject/i)).toBeInTheDocument()
      })
    })

    it('allows multiple subject selection and deselection', async () => {
      const user = userEvent.setup()
      render(<QuoteRequestForm />)
      
      // Select Mathematics
      const mathsCheckbox = screen.getByRole('checkbox', { name: /mathematics/i })
      await user.click(mathsCheckbox)
      expect(mathsCheckbox).toBeChecked()
      
      // Select English
      const englishCheckbox = screen.getByRole('checkbox', { name: /english.*language.*literature/i })
      await user.click(englishCheckbox)
      expect(englishCheckbox).toBeChecked()
      
      // Deselect Mathematics
      await user.click(mathsCheckbox)
      expect(mathsCheckbox).not.toBeChecked()
      expect(englishCheckbox).toBeChecked() // English should still be selected
    })

    it('prevents selecting more than 8 subjects', async () => {
      const user = userEvent.setup()
      render(<QuoteRequestForm />)
      
      // Get all checkboxes
      const checkboxes = screen.getAllByRole('checkbox')
      
      // Select first 8 subjects
      for (let i = 0; i < 8; i++) {
        await user.click(checkboxes[i])
      }
      
      // Try to select 9th subject - should trigger validation
      await user.click(checkboxes[8])
      
      const submitButton = screen.getByRole('button', { name: /request.*personalised.*quote/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/please.*select.*no.*more.*than.*8.*subjects/i)).toBeInTheDocument()
      })
    })

    it('updates visual state when subjects are selected', async () => {
      const user = userEvent.setup()
      render(<QuoteRequestForm />)
      
      const mathsLabel = screen.getByLabelText(/mathematics/i).closest('label')
      
      // Initial state should not have selected styling
      expect(mathsLabel).not.toHaveClass('bg-accent-50')
      
      // Click to select
      await user.click(screen.getByRole('checkbox', { name: /mathematics/i }))
      
      // Should now have selected styling
      expect(mathsLabel).toHaveClass('bg-accent-50', 'border-accent-300')
    })
  })

  describe('Contact Information Validation', () => {
    it('validates parent/guardian name format', async () => {
      const user = userEvent.setup()
      render(<QuoteRequestForm />)
      
      const parentNameInput = screen.getByLabelText(/parent.*guardian.*name/i)
      await user.type(parentNameInput, 'Parent123')
      
      const submitButton = screen.getByRole('button', { name: /request.*personalised.*quote/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/parent.*guardian.*name.*can.*only.*contain.*letters/i)).toBeInTheDocument()
      })
    })

    it('validates email format', async () => {
      const user = userEvent.setup()
      render(<QuoteRequestForm />)
      
      const emailInput = screen.getByLabelText(/email.*address/i)
      await user.type(emailInput, 'invalid-email-format')
      
      const submitButton = screen.getByRole('button', { name: /request.*personalised.*quote/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/please.*enter.*valid.*email.*address/i)).toBeInTheDocument()
      })
    })

    it('validates UK postcode format', async () => {
      const user = userEvent.setup()
      render(<QuoteRequestForm />)
      
      const postcodeInput = screen.getByLabelText(/postcode/i)
      await user.type(postcodeInput, 'invalid')
      
      const submitButton = screen.getByRole('button', { name: /request.*personalised.*quote/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/please.*enter.*valid.*uk.*postcode.*format/i)).toBeInTheDocument()
      })
    })

    it('accepts valid UK postcode formats', async () => {
      const user = userEvent.setup()
      render(<QuoteRequestForm />)
      
      const postcodeInput = screen.getByLabelText(/postcode/i)
      
      // Test various valid UK postcode formats
      await user.clear(postcodeInput)
      await user.type(postcodeInput, 'SW1A 1AA')
      expect(postcodeInput).toHaveValue('SW1A 1AA')
      
      await user.clear(postcodeInput)
      await user.type(postcodeInput, 'M1 1AA')
      expect(postcodeInput).toHaveValue('M1 1AA')
      
      await user.clear(postcodeInput)
      await user.type(postcodeInput, 'B33 8TH')
      expect(postcodeInput).toHaveValue('B33 8TH')
    })

    it('validates phone number format', async () => {
      const user = userEvent.setup()
      render(<QuoteRequestForm />)
      
      const phoneInput = screen.getByLabelText(/phone.*number/i)
      await user.type(phoneInput, 'invalid-phone')
      
      const submitButton = screen.getByRole('button', { name: /request.*personalised.*quote/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/phone.*number.*contains.*invalid.*characters/i)).toBeInTheDocument()
      })
    })
  })

  describe('Tutoring Preferences', () => {
    it('validates required tutoring format selection', async () => {
      const user = userEvent.setup()
      render(<QuoteRequestForm />)
      
      const submitButton = screen.getByRole('button', { name: /request.*personalised.*quote/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/please.*select.*preferred.*tutoring.*format/i)).toBeInTheDocument()
      })
    })

    it('validates required frequency selection', async () => {
      const user = userEvent.setup()
      render(<QuoteRequestForm />)
      
      const submitButton = screen.getByRole('button', { name: /request.*personalised.*quote/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/please.*select.*preferred.*frequency/i)).toBeInTheDocument()
      })
    })

    it('validates required start date selection', async () => {
      const user = userEvent.setup()
      render(<QuoteRequestForm />)
      
      const submitButton = screen.getByRole('button', { name: /request.*personalised.*quote/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/please.*select.*preferred.*start.*date/i)).toBeInTheDocument()
      })
    })
  })

  describe('Form Submission', () => {
    const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
      // Student Information
      await user.type(screen.getByLabelText(/student.*name/i), 'Princess Charlotte')
      await user.click(screen.getByLabelText(/student.*age.*year.*group/i))
      await user.click(screen.getByText(/year.*3.*age.*7-8/i))
      
      // Select subjects
      await user.click(screen.getByRole('checkbox', { name: /mathematics/i }))
      await user.click(screen.getByRole('checkbox', { name: /english.*language.*literature/i }))
      
      // Academic level
      await user.click(screen.getByLabelText(/academic.*level/i))
      await user.click(screen.getByText(/primary.*school.*reception.*year.*6/i))
      
      // Tutoring preferences
      await user.click(screen.getByLabelText(/preferred.*format/i))
      await user.click(screen.getByText(/online.*tutoring/i))
      
      await user.click(screen.getByLabelText(/frequency/i))
      await user.click(screen.getByText(/weekly.*sessions/i))
      
      await user.click(screen.getByLabelText(/preferred.*start.*date/i))
      await user.click(screen.getByText(/within.*week/i))
      
      // Contact Information
      await user.type(screen.getByLabelText(/parent.*guardian.*name/i), 'Catherine Windsor')
      await user.type(screen.getByLabelText(/email.*address/i), 'catherine@royal.family')
      await user.type(screen.getByLabelText(/phone.*number/i), '020 7930 4832')
      await user.type(screen.getByLabelText(/postcode/i), 'SW1A 1AA')
      
      // How did you hear about us
      await user.click(screen.getByLabelText(/how.*did.*you.*hear.*about.*us/i))
      await user.click(screen.getByText(/tatler.*address.*book/i))
    }

    it('submits form with valid data successfully', async () => {
      const user = userEvent.setup()
      
      // Mock successful form submission
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      })
      
      render(<QuoteRequestForm />)
      
      await fillValidForm(user)
      
      const submitButton = screen.getByRole('button', { name: /request.*personalised.*quote/i })
      await user.click(submitButton)
      
      // Wait for success state
      await waitFor(() => {
        expect(screen.getByText(/quote.*request.*received/i)).toBeInTheDocument()
      })
      
      // Verify API call was made with correct data
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': 'mock-csrf-token-456'
          },
          body: expect.stringContaining('Princess Charlotte')
        })
      })
    })

    it('includes form type and timestamp in submission', async () => {
      const user = userEvent.setup()
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      })
      
      render(<QuoteRequestForm />)
      await fillValidForm(user)
      
      const submitButton = screen.getByRole('button', { name: /request.*personalised.*quote/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/contact', 
          expect.objectContaining({
            body: expect.stringContaining('"formType":"quote-request"')
          })
        )
      })
    })

    it('shows loading state during submission', async () => {
      const user = userEvent.setup()
      
      // Mock delayed response
      mockFetch.mockImplementationOnce(
        () => new Promise(resolve => setTimeout(() => resolve({ ok: true }), 100))
      )
      
      render(<QuoteRequestForm />)
      await fillValidForm(user)
      
      const submitButton = screen.getByRole('button', { name: /request.*personalised.*quote/i })
      await user.click(submitButton)
      
      // Verify loading state
      expect(screen.getByText(/submitting.*quote.*request/i)).toBeInTheDocument()
      expect(submitButton).toBeDisabled()
    })

    it('resets form state after successful submission', async () => {
      const user = userEvent.setup()
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      })
      
      render(<QuoteRequestForm />)
      await fillValidForm(user)
      
      const submitButton = screen.getByRole('button', { name: /request.*personalised.*quote/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/quote.*request.*received/i)).toBeInTheDocument()
      })
      
      // Click "Submit Another Quote Request" to return to form
      const anotherRequestButton = screen.getByRole('button', { name: /submit.*another.*quote.*request/i })
      await user.click(anotherRequestButton)
      
      // Form should be reset
      expect(screen.getByLabelText(/student.*name/i)).toHaveValue('')
      expect(screen.getByRole('checkbox', { name: /mathematics/i })).not.toBeChecked()
    })
  })

  describe('Success State', () => {
    it('displays success message with royal branding', async () => {
      const user = userEvent.setup()
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      })
      
      render(<QuoteRequestForm />)
      await fillValidForm(user)
      
      const submitButton = screen.getByRole('button', { name: /request.*personalised.*quote/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/quote.*request.*received/i)).toBeInTheDocument()
        expect(screen.getByText(/royal.*family.*endorsed.*service/i)).toBeInTheDocument()
        expect(screen.getByText(/personalised.*quote.*contact.*you.*within.*24.*hours/i)).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper section structure with ARIA landmarks', () => {
      render(<QuoteRequestForm />)
      
      // Check for proper section structure
      const sections = screen.getAllByRole('group')
      expect(sections.length).toBeGreaterThan(0)
      
      // Check section headings
      expect(screen.getByText(/student.*information/i)).toHaveAttribute('id', 'student-info-heading')
      expect(screen.getByText(/educational.*needs/i)).toHaveAttribute('id', 'educational-needs-heading')
    })

    it('provides proper ARIA labels and descriptions', () => {
      render(<QuoteRequestForm />)
      
      // Check form fields have proper labelling
      const studentNameInput = screen.getByLabelText(/student.*name/i)
      expect(studentNameInput).toHaveAttribute('aria-invalid', 'false')
      
      const subjectGroup = screen.getByRole('group', { name: /subjects.*required/i })
      expect(subjectGroup).toBeInTheDocument()
    })

    it('announces validation errors to screen readers', async () => {
      const user = userEvent.setup()
      render(<QuoteRequestForm />)
      
      const submitButton = screen.getByRole('button', { name: /request.*personalised.*quote/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        const errorMessages = screen.getAllByRole('alert')
        expect(errorMessages.length).toBeGreaterThan(0)
        
        errorMessages.forEach(error => {
          expect(error).toHaveClass('text-red-600')
        })
      })
    })

    it('provides proper focus management for form interactions', async () => {
      const user = userEvent.setup()
      render(<QuoteRequestForm />)
      
      // Tab through form should work properly
      await user.tab()
      expect(screen.getByLabelText(/student.*name/i)).toHaveFocus()
      
      await user.tab()
      expect(screen.getByLabelText(/student.*age.*year.*group/i)).toHaveFocus()
    })
  })

  describe('Premium Service Standards', () => {
    it('maintains royal and premium language throughout', () => {
      render(<QuoteRequestForm />)
      
      expect(screen.getByText(/personalised.*quote/i)).toBeInTheDocument()
      expect(screen.getByText(/complete.*discretion.*confidentiality/i)).toBeInTheDocument()
      expect(screen.getByText(/utmost.*discretion.*confidentiality/i)).toBeInTheDocument()
      expect(screen.getByText(/highest.*standards.*data.*protection/i)).toBeInTheDocument()
    })

    it('includes comprehensive privacy and confidentiality notices', () => {
      render(<QuoteRequestForm />)
      
      expect(screen.getByText(/complete.*confidentiality.*guaranteed/i)).toBeInTheDocument()
      expect(screen.getByText(/information.*never.*shared.*third.*parties/i)).toBeInTheDocument()
    })

    it('displays royal endorsement prominently', () => {
      render(<QuoteRequestForm />)
      
      expect(screen.getByText(/royal.*family.*endorsed/i)).toBeInTheDocument()
      
      // Crown icons should be present
      const crownIcons = document.querySelectorAll('[class*="lucide-crown"]')
      expect(crownIcons.length).toBeGreaterThan(0)
    })
  })

  describe('Compact Mode', () => {
    it('renders with reduced padding in compact mode', () => {
      render(<QuoteRequestForm compact={true} />)
      
      const cardHeader = screen.getByText(/request.*personalised.*quote/i).closest('[class*="CardHeader"]')
      expect(cardHeader).toHaveClass('pb-4')
    })
  })
})