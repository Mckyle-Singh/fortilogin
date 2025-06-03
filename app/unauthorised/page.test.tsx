/* eslint-disable @typescript-eslint/no-require-imports */

import { render, screen } from '@testing-library/react';
import UnauthorizedPage from './page';
import '@testing-library/jest-dom';

describe('UnauthorizedPage', () => {
  it('renders the 403 title and message', () => {
    render(<UnauthorizedPage />);

    // Checks the 403 heading
    expect(screen.getByText('403')).toBeInTheDocument();

    // Checks the Access Denied heading
    expect(screen.getByText('Access Denied')).toBeInTheDocument();

    // Checks the message text
    expect(screen.getByText(/You do not have permission/i)).toBeInTheDocument();

    // Checks the presence of the "Go to Home" button
    expect(screen.getByRole('link', { name: /Go to Login/i })).toHaveAttribute('href', '/Login');
  });
});

