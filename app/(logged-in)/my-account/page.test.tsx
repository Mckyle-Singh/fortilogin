/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen } from '@testing-library/react';
import MyAccount from './page';
import '@testing-library/jest-dom';

// --- 1. Mock `auth()` ---
jest.mock('../../../auth', () => ({
  auth: jest.fn(),
}));

// --- 2. Mock `redirect()` ---
const mockRedirect = jest.fn();
jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation');
  return {
    ...actual,
    redirect: (url: string) => mockRedirect(url),
  };
});

const { auth } = require('../../../auth');

describe('MyAccount Page', () => {
  beforeEach(() => {
    mockRedirect.mockClear();
  });

  it('renders user email when logged in', async () => {
    auth.mockResolvedValueOnce({
      user: { id: '1', email: 'user@example.com' },
    });

    const Page = await MyAccount(); // Run the server component
    render(Page); // Render static output

    expect(screen.getByText(/My Account/i)).toBeInTheDocument();
    expect(screen.getByText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByText('user@example.com')).toBeInTheDocument();
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it('redirects to "/" when not authenticated', async () => {
    auth.mockResolvedValueOnce(null);

    await MyAccount();

    expect(mockRedirect).toHaveBeenCalledWith('/');
  });
});