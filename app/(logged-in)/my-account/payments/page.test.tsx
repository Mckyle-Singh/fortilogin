/* eslint-disable @typescript-eslint/no-require-imports */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PaymentsPage from './page';

// 1. Mock auth
jest.mock('../../../../auth', () => ({
  auth: jest.fn(),
}));

// --- Mock redirect from next/navigation ---
const mockRedirect = jest.fn();
jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation');
  return {
    ...actual,
    redirect: (url: string) => mockRedirect(url),
  };
});

const { auth } = require('../../../../auth');

describe('PaymentsPage', () => {
  beforeEach(() => {
    mockRedirect.mockClear(); // reset between tests
  });

  test('renders the payment form with all fields for a normal user', async () => {
    auth.mockResolvedValueOnce({
      user: { id: '123', email: 'user@example.com', isAdmin: false },
    });

    const Page = await PaymentsPage(); // Server component
    render(Page);

    expect(screen.getByText("Payment Form")).toBeInTheDocument();
    expect(screen.getByLabelText("Name on Card")).toBeInTheDocument();
    expect(screen.getByLabelText("Card Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Expiry Date")).toBeInTheDocument();
    expect(screen.getByLabelText("CVV")).toBeInTheDocument();
    expect(screen.getByLabelText("Amount")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pay Now" })).toBeInTheDocument();

    expect(mockRedirect).not.toHaveBeenCalled(); // Assert no redirect
  });

  test('redirects if user is not logged in', async () => {
    auth.mockResolvedValueOnce(null); // Simulate no session

    await PaymentsPage(); // Don't render if redirected
    expect(mockRedirect).toHaveBeenCalledWith('/');
  });

  test('redirects if user is an admin', async () => {
    auth.mockResolvedValueOnce({
      user: { id: '1', email: 'admin@example.com', isAdmin: true },
    });

    await PaymentsPage();
    expect(mockRedirect).toHaveBeenCalledWith('/');
  });
});