/* eslint-disable @typescript-eslint/no-require-imports */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AdminUsers from './page';

jest.mock('./../../../../auth', () => ({
  auth: jest.fn(),
}));

jest.mock('./../../../../db/drizzle', () => ({
  __esModule: true,
  default: {
    select: jest.fn(() => ({
      from: jest.fn(() => Promise.resolve([
        { id: 1, email: 'user@example.com', createdAt: new Date() },
      ])),
    })),
  },
}));

jest.mock('../../../../db/usersSchema', () => ({
  users: {},
}));

const mockRedirect = jest.fn();
jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation');
  return {
    ...actual,
    redirect: (url: string) => mockRedirect(url),
  };
});

const { auth } = require('./../../../../auth');

test('renders User Management heading for admin', async () => {
  auth.mockResolvedValueOnce({
    user: { id: '1', isAdmin: true },
  });

  const Page = await AdminUsers(); // Call server component
  render(Page); // Render static output

  expect(screen.getByRole('heading', { name: /User Management/i })).toBeInTheDocument();
});

test('redirects if user is not admin', async () => {
  auth.mockResolvedValueOnce({
    user: { id: '2', isAdmin: false }, // Not an admin
  });

  await AdminUsers(); // Will call redirect
  expect(mockRedirect).toHaveBeenCalledWith('/unauthorised');
});