import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

describe('Page', () => {
  beforeEach(() => {
    render(<Page />)
  })

  it('renders main sections and content', () => {
    // Heading
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

    // Navigation Links
    const navLinks = ['FortiLogin', 'Features', 'Pricing', 'Security']
    navLinks.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })

    // Authentication Links
    const authLinks = ['Login', 'Register']
    authLinks.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })

    // Hero Section Buttons
    const heroButtons = ['Get Started', 'Learn More']
    heroButtons.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })

    // Feature Cards
    const featureCards = [
      '🔐 End-to-End Encryption',
      '🛡 Multi-Factor Authentication',
      '✅ OAuth & JWT Security'
    ]
    featureCards.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })

    // Footer
    expect(screen.getByText(/Fortified with AES-256 encryption/i)).toBeInTheDocument()
  })
})