/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen } from '@testing-library/react';
import LoggedOutLayout from './layout';
import '@testing-library/jest-dom';

// --- 1. Mock `auth()` from @/auth ---
jest.mock('../../auth', () => ({
  auth: jest.fn(),
}));

// --- 2. Mock `redirect()` from next/navigation ---
const mockRedirect = jest.fn();
jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation');
  return {
    ...actual,
    redirect: (url: string) => mockRedirect(url),
  };
});

// --- 3. Get the mock auth function ---
const { auth } = require('../../auth');

describe('LoggedOutLayout', () => {
  beforeEach(() => {
    mockRedirect.mockClear();
  });

  it('redirects admin users to /Admin-account', async () => {
    auth.mockResolvedValueOnce({
      user: { id: '1', email: 'admin@example.com', isAdmin: true },
    });

    await LoggedOutLayout({ children: <div>Should not render</div> });
    expect(mockRedirect).toHaveBeenCalledWith('/Admin-account');
  });

  it('redirects normal users to /my-account', async () => {
    auth.mockResolvedValueOnce({
      user: { id: '2', email: 'user@example.com', isAdmin: false },
    });

    await LoggedOutLayout({ children: <div>Should not render</div> });
    expect(mockRedirect).toHaveBeenCalledWith('/my-account');
  });

  it('renders children if no user is logged in', async () => {
    auth.mockResolvedValueOnce(null);

    const Component = await LoggedOutLayout({ children: <div>Login/Register Page</div> });
    render(Component);

    expect(screen.getByText('Login/Register Page')).toBeInTheDocument();
    expect(mockRedirect).not.toHaveBeenCalled();
  });
});