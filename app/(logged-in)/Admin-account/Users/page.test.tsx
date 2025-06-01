import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AdminUsers from './page';

jest.mock('./../../../../auth', () => ({
  auth: jest.fn(() => Promise.resolve({
    user: { id: '1', isAdmin: true }
  })),
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

test('renders User Management heading for admin', async () => {
  const Page = await AdminUsers(); // ✅ Call the async server component
  render(Page); // ✅ Render the result of calling it

  expect(
    screen.getByRole('heading', { name: /User Management/i })
  ).toBeInTheDocument();
});