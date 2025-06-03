/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen } from '@testing-library/react';
import AdminDashboard from './page';
import '@testing-library/jest-dom';

// --- 1. Mock `auth()` from @/auth ---
jest.mock('../../../auth', () => ({
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
const { auth } = require('../../../auth');

describe('AdminDashboard', () => {
  beforeEach(() => {
    mockRedirect.mockClear();
  });

  it('renders the dashboard when user is admin', async () => {
    auth.mockResolvedValueOnce({
      user: { id: '1', email: 'admin@example.com', isAdmin: true },
    });

    const Page = await AdminDashboard(); // call the async server component
    render(Page); // render the returned JSX

    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/💰 Total Revenue/i)).toBeInTheDocument();
    expect(screen.getByText(/\$120,530/)).toBeInTheDocument();
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it('redirects to /unauthorised if user is not admin', async () => {
    auth.mockResolvedValueOnce({
      user: { id: '2', email: 'user@example.com', isAdmin: false },
    });

    await AdminDashboard(); // should trigger redirect
    expect(mockRedirect).toHaveBeenCalledWith('/unauthorised');
  });

  it('redirects to /unauthorised if user is not logged in', async () => {
    auth.mockResolvedValueOnce(null); // simulate no session

    await AdminDashboard(); // should trigger redirect
    expect(mockRedirect).toHaveBeenCalledWith('/unauthorised');
  });
});