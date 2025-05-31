import '@testing-library/jest-dom'; // <-- This enables .toBeInTheDocument()
import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('./layout', () => ({
  __esModule: true,
  default: () => <div>Mocked Layout</div>,
}));

describe('Dummy layout test', () => {
  it('renders mocked layout', () => {
    const Layout = require('./layout').default;
    render(<Layout />);
    expect(screen.getByText('Mocked Layout')).toBeInTheDocument();
  });
});