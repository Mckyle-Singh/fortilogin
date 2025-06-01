import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
 
describe('Page', () => {
  beforeEach(() => {
    render(<Page />)
  })

  it('renders main heading', () => {
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    expect(screen.getByText('FortiLogin')).toBeInTheDocument()
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
    expect(screen.getByText('Security')).toBeInTheDocument()
  })

  it('renders authentication links', () => {
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Register')).toBeInTheDocument()
  })

  it('renders hero section buttons', () => {
    expect(screen.getByText('Get Started')).toBeInTheDocument()
    expect(screen.getByText('Learn More')).toBeInTheDocument()
  })

  it('renders feature cards', () => {
    expect(screen.getByText('🔐 End-to-End Encryption')).toBeInTheDocument()
    expect(screen.getByText('🛡 Multi-Factor Authentication')).toBeInTheDocument()
    expect(screen.getByText('✅ OAuth & JWT Security')).toBeInTheDocument()
  })

  it('renders footer text', () => {
    expect(screen.getByText(/Fortified with AES-256 encryption/i)).toBeInTheDocument()
  })
})