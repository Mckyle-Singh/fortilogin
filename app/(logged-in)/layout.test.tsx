import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LoggedInLayout from './layout';

jest.mock('./../../auth', () => ({
  auth: jest.fn(() => Promise.resolve({
    user: { id: '1', isAdmin: true }
  })),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('LoggedInLayout', () => {
  it('renders admin navigation links when user is admin', async () => {
    const element = await LoggedInLayout({ children: <div>Test Content</div> });
    render(element);

    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/User Management/i)).toBeInTheDocument();
    expect(screen.getByText(/My account/i)).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('does not render admin links for non-admin users', async () => {
    const { auth } = require('./../../auth');
    auth.mockResolvedValueOnce({ user: { id: '1', isAdmin: false } });

    const element = await LoggedInLayout({ children: <div>Test Content</div> });
    render(element);

    expect(screen.queryByText(/Admin Dashboard/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/User Management/i)).not.toBeInTheDocument();
    expect(screen.getByText(/My account/i)).toBeInTheDocument();
  });
});